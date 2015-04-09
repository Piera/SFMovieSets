SF Movie Sets
===========

**Description of the problem and solution:**

Problem statement:

Create a service that shows on a map where movies have been filmed in San Francisco. The user should be able to filter the view using autocompletion search.

**Visit SF Movie Sets online:** 

[SFMovieSets](http://www.sfmoviesets.com) 

Solution Discussion:  

*Summary* 
Movie and location information are stored in two related PostgreSQL tables (movies, and movie_locations); locations are geocoded on the server side using Google maps API.  Movie input is acquired through a client-side jQuery autocomplete solution, and apis are handled via Get requests to a python Flask micro framework, which returns json objects for front end rendering or API json.

*Back-End: Database and Data Seeding*  
Movie and location information is stored in a relational database, so that users will not be subject to film data API limits or delays.  Originally, I used client side script to handle the geocoding, but faced API limits.  I then updated the add_movies seeding script to handle the geocoding and store the values in the database. API limits are circumvented by using a 1 second delay.  The seeding scripts can be run periodically to update the tables with any new films. For the functionality I am providing, a relational database allows for expansion of the APIs, and is compatible with the deployment platform.

*Front End*  
jQuery is used to handle the AJAX requests, to update the DOM, and jQuery UI is used to provide the autocomplete search functionality.  Given the simplicity of the front end of this project, I found jQuery to be a good fit.

*What's Next:*
- Docstrings and unit tests
- Move the autocomplete to the server side, so that the functionality would accommodate any movie additions without maintaining a list in the main.js file
- Improve performance of geocode service by parsing/cleaning data going into geocode API.
- Improve responsiveness and front end
- Provide geospacial features (closest film sets, film tour routes)

**Be sure to check out SnowBase!**
[SnowBase](http://www.snow-base.com/) 
http://github.com/Piera/Project

**Learn more about me:**
[www.pieradamonte.com](http://www.www.pieradamonte.com) 


