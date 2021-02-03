import io
import time
import picamera
from base_camera import BaseCamera

class Camera(BaseCamera):

  _camera = None

  def __init__(self):
    if Camera._camera is None:
      Camera._camera = picamera.PiCamera(resolution='640x480', framerate=5)
      Camera._camera.annotate_text = 'back garden'
      Camera._camera.rotation = 180
    super().__init__()

  @classmethod
  def frames(cls):
    try:
      time.sleep(2)
      stream = io.BytesIO()
      for _ in cls._camera.capture_continuous(stream, 'jpeg', use_video_port=True):
        # return current frame
        stream.seek(0)
        yield stream.read()

        # reset stream for next frame
        stream.seek(0)
        stream.truncate()
    finally:
      # TODO: Handle errors
      pass

  @property
  def annotateText(self):
    return Camera._camera.annotate_text

  @property
  def camera(self):
    return Camera._camera

  @annotateText.setter
  def annotateText(self, value):
    Camera._camera.annotate_text = value
