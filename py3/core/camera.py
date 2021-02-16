import time
from io import BytesIO
from os import getcwd
from datetime import datetime
from threading import Condition
import picamera
from core.base_camera import BaseCamera
from core.camera_image import CameraImage

class StreamingOutput(object):
    def __init__(self):
        self.frame = None
        self.buffer = BytesIO()
        self.condition = Condition()

    def write(self, buf):
        # See: https://en.wikipedia.org/wiki/JPEG_File_Interchange_Format
        if buf.startswith(b'\xff\xd8'):
          # New frame, copy the existing buffer's content and notify all clients it's available
          self.buffer.truncate()
          with self.condition:
            self.frame = self.buffer.getvalue()
            self.condition.notify_all()
            self.buffer.seek(0)
        return self.buffer.write(buf)

class Camera(BaseCamera):

  _camera = None
  _frameCount = 0

  def __init__(self):
    Camera._frameCount = 0
    if Camera._camera is None:
      camera = picamera.PiCamera()
      Camera._camera = camera
      revision = camera.revision
      if (revision == 'imx219'):    # V2
        camera.resolution = (1640, 1232)
      elif (revision == 'ov5647'):  # V1
        camera.resolution = (1296, 972)
      else:
        raise Exception("Camera revision not recognised: " + revision)
      camera.framerate = 24
      camera.annotate_text = 'back garden'
      camera.rotation = 180
    super().__init__()

  @classmethod
  def frames(cls):
    try:
      time.sleep(2)
      output = StreamingOutput()
      cls._camera.start_recording(output, format='mjpeg', splitter_port=1, resize=(640,480))
      while True:
        with output.condition:
          output.condition.wait()
          Camera._frameCount += 1
          if Camera._frameCount % 8 == 0:    # 8 / 24 = 3 frames per second
            yield output.frame
          else:
            _ = output.frame
    finally:
      cls._camera.stop_recording(splitter_port=1)
      # TODO: Handle errors

  @classmethod
  def TakeStillShot(cls):
    print("take picture")
    cwd = getcwd()
    print(cwd)
    filename = datetime.utcnow().strftime('capture-%y%m%d-%H%M%S.jpg')
    infile = 'images/captured/' + filename
    outfile = 'images/captured/thumbnails/' + filename
    cls._camera.capture(infile)
    CameraImage.resizeImage(infile, outfile, (128,96))

  @property
  def annotateText(self):
    return Camera._camera.annotate_text

  @property
  def camera(self):
    return Camera._camera

  @annotateText.setter
  def annotateText(self, value):
    Camera._camera.annotate_text = value
