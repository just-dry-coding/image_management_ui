import React, { useState, useEffect } from 'react';
import { ImageGallery, Image } from './components/ImageGallery';
import axios from 'axios';

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImage = async (imageId: string) => {
    const response = await fetch(`http://localhost:8000/images/${imageId}`)
    const blob = await response.blob()
    const localUrl = URL.createObjectURL(blob);

    const contentDisposition = response.headers.get("Content-Disposition");
    const filename = contentDisposition ? contentDisposition.split(";")[1].split("=")[1] : "default.jpg";
    console.log(filename)
    return new Image(filename.replace(/"/g, ''), localUrl, imageId)
  }

  const fetchImages = async () => {
    const response = await fetch("http://localhost:8000/images")
    const image_ids = await response.json()

    let imagesLocal: Image[] = []
    for (let i = 0; i < image_ids.length; i++) {
      const image = await fetchImage(image_ids[i].toString())
      imagesLocal.push(image)
    }
    setImages(imagesLocal)
  };

  const onEdit = (index: number) => {
    try {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.click();

      fileInput.onchange = async (e: any) => {
        const uploadedImage = e.target.files[0]
        const url = URL.createObjectURL(uploadedImage);
        images[index].name = uploadedImage.name
        images[index].url = url

        const formData = new FormData()
        formData.append('file', uploadedImage)

        try {
          await axios.put(`http://localhost:8000/images/${images[index].id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          console.log('Image edited successfully');
        } catch (error) {
          console.error('Error editing image', error);
        }
      };
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  const onDelete = async (index: number) => {
    try {
      await axios.delete(`http://localhost:8000/images/${images[index].id}`);

      images.splice(index, 1)
      setImages(images)

      console.log('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image', error);
    }
  };

  return (
    <div>
      <h2>MQTT image management UI</h2>
      <ImageGallery images={images} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export default App;
