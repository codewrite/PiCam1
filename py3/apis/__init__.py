from flask_restplus import Api
from .authorization import auth, authorizations
from .camera import api as camera
from .media import api as media
from .obsolete import api as test

api = Api(
    title='PiCam1 API',
    version='0.2',
    description='Raspberry Pi Camera 4 API',
    security='Basic Auth',
    authorizations=authorizations,
    # All API metadatas
)

def LoginReq(dapi):
    dapi.decorators = [auth.login_required]
    return dapi

api.add_namespace(LoginReq(camera))
api.add_namespace(LoginReq(media))
api.add_namespace(test)
# ...
