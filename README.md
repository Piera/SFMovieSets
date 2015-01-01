Project-U-C
===========

**Project Uber-Challenge is a code challenge for Uber: SF Movie Sets**

**Description of the problem and solution:**

Problem statement, from Uber:
"Create a service that shows on a map where movies have been filmed in San Francisco. The user should be able to filter the view using autocompletion search."

Solution:  
Movie and location information are stored in two related PostgreSQL tables (movies, and movie_locations); locations are geocoded on the server side using Google maps API.  Movie input is acquired through a client-side jQuery autocomplete solution, and apis are handled via Get requests to a python Flask micro framework, which returns json objects for front end rendering or API json.

**Focus:**
Back End

**Reasoning behind technology/architecture choices, trade-offs, what's left, etc.:**

*Database:*  
I chose to store the movie and location information in a relational database, so that users would not be subject to film data API limits or delays.  Originally, I used client side script to handle the geocoding, but faced API limits.  I then updated the add_movies seeding script to handle the geocoding and store the values in the database. API limits are circumvented by using a 1 second delay.  The seeding scripts can be run periodically to update the tables with any new films.  I chose to use PostgreSQL because of my familiarity with the technology and compatibility with Heroku.  If I were handling haversine calculations, for example, to find the 5 closest film sets to a given location, MongoDB would be a good option.  For the functionality I am providing, a relational database allows for expansion of the APIs, and is compatible with the deployment platform.

*Sqlalchemy ORM:*  
I chose Sqlalchemy ORM due to my familiarity with the technology and compatibility with PostgreSQL and Flask.

*Python:* 
My first language and still my favorite!

*Flask:*  
This is the micro framework that I am familiar with.  For a project of this size / complexity, I didn’t see a reason to try another framework.

*jQuery:*  
I used jQuery to handle the AJAX requests, to update the DOM, and jQuery UI to provide the autocomplete search functionality.  Given the simplicity of the front end of this project, I found jQuery was a good fit and it is also the solution that I am most familiar with.   I would be interested to learn more about Backbone.js!

*Bootstrap:*
To maintain focus on the back end, I chose to use Boostrap to prototype the solution.

*Testing:*  
This is on the "what is left" list.  I am eager to learn more about unit and integration tests, and tests specifically for APIs!

*If I were to spend more time on the project:*
- First and formost: unit tests!
Then:
- Move the autocomplete to the server side, so that the functionality would accommodate any movie additions without maintaining a list in the main.js file.
- Improve performance of geocode service (e.g. clean data going into geocode)
- Provide geospacial features (closest film sets, film tour routes)
- Improve responsiveness and front end

**Link to other code, projects:**
[SnowBase](http://snowbase-project.herokuapp.com/), 
http://github.com/Piera/Project

**Link to your resume or public profile.**
http://linkedin.com/in/pieradamonte

**Link to to the hosted application:**
[SFMovieSets](http://sfmoviesets-project.herokuapp.com/), 
http://github.com/Piera/Project-U-C
