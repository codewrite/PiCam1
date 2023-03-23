# ************************************************************************************
#
# This came from: https://blog.miguelgrinberg.com/post/flask-video-streaming-revisited
#
# ************************************************************************************

import time
import threading
from .camera_event import CameraEvent

class BaseCamera(object):
    _thread = None  # background thread that reads frames from camera
    _frame = None  # current frame is stored here by background thread
    _lastAccess = 0  # time of last client access to the camera
    _event = CameraEvent()

    def __init__(self, startThread):
        """Start the background camera thread if it isn't running yet."""
        if startThread and BaseCamera._thread is None:
            BaseCamera._lastAccess = time.time()

            # start background frame thread
            BaseCamera._thread = threading.Thread(target=self._threadMethod)
            BaseCamera._thread.start()

            # wait until frames are available
            while BaseCamera.get_frame() is None:
                time.sleep(0)

    @classmethod
    def get_frame(cls):
        """Return the current camera frame."""
        BaseCamera._lastAccess = time.time()

        # wait for a signal from the camera thread
        BaseCamera._event.wait()
        BaseCamera._event.clear()

        return BaseCamera._frame

    @classmethod
    def frames(cls):
        """"Generator that returns frames from the camera."""
        raise RuntimeError('Must be implemented by subclasses.')

    @classmethod
    def _threadMethod(cls):
        """Camera background thread."""
        print('Starting camera thread.')
        frames_iterator = cls.frames()
        for frame in frames_iterator:
            BaseCamera._frame = frame
            # print('.', end='.')
            BaseCamera._event.set()  # send signal to clients
            time.sleep(0)

            # if there hasn't been any clients asking for frames in
            # the last 10 seconds then stop the thread
            if time.time() - BaseCamera._lastAccess > 10:
                frames_iterator.close()
                print('Stopping camera thread due to inactivity.')
                break
        BaseCamera._thread = None