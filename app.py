import model
import json
from model import session as dbsession
from jinja2 import Template
from flask import Flask, render_template, request
app = Flask(__name__)

@app.route("/")
def index():
    # return "Hello World!"
    return render_template("index.html")

@app.route("/lookup", methods = ['GET', 'POST'])
def lookup():
	print request.values['movie']
	movie_input = request.values['movie']
	print movie_input
	movies = dbsession.query(model.Movie_Location).filter_by(movie_title = movie_input).all()
	location_list = []
	for movie in movies:
		print movie.location
		location_list.append(movie.location)
	print location_list
	movie_data = json.dumps(location_list)
	return movie_data


if __name__ == "__main__":
    app.run(debug = True)