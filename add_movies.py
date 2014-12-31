#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import time 
import urllib2
import model
import requests
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
		if movie[10] == None:
			location = 'San Francisco'
		else: 
			location = movie[10].encode('utf-8')
		print "title", title, "and location", location
		movie_id=dbsession.query(model.Movie).filter_by(movie_title = title).all()
		print movie_id[0].id
		location_in_db = dbsession.query(model.Movie_Location).filter_by(location = location).filter_by(movie_id = movie_id[0].id).all()
		if location_in_db == []:
			local_location = location + " San Francisco"
			print local_location
			escaped_local_location = local_location.replace (" ", "+")
			print escaped_local_location
			url="https://maps.googleapis.com/maps/api/geocode/json?address=%s" % escaped_local_location
			print url
			response = urllib2.urlopen(url)
			jsongeocode = json.loads(response.read())
			if jsongeocode['status'] == "OVER_QUERY_LIMIT":
				print "Over query limit"
			if jsongeocode['status'] == "ZERO_RESULTS":
				lat = None
				lng = None
			else:
				lat = jsongeocode['results'][0]['geometry']['location']['lat']
				print lat
				lng = jsongeocode['results'][0]['geometry']['location']['lng']
			print lat, lng
			# Make sure lat/long point is in or near SF:
			if lat > 37.9076397 and lat < 37.598555:
				lat = None
			if lng > -122.852002 and lng < -122.2482681:
				lng = None
			if movie[11]:
				fun_fact = movie[11]
			else:
				fun_fact = None
				print "FUN FACT", fun_fact
			movie_locations = model.Movie_Location(\
							movie_id = movie_id[0].id,\
							location = location,\
							fun_facts = fun_fact,\
							lat = lat,\
							lng = lng)
			dbsession.add(movie_locations)
			dbsession.commit()
			print "session committed"
			time.sleep(2)
			print "time delay 2 seconds"
		else:
			pass 

def main():
	# model.create_tables()
	s = model.add_data()
	# load_movie_data(s)
	load_movie_location_data(s)
    
if __name__ == "__main__":
    main()
    