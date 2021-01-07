#!/usr/bin/env python3
from flask import Flask, render_template, Response
from flask_restplus import Api, Resource
from camera import Camera
import time

app = Flask(__name__)
api = Api(app)
# _pi4cam = None

def gen(camera):
    # TODO: work out how we are going to save the camera object
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@api.route('/video_feed/')
class VideoHelper(Resource):
    def get(self):
        return Response(gen(Camera()), mimetype='multipart/x-mixed-replace; boundary=frame')

@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

@api.route('/annotateText')
class CameraControl(Resource):
    def get(self):
      return { 'text': Camera().annotateText }

if __name__ == '__main__':
    # certs copied from /etc/ssl/mycerts
    try:
      print('running...')
      # _pi4cam = Camera()
      # app.run(host='0.0.0.0', debug=True, ssl_context=('certs/nginx.pem', 'certs/nginx.key'))
      app.run(host='0.0.0.0', debug=False)
      print('stopping...')
    finally:
      pass
      # if _pi4cam is not None:
        # del _pi4cam
