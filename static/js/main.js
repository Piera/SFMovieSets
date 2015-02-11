var map;
var positions = [];

$(document).ready(function() {
    initialize();
});

$('#movie-info').html('<h2>Welcome to SF Movie Sets!</h2><br>');
$('#movie-info').append('<h4>Start typing in the search bar to search for movies filmed in San Francisco.<h4>');
$('#movie-info').append('<h4>Or, take advantage of one of our three APIs detailed below.</h4>');

$('#api-info').html('<br><h2>Use our APIs to look up movies filmed in San Francisco</h2><br>');
$('#api-info').append('<h3>Movie Lookup:</h3>');
$('#api-info').append('<h4>Request Parameters:</h4> Movie title (string)');
$('#api-info').append('<h4>Response Parameters:</h4>location (string):  Street address or description of location;<br>lat (float or null):  latitude<br>lng (float or null):  longitude<br>');
$('#api-info').append('<h4>Description:</h4>Any movie title that can be found using our autocomplete. E.g., "Alcatraz"<br>');
$('#api-info').append('If there are more than one words in the title, replace spaces with "+". Example "Jagged+Edge"<br></h4>');
$('#api-info').append('<h4>Sample call / click to view sample response:</h4>');
$('#api-info').append('<a href = "http://sfmoviesets-project.herokuapp.com/api/lookup?movie=180" target="_blank">http://sfmoviesets-project.herokuapp.com/lookup?movie=180</a><br>');
$('#api-info').append('<a href = "http://sfmoviesets-project.herokuapp.com/api/lookup?movie=Jagged+Edge" target="_blank">http://sfmoviesets-project.herokuapp.com/lookup?movie=Jagged+Edge</a><br></h4>');

$('#api-info').append('<h3>Movies by Year:</h3>');
$('#api-info').append('<h4>Request Parameters:</h4> Year (int)');
$('#api-info').append('<h4>Response Parameters:</h4>year (int):  year<br>movie title (string): movie title from our movie database that was made during the input year<br>');
$('#api-info').append('<h4>Description:</h4>Search for movies from any year beginning in year 1915, to current');
$('#api-info').append('<h4>Sample call / click to view sample response:</h4>');
$('#api-info').append('<a href = "http://sfmoviesets-project.herokuapp.com/api/1988" target="_blank">http://sfmoviesets-project.herokuapp.com/1988</a><br>');

$('#api-info').append('<h3>All Movies:</h3>');
$('#api-info').append('<h4>Request Parameter:</h4>all-movies');
$('#api-info').append('<h4>Response Parameters:</h4>All movies (string):  all 266 movie titles from our database!');
$('#api-info').append('<h4>Call / Response:</h4>');
$('#api-info').append('<a href = "http://sfmoviesets-project.herokuapp.com/api/all-movies" target="_blank">http://sfmoviesets-project.herokuapp.com/all-movies</a><br>');


$('#movie-form').submit(function(evt) {
    evt.preventDefault();  
    var movie = $("#movie").val()

    $.get(
        "/lookup", {
            movie: movie
        },

        function (response) {
            if (response['Error']) {
                $('#movie-info').html('');
                $('#movie-info').append('<h3>Set locations for ' + movie + ' are not in our database.  Try again!');
            } else {
                clearAllMap();
                coordinates_array=[];
                var infowindow = null;
                infowindow = new google.maps.InfoWindow();
                var all_coordinates = [];
                $('#movie-info').html('');
                $('#movie-info').append('<h3>Set locations for ' + movie + ':<br><br></h3>');
                for (var i in response) {
                    if (response[i]['fun_fact']) {
                        info_text = ("<strong>Location: </strong>" + response[i]['location'] + "<br><strong>Fun fact: </strong>" + response[i]['fun_fact']);
                    } else {
                        info_text = ("<strong>Location: </strong>" + response[i]['location']);
                    }
                    $("#movie-info").append('<li>' + response[i]['location'] + '</li><br>');
                    if (response[i]['lat']) {
                        var lat = response[i]['lat'];
                        var lng = response[i]['lng'];
                        console.log(lat, lng)
                        var coordinate = new google.maps.LatLng(lat,lng);
                        marker = new google.maps.Marker ({
                            map: map,
                            position: coordinate,
                            info: info_text,
                            animation: google.maps.Animation.DROP,
                        });
                        all_coordinates.push(coordinate);
                        bounds = new google.maps.LatLngBounds();
                        for (i=0;i<all_coordinates.length;i++) {
                            bounds.extend(all_coordinates[i]);
                        }
                        map.fitBounds(bounds);
                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow.setContent(this.info);
                            infowindow.open(map, this);
                        });
                        positions.push(marker);
                    } else {
                        continue;
                    }
                }         
            }
        },
    "json"
    )
});

