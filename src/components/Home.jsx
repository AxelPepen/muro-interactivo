import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import Navbar from './Navbar.jsx'; 
import { db } from '../credenciales.js';

const Home = ({ correoUsuario }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = ref(db, 'posts');
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postsList = Object.entries(data).map(([id, post]) => ({
          id,
          ...post,
        }));
        setPosts(postsList.reverse());
      } else {
        setPosts([]);
      }
    });
  }, []);

  return (
    <div className="home-background">
      <Navbar /> {/* Usa el componente Navbar */}
      <div className="container">
        <h2 className="text-center mb-4">Publicaciones Recientes</h2>
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col-md-4 mb-4">
              <div className="card">
                {post.image && (
                  <img
                    src={post.image}
                    className="card-img-top"
                    alt="Publicación"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <p className="card-text">{post.description}</p>
                  <p className="card-text">
                    <small className="text-muted">Por: {post.userEmail}</small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
