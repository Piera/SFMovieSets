import os
import model
import json
from model import session as dbsession
from jinja2 import Template
from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/lookup', methods = ['GET', 'POST'])
def lookup():
	print request.values['movie']
	movie_input = request.values['movie']
	print movie_input
	movie_id=dbsession.query(model.Movie).filter_by(movie_title = movie_input).all()
	if movie_input not in movie_id:
		print "BAD"
	print movie_id[0].id
	movies = dbsession.query(model.Movie_Location).filter_by(movie_id = movie_id[0].id).all()
	location_list = []
	for movie in movies:
		print movie.location
		print movie.fun_facts
		if movie.fun_facts:
			location_list.append({'location': movie.location, 'fun_fact': movie.fun_facts, 'lat':movie.lat, 'lng':movie.lng})
		else: 
			location_list.append({'location': movie.location, 'lat':movie.lat, 'lng':movie.lng})
	print location_list
	if location_list == []:
		location_list = ({'Error': "This movie is not in our SF Movie Sets database"})
	movie_data = json.dumps(location_list)
	return movie_data

@app.route('/all-movies')
def movie_list():
	movie_dict = {}
	movie_list = []
	movies = dbsession.query(model.Movie.movie_title).all()
	for movie in movies:
		movie_list.append(movie)
		movie_dict["All movies"] = movie_list
	all_movies = json.dumps(movie_dict)
	return all_movies

@app.route('/<path:year>')
def movies_by_year(year):
	movie_dict = {}
	movie_list = []
	year = int(year)
	movies = dbsession.query(model.Movie.movie_title).filter_by(year=year).all()
	print movies
	for movie in movies:
		movie_list.append(movie)
		movie_dict[year] = movie_list
	movie_by_year = json.dumps(movie_dict)
	return movie_by_year

if __name__ == "__main__":
	PORT = int(os.environ.get("PORT", 5000))
	DEBUG = "NO_DEBUG" not in os.environ
	app.run(debug = DEBUG, port=PORT, host="0.0.0.0")
