#!/usr/bin/env python
import json
import urllib2
import model
from model import Movie, Movie_Location
from model import session as dbsession
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey

# Fill the database of with movie overview and movie location data
def load_movie_data(dbsession):
	movie_data = None
	movie_url = "https://data.sfgov.org/api/views/yitu-d5am/rows.json?accessType=DOWNLOAD"
	req = urllib2.Request(movie_url)
	response = urllib2.urlopen(req)
	movie_data = json.load(response)
	print movie_data
	for movie in movie_data['data']:
		title = movie[8]
		print title
		movie_in_db = dbsession.query(model.Movie).filter_by(movie_title = title).all()
		print movie_in_db
		if movie_in_db == []:
			year = movie[9]
			print "YEAR", year
			movies = model.Movie(\
							movie_title = title,\
							year = year)
			dbsession.add(movies)
			dbsession.commit()
		else:
			pass

def load_movie_location_data(session):
	movie_locations = None
	fun_fact = None
	movie_url="https://data.sfgov.org/api/views/yitu-d5am/rows.json?accessType=DOWNLOAD"
	req = urllib2.Request(movie_url)
	response = urllib2.urlopen(req)
	movie_locations = json.load(response)
	for movie in movie_locations['data']:
		title = movie[8]
		location = movie[10]
		print "Now second function"
		print "title", title, "location", location
		movie_id=dbsession.query(model.Movie).filter_by(movie_title = title).all()
		print movie_id[0].id
		location_in_db = dbsession.query(model.Movie_Location).filter_by(location = location).filter_by(movie_id = movie_id[0].id).all()
		print location_in_db
		if location_in_db == []:
			if movie[11]:
				fun_fact = movie[11]
			else:
				fun_fact = None
				print "FUN FACT", fun_fact
			movie_locations = model.Movie_Location(\
							movie_id = movie_id[0].id,\
							location = location,\
							fun_facts = fun_fact)
			dbsession.add(movie_locations)
		else:
			pass 
	dbsession.commit()

def main():
	model.create_tables()
	s = model.add_data()
	load_movie_data(s)
	load_movie_location_data(s)
    
if __name__ == "__main__":
    main()
    