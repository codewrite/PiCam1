from flask import Response
from flask_restplus import Namespace, Resource
from core.camera import Camera

api = Namespace('media', description='Media - videos and images')

# Helper methods

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# API methods

@api.route('/video_feed/')
class VideoHelper(Resource):
    @api.produces(['image/jpeg'])
    def get(self):
        return Response(gen(Camera()), mimetype='multipart/x-mixed-replace; boundary=frame')
