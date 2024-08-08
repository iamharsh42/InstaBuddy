from flask import Flask
from server1 import server1
from server2 import server2

app = Flask(__name__)

# Register the blueprints
app.register_blueprint(server1, url_prefix='/server1')
app.register_blueprint(server2, url_prefix='/server2')

if __name__ == '__main__':
    app.run(debug=True)
