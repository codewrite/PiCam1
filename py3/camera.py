import Singleton
import io
import time
import picamera
from base_camera import BaseCamera

# There is only one camera, so this class is a singleton
@Singleton
class Camera(BaseCamera):
  _instance = None
  _camera = None

  def __init__(cls):
    if cls._instance is None:
      print('Creating the camera object')
      cls._instance = super(Camera, cls).__new__(cls)
      cls._camera = picamera.PiCamera(resolution='640x480', framerate=5)
    return cls._instance

  def __del__(self):
    print('Destroying the camera object')
    self._instance = None
    self._camera.close()  

  def frames(self):
    try:
      self._camera.rotation = 180
      self._camera.annotate_text = 'annotate text'
      time.sleep(2)
      stream = io.BytesIO()
      for _ in self._camera.capture_continuous(stream, 'jpeg', use_video_port=True):
        # return current frame
        stream.seek(0)
        yield stream.read()

        # reset stream for next frame
        stream.seek(0)
        stream.truncate()
    finally:
      pass

  @classmethod
  def annotateText(cls):
    return '' # _camera.annotate_text

    # def __init__(self):
    #     self.frames = [open(f + '.jpg', 'rb').read() for f in ['1', '2', '3']]

    # def get_frame(self):
    #     return self.frames[int(time()) % 3]



# with picamera.PiCamera(resolution='640x480', framerate=5) as camera:
#     output = StreamingOutput()
#     #Uncomment the next line to change your Pi's Camera rotation (in degrees)
#     camera.rotation = 180
#     camera.start_recording(output, format='mjpeg')
#     try:
#         address = ('', 8000)
#         server = StreamingServer(address, StreamingHandler)
#         server.serve_forever()
#     finally:
#         camera.stop_recording()
