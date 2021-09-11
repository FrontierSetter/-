from flask import Flask, render_template
import os
from gevent import pywsgi

app = Flask(__name__, static_url_path='')

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/<html_name>")
def get_html(html_name):
    print(html_name)
    return render_template(html_name)

server = pywsgi.WSGIServer(('0.0.0.0', 8080), app)
server.serve_forever()