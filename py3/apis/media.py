from io import BytesIO
from datetime import datetime
from flask import Response, make_response, send_file
from flask_restplus import Namespace, Resource
from core.camera import Camera

api = Namespace('media', description='Media - videos and images')

# Helper methods

def gen(camera):
    while True:
      frame = camera.get_frame()
      yield (b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# API methods

@api.route('/video_feed/')
class VideoHelper(Resource):
    @api.produces(['image/jpeg'])
    def get(self):
      return Response(gen(Camera()), mimetype='multipart/x-mixed-replace; boundary=frame')

@api.route('/video_first_frame/')
class VideoStillHelper(Resource):
    @api.produces(['image/jpeg'])
    def get(self):
      response = make_response(send_file(BytesIO(Camera().get_frame()), mimetype='image/jpg'))
      response.headers['Cache-Control'] = "no-store, no-cache, must-revalidate"
      response.headers['Expires'] = datetime.utcnow().strftime('%a, %d %b %Y %H:%M:%S GMT')
      return response