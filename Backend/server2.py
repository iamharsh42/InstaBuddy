from flask import Blueprint, jsonify, request
import pickle
import numpy as np

server2 = Blueprint('server2', __name__)

popular_df = pickle.load(open('popular.pkl', 'rb'))
pt = pickle.load(open('pt.pkl', 'rb'))
books = pickle.load(open('books.pkl', 'rb'))
similarity_scores = pickle.load(open('similarity_scores.pkl', 'rb'))

@server2.route('/api/books', methods=['GET'])
def get_books():
    books_data = popular_df.to_dict('records')
    return jsonify(books_data)

@server2.route('/api/recommend', methods=['GET'])
def recommend_books():
    data = request.get_json()
    user_input = request.args.get('book')
    
    if user_input in pt.index:
        index = np.where(pt.index == user_input)[0][0]
        similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:10]

        recommendations = []
        for i in similar_items:
            temp_df = books[books['Book-Title'] == pt.index[i[0]]]
            item = {
                'title': temp_df['Book-Title'].values[0],
                'author': temp_df['Book-Author'].values[0],
                'image_url': temp_df['Image-URL-M'].values[0]
            }
            recommendations.append(item)

        return jsonify(recommendations)
    else:
        return jsonify({'error': f"No book found with title '{user_input}'. Please try another title."}), 404
