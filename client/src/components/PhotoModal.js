import React from "react"

const PhotoModal = ({ photo, onClose }) => {
  return (
    <div className="photo-modal">
      <div className="photo-modal-content">
        <img src={photo.webformatURL} alt={photo.tags} />
        <div>
          <p>Views: {photo.views}</p>
          <p>Downloads: {photo.downloads}</p>
          <p>Collections: {photo.collections}</p>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default PhotoModal
