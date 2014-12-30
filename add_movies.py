#!/usr/bin/env python
import json
import urllib2
import model
from model import Movie_Location
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, DateTime

# Fill the database of with movie location data
def load_movie_location_data(session):
	movie_data = None
	movie_url="https://data.sfgov.org/api/views/yitu-d5am/rows.json?accessType=DOWNLOAD"
	req = urllib2.Request(movie_url)
	response = urllib2.urlopen(req)
	movie_data = json.load(response)
	for movie in movie_data['data']:
		movie_location = model.Movie_Location(\
							movie_title = movie[8],\
							year = (movie[9]),\
							location = movie[10]\
							)
		session.add(movie_location)
	session.commit()

def main():
	model.create_table()
	s = model.add_data()
	load_movie_location_data(s)
    
if __name__ == "__main__":
    main()
    