#!/usr/bin/env python3
from flask import Flask, request, render_template, Response
from flask_restplus import reqparse, fields, Api, Resource
from camera import Camera
import time
import json

app = Flask(__name__)
api = Api(app, version='0.1', title='PiCam1 API', description='Raspberry Pi Camera 4 API')

ns_camera = api.namespace('camera', description='Camera operations')

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

camera_fields = api.model('CameraProperties', {
'anyAttribute1': fields.String,
'anyAttribute2etc': fields.String,
})

@ns_camera.route('/annotateText')
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

@ns_camera.route('/properties')
class CameraProperties(Resource):
  def get(self):
    cam = Camera().camera
    allAttr = [a for a in dir(cam) if not a.startswith('_')]
    propNames = []
    for a in allAttr:
      try:
        if (not callable(getattr(cam, a))):
          propNames.append(a)
      except:
        pass
    props = {}
    for n in propNames:
      props[n] = eval("cam." + n)
    cleanProps = json.loads(json.dumps(props, indent=4, sort_keys=True, default=str))
    return cleanProps
  @api.doc(body=camera_fields)
  def put(self):
    reqData = json.loads(request.data)
    for a in reqData:
      exec("Camera().camera." + a + "=reqData['" + a + "']")

@ns_camera.route('/video_feed/')
class VideoHelper(Resource):
    def get(self):
        return Response(gen(Camera()), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    # certs copied from /etc/ssl/mycerts
    print('running...')
    camera = Camera()   # Make sure we have a camera object for the entire time the program is running
    # app.run(host='0.0.0.0', debug=True, ssl_context=('certs/nginx.pem', 'certs/nginx.key'))
    app.run(host='0.0.0.0', debug=False)
    print('stopping...')
