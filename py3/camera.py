import io
import time
import picamera
from base_camera import BaseCamera

class Camera(BaseCamera):

  # _camera = ''

  @staticmethod
  def frames():
    with picamera.PiCamera(resolution='640x480', framerate=5) as camera:
      # _camera = camera
      camera.rotation = 180
      camera.annotate_text = 'annotate text'
      time.sleep(2)
      stream = io.BytesIO()
      for _ in camera.capture_continuous(stream, 'jpeg', use_video_port=True):
        # return current frame
        stream.seek(0)
        yield stream.read()

        # reset stream for next frame
        stream.seek(0)
        stream.truncate()

  @staticmethod
  def annotateText():
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
