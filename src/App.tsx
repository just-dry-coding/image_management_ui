import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [fetchedImage, setFetchedImage] = useState<string | null>(null);
  const [filename, setFilename] = useState<string>('default_x.jpg');
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const response = await fetch("http://localhost:8000/images")
    const image_ids = await response.json()
    for (let i = 0; i < image_ids.length; i++) {
      const image_url = `http://localhost:8000/images/${image_ids[i].toString()}`
      const image = await fetch(image_url)
      const blob = await image.blob()
      const fetchedImageUrl = URL.createObjectURL(blob);
      setFetchedImage(fetchedImageUrl);

      const contentDisposition = response.headers.get("Content-Disposition");
      const filenameTmp = contentDisposition ? contentDisposition.split(";")[1].split("=")[1] : "default.jpg";
      setFilename(filenameTmp)
    }

  };


  return (
    <div>
      <h1>Images</h1>
      {fetchedImage && (
        <img src={fetchedImage} alt={filename} style={{ maxWidth: '100%', marginTop: '10px' }} />
      )}
    </div>
  );
};

export default App;
