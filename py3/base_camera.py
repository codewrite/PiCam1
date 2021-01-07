import time
import threading
try:
    from greenlet import getcurrent as get_ident
except ImportError:
    try:
        from thread import get_ident
    except ImportError:
        from _thread import get_ident


class CameraEvent(object):
    """An Event-like class that signals all active clients when a new frame is
    available.
    """
    def __init__(self):
        self.events = {}

    def wait(self):
        """Invoked from each client's thread to wait for the next frame."""
        ident = get_ident()
        if ident not in self.events:
            # this is a new client
            # add an entry for it in the self.events dict
            # each entry has two elements, a threading.Event() and a timestamp
            self.events[ident] = [threading.Event(), time.time()]
        return self.events[ident][0].wait()

    def set(self):
        """Invoked by the camera thread when a new frame is available."""
        now = time.time()
        remove = None
        for ident, event in self.events.items():
            if not event[0].isSet():
                # if this client's event is not set, then set it
                # also update the last set timestamp to now
                event[0].set()
                event[1] = now
            else:
                # if the client's event is already set, it means the client
                # did not process a previous frame
                # if the event stays set for more than 5 seconds, then assume
                # the client is gone and remove it
                if now - event[1] > 5:
                    remove = ident
        if remove:
            del self.events[remove]

    def clear(self):
        """Invoked from each client's thread after a frame was processed."""
        self.events[get_ident()][0].clear()


class BaseCamera(object):
    _thread = None  # background thread that reads frames from camera
    _frame = None  # current frame is stored here by background thread
    _last_access = 0  # time of last client access to the camera
    _event = CameraEvent()

    def __init__(self):
        """Start the background camera thread if it isn't running yet."""
        if self._thread is None:
            self._last_access = time.time()

            # start background frame thread
            self._thread = threading.Thread(target=self.thread)
            self._thread.start()

            # wait until frames are available
            while self.get_frame() is None:
                time.sleep(0)

    def get_frame(self):
        """Return the current camera frame."""
        BaseCamera._last_access = time.time()

        # wait for a signal from the camera thread
        BaseCamera._event.wait()
        BaseCamera._event.clear()

        return BaseCamera._frame

    def frames(self):
        """"Generator that returns frames from the camera."""
        raise RuntimeError('Must be implemented by subclasses.')

    def thread(self):
        """Camera background thread."""
        print('Starting camera thread.')
        frames_iterator = self.frames()
        for frame in frames_iterator:
            BaseCamera._frame = frame
            BaseCamera._event.set()  # send signal to clients
            time.sleep(0)

            # if there hasn't been any clients asking for frames in
            # the last 10 seconds then stop the thread
            if time.time() - BaseCamera._last_access > 10:
                frames_iterator.close()
                print('Stopping camera thread due to inactivity.')
                break
        self._thread = None
