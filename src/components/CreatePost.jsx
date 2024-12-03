import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import { db, auth } from '../credenciales.js';

const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description) {
      alert('Por favor, añade una descripcion.');
      return;
    }

    try {
      const postsRef = ref(db, 'posts');
      await push(postsRef, {
        description,
        image: image || '',
        userEmail: auth.currentUser.email,
        createdAt: Date.now(),
      });

      alert('Publicacion creada con exito!');
      navigate('/');
    } catch (error) {
      console.error('Error al crear la publicacion:', error);
      alert('Hubo un error al crear la publicacion. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="home-background">
      <Navbar /> 
      <div className="container mt-5">
        <h2 className="mb-4">Crear Nueva Publicacion</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descripcion</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Imagen</label>
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Crear Publicacion</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
