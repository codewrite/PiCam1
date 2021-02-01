#!/usr/bin/env python3
from flask import Flask, request, render_template, Response
from flask_restplus import reqparse, fields, Api, Resource
from flask_cors import CORS
from camera import Camera
import time
import json
from utils import Utils

app = Flask(__name__)
CORS(app)
api = Api(app, version='0.1', title='PiCam1 API', description='Raspberry Pi Camera 4 API')

ns_camera = api.namespace('camera', description='Camera operations')
ns_media = api.namespace('media', description='Media - videos and images')
ns_obsolete = api.namespace('obsolete', description='Work in Progress - To be deleted')

camera_fields = api.model('CameraProperties', {
  "annotate_text": fields.String,
  "awb_mode": fields.String,
  "rotation": fields.Integer,
  "zoom": fields.List(fields.Integer, default=[0,0,1,1], description='x, y, w, h, 0 - 1')
})

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

def motion_gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@ns_camera.route('/properties')
class CameraProperties(Resource):
  def get(self):
    return Utils.convertToDictinary(Camera().camera)
  @api.doc(body=camera_fields)
  def put(self):
    reqData = json.loads(request.data)
    for a in reqData:
      exec("Camera().camera." + a + "=reqData['" + a + "']")

@ns_media.route('/video_feed/')
class VideoHelper(Resource):
    @ns_media.produces(['image/jpeg'])
    def get(self):
        return Response(gen(Camera()), mimetype='multipart/x-mixed-replace; boundary=frame')

@ns_media.route('/motion_feed/')
class VideoHelper(Resource):
    @ns_media.produces(['image/jpeg'])
    def get(self):
        return Response(motion_gen(Camera()), mimetype='multipart/x-mixed-replace; boundary=frame')

# *******************************************************************
# Test area - stuff to be deleted
# *******************************************************************

@ns_obsolete.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

@ns_obsolete.route('/annotateText')
# @api.route('/annotateText/<string:text>')
class AnnotateText(Resource):
  def get(self):
    text = Camera().annotateText
    return { 'text': text }
  @api.doc(body=camera_fields)
  def put(self):
    parser = reqparse.RequestParser()
    parser.add_argument("text", default="", type=str)
    args = parser.parse_args()
    Camera().annotateText = args["text"]

# *******************************************************************

if __name__ == '__main__':
    # certs copied from /etc/ssl/mycerts
    print('running...')
    camera = Camera()   # Make sure we have a camera object for the entire time the program is running
    # app.run(host='0.0.0.0', debug=True, ssl_context=('certs/nginx.pem', 'certs/nginx.key'))
    app.run(host='0.0.0.0', debug=False)
    print('stopping...')
