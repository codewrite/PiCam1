#!/usr/bin/env python3
from flask import Flask
from flask_cors import CORS
from apis import api

# App definition
app = Flask(__name__)
CORS(app)
api.init_app(app)

# *******************************************************************
# Main App
# *******************************************************************

if __name__ == '__main__':
    # certs copied from /etc/ssl/mycerts, using: sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/mycerts/nginx.key -out /etc/ssl/mycerts/nginx.pem
    print('running...')
    app.run(host='0.0.0.0', debug=True, ssl_context=('certs/nginx.pem', 'certs/nginx.key'))
    # app.run(host='0.0.0.0', port=5000, debug=False)
    print('stopping...')