function initialize() {
    geocoder = new google.maps.Geocoder();
    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(37.7577, -122.4376)
    };
    map = new google.maps.Map($('#map-canvas')[0], mapOptions);
}

function clearAllMap(map) {
    if (positions.length !=0) {
        for (var i = 0; i < positions.length; i++) {
            positions[i].setMap(null)
        }
        positions = [];
    } 
    else {
        console.log("Nothing to clear");
    }
}

$(function() {
    var movie_list = 
        [
            "Final Analysis",
            "Jagged Edge",
            "Dream with the Fishes",
            "Serial",
            "A Smile Like Yours ",
            "Sudden Impact",
            "The Towering Inferno",
            "Hemingway & Gelhorn",
            "Big Sur",
            "The Dead Pool",
            "Big Touble in Little China",
            "The Jazz Singer",
            "Fathers' Day",
            "Nine to Five",
            "I's",
            "The Conversation",
            "The Laughing Policeman",
            "Barbary Coast",
            "Dying Young",
            "The Princess Diaries",
            "The Ten Commandments",
            "The Zodiac",
            "Play it Again, Sam",
            "The Sweetest Thing",
            "The Diary of a Teenage Girl",
            "Harold and Maude",
            "Knife Fight",
            "I Remember Mama",
            "The Net",
            "George of the Jungle",
            "Need For Speed",
            "Flubber",
            "24 Hours on Craigslist",
            "Birdman of Alcatraz",
            "Serendipity",
            "Metro",
            "Julie and Jack",
            "Magnum Force",
            "House of Sand and Fog",
            "The Presidio",
            "Flower Drum Song",
            "The Organization",
            "Milk",
            "Broken-A Modern Love Story ",
            "Golden Gate",
            "Marnie",
            "Superman",
            "My Reality",
            "Tin Cup",
            "Red Widow",
            "The Doors",
            "Getting Even with Dad",
            "San Francisco",
            "Homeward Bound II: Lost in San Francisco",
            "Crackers",
            "Can't Stop the Music",
            "James and the Giant Peach",
            "Until the End of the World",
            "Hard to Hold",
            "Red Diaper Baby",
            "The Nightmare Before Christmas",
            "Greed",
            "Burglar",
            "Interview With The Vampire",
            "The Lineup",
            "Never Die Twice",
            "Take the Money and Run",
            "The Wedding Planner",
            "How Stella Got Her Groove Back",
            "Down Periscope",
            "Sister Act 2: Back in the Habit",
            "What the Bleep Do We Know",
            "Guess Who's Coming to Dinner",
            "Sister Act",
            "Foul Play",
            "Big Eyes",
            "The Enforcer",
            "Junior",
            "The Bridge",
            "God is a Communist?* (show me heart universe)",
            "It Came From Beneath the Sea",
            "Freebie and the Bean",
            "Swingin' Along",
            "The Doctor",
            "The Times of Harvey Milk",
            "Haiku Tunnel",
            "Point Blank",
            "Raising Cain",
            "The Pursuit of Happyness",
            "Shoot the Moon",
            "Sausalito",
            "Sense8",
            "The House on Telegraph Hill",
            "Dawn of the Planet of the Apes",
            "Experiment in Terror",
            "Seven Girlfriends",
            "Looking",
            "Nora Prentiss",
            "Alexander's Ragtime Band",
            "Quicksilver",
            "Heart Beat",
            "About a Boy",
            "Mission (aka City of Bars)",
            "Just Like Heaven",
            "Time After Time",
            "D.O.A",
            "A View to a Kill",
            "Swing",
            "On the Road",
            "The Fan",
            "To the Ends of the Earth",
            "Forrest Gump",
            "Live Nude Girls Unite",
            "Tweek City",
            "Parks and Recreation",
            "What's Up Doc?",
            "48 Hours",
            "Another 48 Hours",
            "Escape From Alcatraz",
            "Basic Instinct",
            "Petulia",
            "Love & Taxes",
            "City of Angels",
            "The Rock",
            "Rent",
            "Alcatraz",
            "Night of Henna",
            "Groove",
            "Dopamine",
            "Copycat",
            "So I Married an Axe Murderer",
            "American Graffiti",
            "Sudden Fear",
            "The Competiton",
            "Days of Wine and Roses",
            "Hereafter",
            "The Internship",
            "Quitters",
            "The Graduate",
            "Hello Frisco, Hello",
            "Chu Chu and the Philly Flash",
            "Rollerball",
            "Blue Jasmine",
            "The Love Bug",
            "Dim Sum: A Little Bit of Heart",
            "A Night Full of Rain",
            "A Smile Like Yours",
            "Maxie",
            "Invasion of the Body Snatchers",
            "Godzilla",
            "The Birds",
            "Stigmata",
            "Street Music",
            "Kamikaze Hearts",
            "The Maltese Falcon",
            "Romeo Must Die",
            "The Caine Mutiny",
            "Boys and Girls",
            "Forty Days and Forty Nights",
            "What Dreams May Come",
            "Tucker: The Man and His Dreams",
            "The Californians",
            "The Last of the Gladiators",
            "Fearless",
            "Bullitt",
            "Jade",
            "On the Beach",
            "Midnight Lace",
            "They Call Me MISTER Tibbs",
            "Star Trek VI: The Undiscovered County",
            "The Other Sister",
            "Dream for an Insomniac",
            "Panther",
            "Yours, Mine and Ours",
            "Vegas in Space",
            "Gentleman Jim",
            "Pretty Woman",
            "Woman on the Run",
            "Dark Passage",
            "Nine Months",
            "Bedazzled",
            "Mother",
            "High Crimes",
            "By Hook or By Crook",
            "Terminator - Genisys",
            "Memoirs of an Invisible Man",
            "The Woman In Red",
            "The Bachelor",
            "The Game",
            "The Matrix",
            "Phenomenon",
            "180",
            "The Parent Trap",
            "Family Plot",
            "Common Threads: Stories From the Quilt",
            "Pal Joey",
            "Mrs. Doubtfire",
            "Patch Adams",
            "Psych-Out",
            "Attack of the Killer Tomatoes",
            "Star Trek II : The Wrath of Khan",
            "Ant-Man",
            "Around the Fire",
            "Pleasure of His Company",
            "Edtv",
            "Sneakers",
            "Hulk",
            "Fandom",
            "Bee Season",
            "Susan Slade",
            "Mona Lisa Smile",
            "True Believer",
            "Just One Night",
            "Happy Gilmore",
            "Faces of Death",
            "The Right Stuff",
            "Twisted",
            "Herbie Rides Again",
            "The Master",
            "Confessions of a Burning Man",
            "Patty Hearst",
            "Jack",
            "Innerspace",
            "The Core",
            "Shattered",
            "High Anxiety",
            "CSI: NY- episode 903",
            "Vertigo",
            "Dirty Harry",
            "Casualties of War",
            "Zodiac",
            "Fat Man and Little Boy",
            "Sweet November",
            "San Andreas",
            "A Jitney Elopement",
            "The Candidate",
            "Class Action",
            "Thief of Hearts",
            "50 First Dates",
            "Star Trek IV: The Voyage Home",
            "Babies",
            "Cherish",
            "When a Man Loves a Woman",
            "Bicentennial Man",
            "Beaches",
            "Indiana Jones and the Last Crusade",
            "After the Thin Man",
            "Sphere",
            "Heart and Souls",
            "Pacific Heights",
            "Playing Mona Lisa",
            "Shadow of the Thin Man",
            "Nina Takes a Lover",
            "All About Eve",
            "Doctor Doolittle",
            "American Yearbook",
            "Under the Tuscan Sun",
            "The Fog of War",
            "Murder in the First",
            "Chan is Missing",
            "Woman on Top",
            "The Assassination of Richard Nixon",
            "The Lady from Shanghai",
            "Dr. Doolittle 2",
            "Joy Luck Club",
            "Desperate Measures"
        ]
    $("#movie").autocomplete( { source: movie_list });
});

