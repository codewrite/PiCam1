#!/usr/bin/env python3
from flask import Flask
from flask_cors import CORS
from core.camera import Camera
from apis import api

# App definition
app = Flask(__name__)
CORS(app)
api.init_app(app)

# *******************************************************************
# Main App
# *******************************************************************

if __name__ == '__main__':
    # certs copied from /etc/ssl/mycerts
    print('running...')
    camera = Camera()   # Make sure we have a camera object for the entire time the program is running
    # app.run(host='0.0.0.0', debug=True, ssl_context=('certs/nginx.pem', 'certs/nginx.key'))
    app.run(host='0.0.0.0', debug=False)
    print('stopping...')
