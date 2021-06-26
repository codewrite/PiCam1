from flask_restplus import Namespace, Resource, fields, reqparse
from core.camera import Camera
from .authorization import auth

# Namespaces
api = Namespace('obsolete', description='Work in Progress - To be deleted')

# This file contains both secure and insecure methods. This might be needed for things like login methods

@api.route('/hello')
class HelloWorld(Resource):
  @auth.login_required
  def get(self):
    return {'hello': 'world'}

@api.route('/annotateText')
# @api.route('/annotateText/<string:text>')
class AnnotateText(Resource):
  @auth.login_required
  def get(self):
    text = Camera().annotateText
    return { 'text': text }
  @auth.login_required
  @api.doc(body=fields.String)
  def put(self):
    parser = reqparse.RequestParser()
    parser.add_argument("text", default="", type=str)
    args = parser.parse_args()
    Camera().annotateText = args["text"]

api.state = 'test'

@api.route('/s1')
@api.doc(security=[])
class S1Helper(Resource):
  def get(self):
    return api.state

@api.route('/s1/<string:str>')
@api.doc(security=[])
class S1PHelper(Resource):
  def put(self, str):
    api.state = str
