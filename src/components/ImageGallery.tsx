import React, { useState } from 'react'
import Masonry from 'react-masonry-css'
import './styles/ImageGallery.css'

export class Image {
    name: string
    url: string
    id: string

    constructor(name: string, url: string, id: string) {
        this.name = name
        this.url = url
        this.id = id
    }
}

interface Props {
    images: Image[]
    onEdit: (index: number) => void
    onDelete: (index: number) => void
}

export const ImageGallery = ({ images, onEdit, onDelete }: Props) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index)
    }

    const handleMouseLeave = () => {
        setHoveredIndex(null)
    }

    const breakpointColumns = {
        default: 3,
        1100: 2,
        700: 1,
    }

    return (
        <div
            style={{
                display: 'flex',
            }}
        >
            <Masonry
                breakpointCols={breakpointColumns}
                className='my-masonry-grid'
                columnClassName='my-masonry-grid_column'
            >
                {images.map((image, index) => (
                    <div
                        className='image-wrapper'
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            className='image-item'
                            src={image.url}
                            alt={image.name}
                        />
                        <div className='image-text'>{image.name}</div>
                        {hoveredIndex === index && (
                            <div className='button-container'>
                                <button
                                    className='edit-button'
                                    onClick={() => onEdit(index)}
                                >
                                    Edit
                                </button>
                                <button
                                    className='delete-button'
                                    onClick={() => onDelete(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </Masonry>
        </div>
    )
}
