import React, { useState, useEffect } from 'react'

const Gallery = () => {
  const [images, setImages] = useState([])
  const [current, setCurrent] = useState(null)
  useEffect(() => {
    fetch('/images')
      .then(res => res.json())
      .then(setImages)
  }, [])

  return (
    <div>
      <ul>
        {images.map((src, i) => (
          <li onClick={() => setCurrent(i)} key={`images_${i}`}>
            {src}
          </li>
        ))}
      </ul>
      {images[current] !== undefined && <img src={images[current]} />}
    </div>
  )
}

export default Gallery
