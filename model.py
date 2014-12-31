import os
import psycopg2
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session, relationship, backref
from sqlalchemy import create_engine, Column, Integer, Float, String, ForeignKey

DATABASE_URL = os.environ.get('DATABASE_URL', 'postgresql:///pieradamonte')
ENGINE = create_engine(DATABASE_URL, echo = False)

session = scoped_session(sessionmaker(bind=ENGINE, autocommit = False, autoflush = False)) 
Base = declarative_base()

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key = True)
    movie_title = Column(String(200), nullable = False)
    year = Column(Integer, nullable=False)

class Movie_Location(Base):
    __tablename__ = "movie_locations"

    id = Column(Integer, primary_key = True)
    movie_id = Column(Integer, ForeignKey('movies.id'))
    location = Column(String(200), nullable = True)
    fun_facts = Column(String(500), nullable = True)
    lat = Column(Float, nullable = True)
    lng = Column(Float, nullable = True)
    movie = relationship("Movie", backref=backref("movie_locations", order_by=id))

def add_data():
    global ENGINE
    global Session

    ENGINE = create_engine(DATABASE_URL, echo = False)
    Session = scoped_session(sessionmaker(bind=ENGINE, autocommit = False, autoflush = False)) 

    session = Session()
    return Session()

def create_tables():
    global ENGINE
    global Session

    ENGINE = create_engine(DATABASE_URL, echo = False)
    Session = sessionmaker(bind=ENGINE)
    Base.metadata.create_all(ENGINE)

    return Session()

def main():
    pass

if __name__ == "__main__":
    main()
    