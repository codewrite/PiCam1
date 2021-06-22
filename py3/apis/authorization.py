from flask_httpauth import HTTPBasicAuth
auth = HTTPBasicAuth()
from passwords import users

@auth.verify_password
def verify_password(username, password):
    if username in users and password == users[username]:
        return username

authorizations = {
    'Basic Auth': {
        'type': 'basic',
        'in': 'header',
        'name': 'Authorization'
    },
}
