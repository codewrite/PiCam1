import time
from os import getcwd
from datetime import datetime
import picamera
from core.base_camera import BaseCamera
from core.images import CameraImage
from core.streaming_output import StreamingOutput

class Camera(BaseCamera):

  _camera = None
  _frameCount = 0
  _frameText = 'back garden'
  _rotation = 180

  @property
  def camera(self):
    return Camera._camera

  @property
  def frameText(self):
    return Camera._frameText

  @frameText.setter
  def frameText(self, value):
    Camera._frameText = value

  def __init__(self, startThread=False):
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
      camera.rotation = Camera._rotation
    Camera._camera.annotate_text = Camera._frameText
    super().__init__(startThread)

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
