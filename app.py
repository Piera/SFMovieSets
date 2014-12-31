import os
import model
import json
from model import session as dbsession
from jinja2 import Template
from flask import Flask, render_template, request
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/lookup", methods = ['GET', 'POST'])
def lookup():
	print request.values['movie']
	movie_input = request.values['movie']
	print movie_input
	movie_id=dbsession.query(model.Movie).filter_by(movie_title = movie_input).all()
	movies = dbsession.query(model.Movie_Locations).filter_by(movie_id = movie_id.id).all()
	location_list = []
	for movie in movies:
		print movie.location
		location_list.append(movie.location)
	print location_list
	movie_data = json.dumps(location_list)
	return movie_data

@app.route("/all_movies")
def movie_list():
	movie_dict = {}
	movies = dbsession.query(model.Movie.movie_title).all()
	counter = 0
	for movie in movies:
		print movie
		movie_dict[movie] = counter
		counter = counter + 1
	print movie_dict.keys()
	print len(movie_dict.values())
	movie_titles_list = movie_dict.keys()
	print movie_titles_list
	all_movies = json.dumps(movie_titles_list)
	return all_movies

if __name__ == "__main__":
	PORT = int(os.environ.get("PORT", 5000))
	DEBUG = "NO_DEBUG" not in os.environ
	app.run(debug = DEBUG, port=PORT, host="0.0.0.0")