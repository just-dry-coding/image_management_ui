import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const response = await fetch("http://localhost:8000/test")
    const todos = await response.json()
  };


  return (
    <div>
      <h1>Images</h1>
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Image ${index}`} style={{ width: '300px', height: 'auto' }} />
      ))}
    </div>
  );
};

export default App;
