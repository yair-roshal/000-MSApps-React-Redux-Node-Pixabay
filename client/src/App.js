import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPhotos, setCurrentPage } from "./redux/photoSlice"
import PhotoModal from "./components/PhotoModal"
import "./styles/App.css"
import "./styles/PhotoModal.css"

function App() {
  const dispatch = useDispatch()
  const { data, status, error, currentPage, totalPages } = useSelector(
    (state) => state.photos
  )
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [category, setCategory] = useState("nature")

  useEffect(() => {
    dispatch(fetchPhotos(category))
  }, [dispatch, category])

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1))
      dispatch(fetchPhotos(`${category}&page=${currentPage - 1}`))
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1))
      dispatch(fetchPhotos(`${category}&page=${currentPage + 1}`))
    }
  }

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory)
  }

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo)
  }

  const handleModalClose = () => {
    setSelectedPhoto(null)
  }

  return (
    <div className="app-container">
      <div className="button-container">
        <button onClick={handlePrevPage}>Prev</button>
        <button onClick={() => handleCategoryChange("animals")}>Animals</button>
        <button onClick={() => handleCategoryChange("sports")}>Sports</button>
        <button onClick={() => handleCategoryChange("work")}>Work</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
      {status === "loading" && <div>Loading...</div>}
      {status === "succeeded" && (
        <div className="photo-grid">
          {data.slice(0, 9).map((photo) => (
            <img
              key={photo.id}
              src={photo.webformatURL}
              alt={photo.tags}
              onClick={() => handlePhotoClick(photo)}
            />
          ))}
        </div>
      )}
      {status === "failed" && <div>Error: {error}</div>}

      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} onClose={handleModalClose} />
      )}
    </div>
  )
}

export default App
