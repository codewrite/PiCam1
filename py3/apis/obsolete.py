from flask_restplus import Namespace, Resource, fields, reqparse
from core.camera import Camera

# Namespaces
api = Namespace('obsolete', description='Work in Progress - To be deleted')

@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

@api.route('/annotateText')
# @api.route('/annotateText/<string:text>')
class AnnotateText(Resource):
  def get(self):
    text = Camera().annotateText
    return { 'text': text }
  @api.doc(body=fields.String)
  def put(self):
    parser = reqparse.RequestParser()
    parser.add_argument("text", default="", type=str)
    args = parser.parse_args()
    Camera().annotateText = args["text"]
