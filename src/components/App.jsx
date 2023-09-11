import React from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { getSearchedImages, loadMoreImages } from "api/api";
import { Button } from "./Button/Button";
import { TailSpin } from 'react-loader-spinner'
import { Modal } from "./Modal/Modal";
import { GlobalStyles } from "./GlobalStyles";
import { useState } from "react";
import { useEffect } from "react";
export const App = () => {
const [searchedElements, setSearchedElements] = useState([])
const [inputValue, setInputValue] = useState("")
const [page, setPage] = useState(2)
const [totalPages, setTotalPages] = useState("")
const [loader, setLoader] = useState(false)
const [isModalOpen, setIsModalOpen] = useState(false)
const [modalData, setModalData] = useState('')
useEffect(() => {
  document.addEventListener('keydown', onCloseCard);

  return () => {
    document.removeEventListener('keydown', onCloseCard)
  }
}, [])

const onCloseCard = evt => {
if (evt.code === "Escape") {
  return setIsModalOpen(false)
}
}
const onCardClick = evt => {
  const imageData = evt.currentTarget.dataset.image
  setIsModalOpen(true)
  setModalData(imageData)
}

const onBtnSubmit = evt => {
  evt.preventDefault()
  const search = evt.currentTarget.name.value
  setInputValue(search)
  setPage(2)
}
const onLoadMore = () => {
  loadMoreImages(inputValue, page)
  .then(resp => {
    setSearchedElements(prevElements => {
      return [...searchedElements, ...resp.data.hits]
    })
    setPage(prevPage => {
      return prevPage += 1
    })
    setTotalPages(prevStateTotalPages => {
      return prevStateTotalPages - 1
    })
    setLoader(true)
  })
  .catch(err => console.log(err))
  .finally(resp => {
    setLoader(false)
  })
}
useEffect(() => {
if (inputValue.length > 0) {
  getSearchedImages(inputValue)
  .then(resp => {
    setSearchedElements(resp.data.hits)
    setTotalPages((resp.data.totalHits / 12).toFixed(0))
    setLoader(true)
    })
    .catch(err => console.log(err))
    .finally(resp => {
      setLoader(false)
    })
}
}, [inputValue])



    return <>
      <Searchbar submit={onBtnSubmit}/>
      <main>
        <section>
                {loader === true && <TailSpin
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>}  
        <ImageGallery elements={searchedElements} click={onCardClick}/>
        {totalPages > 0 && <Button funcForButton={onLoadMore}/>}
        
{isModalOpen && <Modal imageData={modalData}/>}
        </section>
      </main>
      <GlobalStyles/>
    </>
};
