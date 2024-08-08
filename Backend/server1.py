from flask import Blueprint, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import requests

server1 = Blueprint('server1', __name__)
CORS(server1)

def fetch_poster(movie_id):
    response = requests.get('https://api.themoviedb.org/3/movie/{}?api_key=f77d6c43d78bd0447f0a8108e61723b8'.format(movie_id))
    data = response.json()
    return "https://image.tmdb.org/t/p/w500/" + data['poster_path']

def recommend(movie):
    movie_index = movies[movies['title'] == movie].index[0]
    distances = similarity[movie_index]
    movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:11]

    recommended_movies = []
    recommended_movies_posters = []
    for i in movies_list:
        movie_id = movies.iloc[i[0]].movie_id
        recommended_movies.append(movies.iloc[i[0]].title)
        recommended_movies_posters.append(fetch_poster(movie_id))
    return recommended_movies, recommended_movies_posters

movies_dict = pickle.load(open('movie_dict.pkl', 'rb'))
movies = pd.DataFrame(movies_dict)
similarity = pickle.load(open('similarity.pkl', 'rb'))

@server1.route('/recommend', methods=['GET'])
def recommend_movies():
    movie = request.args.get('movie')
    recommended_movies, recommended_movies_posters = recommend(movie)
    return jsonify({'names': recommended_movies, 'posters': recommended_movies_posters})

@server1.route('/movies', methods=['GET'])
def get_movies():
    return jsonify({'movies': movies['title'].tolist()})
