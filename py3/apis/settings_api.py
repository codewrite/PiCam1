from flask_restplus import Namespace, Resource, fields, reqparse
from core.camera import Camera

# Namespaces
api = Namespace('settings', description='General Settings')

frameFields = api.model('FrameModel', {
  'text': fields.String(description='Title text to be displayed on the video'),
  'stuff': fields.Integer(description='Some var')
})

@api.route('/frameText')
@api.doc(model=frameFields)
class FrameSettings(Resource):
  def get(self):
    text = Camera().frameText
    return { 'text': text }
  @api.doc(body=frameFields)
  def put(self):
    parser = reqparse.RequestParser()
    parser.add_argument("text", default="", type=str)
    args = parser.parse_args()
    Camera().frameText = args["text"]
