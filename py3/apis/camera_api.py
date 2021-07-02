import json
from flask import request
from flask_restplus import Namespace, Resource, fields
from core.camera import Camera
from core.utils import Utils

api = Namespace('camera', description='Camera operations')

# Models (data)
camera_fields = api.model('CameraProperties', {
  "zoom": fields.List(fields.Integer, default=[0,0,1,1], description='x, y, w, h, 0 - 1')
})

@api.route('/properties')
class CameraProperties(Resource):
  def get(self):
    return Utils.convertToDictionary(Camera().camera)
  @api.doc(body=camera_fields)
  def put(self):
    reqData = json.loads(request.data)
    for a in reqData:
      exec("Camera().camera." + a + "=reqData['" + a + "']")

@api.route('/stillshot')
class StillShot(Resource):
  def put(self):
    Camera().TakeStillShot()
