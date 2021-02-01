import io
import time
import numpy as np
import picamera
import picamera.array
from PIL import Image
from base_camera import BaseCamera

class Camera(BaseCamera):

  _camera = None

  def __init__(self):
    if Camera._camera is None:
      Camera._camera = picamera.PiCamera(resolution='640x480', framerate=5)
      Camera._camera.annotate_text = 'annotate text'
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


# with picamera.PiCamera() as camera:
#     with picamera.array.PiMotionArray(camera) as stream:
#         camera.resolution = (640, 480)
#         camera.framerate = 30
#         camera.start_recording('/dev/null', format='h264', motion_output=stream)
#         camera.wait_recording(10)
#         camera.stop_recording()
#         for frame in range(stream.array.shape[0]):
#             data = np.sqrt(
#                 np.square(stream.array[frame]['x'].astype(np.float)) +
#                 np.square(stream.array[frame]['y'].astype(np.float))
#                 ).clip(0, 255).astype(np.uint8)
#             img = Image.fromarray(data)
    
  @classmethod
  def motion_frames(cls):
    try:
      time.sleep(2)
      with picamera.array.PiMotionArray(cls._camera) as stream:
        cls._camera.start_recording('/dev/null', format='h264', motion_output=stream)
        # return current frame
        for frame in range(stream.array.shape[0]):
            data = np.sqrt(
                np.square(stream.array[frame]['x'].astype(np.float)) +
                np.square(stream.array[frame]['y'].astype(np.float))
                ).clip(0, 255).astype(np.uint8)
            img = Image.fromarray(data)
            yield img
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
