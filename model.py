import os
import psycopg2
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import create_engine, Column, Integer, String, DateTime

# ENGINE = create_engine('postgresql:///pieradamonte', echo = True)
# DATABASE_URL = 'postgresql:///pieradamonte'
DATABASE_URL = os.environ.get('DATABASE_URL', 'postgresql:///pieradamonte')
ENGINE = create_engine(DATABASE_URL, echo = False)

session = scoped_session(sessionmaker(bind=ENGINE, autocommit = False, autoflush = False)) 
Base = declarative_base()

class Movie_Location(Base):
    __tablename__ = "movie_locations"

    id = Column(Integer, primary_key = True)
    movie_title = Column(String(200), nullable = False)
    year = Column(Integer, nullable=False)
    location = Column(String(200), nullable = True)
  

def add_data():
    global ENGINE
    global Session

    # ENGINE = create_engine('postgresql:///pieradamonte', echo = True)
    ENGINE = create_engine(DATABASE_URL, echo = False)
    Session = scoped_session(sessionmaker(bind=ENGINE, autocommit = False, autoflush = False)) 

    session = Session()
    return Session()

def create_table():
    global ENGINE
    global Session

    # ENGINE = create_engine('postgresql:///pieradamonte', echo = True)
    ENGINE = create_engine(DATABASE_URL, echo = False)
    Session = sessionmaker(bind=ENGINE)
    Base.metadata.create_all(ENGINE)

    return Session()

def main():
    """Placeholder"""
    pass

if __name__ == "__main__":
    main()
    