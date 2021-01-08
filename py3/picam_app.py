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
    # _pi4cam = camera
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

@api.route('/annotateText')
class CameraControl(Resource):
    def get(self):
      camera = Camera()
      text = camera.annotateText()
      return { 'text': '' }

@api.route('/video_feed/')
class VideoHelper(Resource):
    def get(self):
        return Response(gen(Camera()), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    # certs copied from /etc/ssl/mycerts
    print('running...')
    # app.run(host='0.0.0.0', debug=True, ssl_context=('certs/nginx.pem', 'certs/nginx.key'))
    app.run(host='0.0.0.0', debug=True)
