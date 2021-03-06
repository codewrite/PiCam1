from flask_restplus import Api

from .media import api as media
from .camera import api as camera

api = Api(
    title='PiCam1 API',
    version='0.2',
    description='Raspberry Pi Camera 4 API',
    # All API metadatas
)

api.add_namespace(camera)
api.add_namespace(media)
# ...
