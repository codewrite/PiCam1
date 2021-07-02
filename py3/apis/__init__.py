from flask_restplus import Api
from .authorization import auth, authorizations
from .camera_api import api as cameraApi
from .media_api import api as mediaApi
from .settings_api import api as settingsApi
from .obsolete_api import api as testApi

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

api.add_namespace(LoginReq(cameraApi))
api.add_namespace(LoginReq(mediaApi))
api.add_namespace(LoginReq(settingsApi))
api.add_namespace(testApi)
# ...
