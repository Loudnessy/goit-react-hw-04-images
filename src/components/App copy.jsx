import React, { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { getSearchedImages, loadMoreImages } from "api/api";
import { Button } from "./Button/Button";
import { TailSpin } from 'react-loader-spinner'
import { Modal } from "./Modal/Modal";
import { GlobalStyles } from "./GlobalStyles";
export class App extends Component {
state = {
  searchedElements: [],
  inputValue: "",
  page: 2,
  totalPages: "",
  loader: false,
  isModalOpen: false,
  modalData: ''
}
componentDidMount() {
  document.addEventListener('keydown', this.onCloseCard);
}
onCloseCard = evt => {
if (evt.code === "Escape") {
  return this.setState({isModalOpen: false})
}
}
onCardClick = evt => {
  const imageData = evt.currentTarget.dataset.image
  this.setState(prevState => {
    return {isModalOpen: true,
      modalData: imageData
    }
  })
}

onBtnSubmit = evt => {
  evt.preventDefault()
  const search = evt.currentTarget.name.value
  return this.setState(prevState => {
    return {inputValue: search,
    page: 2
    }
  })
}
onLoadMore = () => {
  const {searchedElements, inputValue, page} = this.state
  loadMoreImages(inputValue, page)
  .then(resp => {
    this.setState(prevState => {
      return {searchedElements: [...searchedElements, ...resp.data.hits],
      page: prevState.page += 1,
      totalPages: prevState.totalPages - 1,
      loader: true
      }
    })
  })
  .catch(err => console.log(err))
  .finally(resp => {
    this.setState(prevState => {
      return {loader: false}
    })
  })
}
async componentDidUpdate(prevProps, prevState) {
  if (prevState.inputValue === this.state.inputValue) {
    return
  } else {
getSearchedImages(this.state.inputValue)
.then(resp => {
    this.setState(prevState => {
      return {searchedElements: resp.data.hits,
        totalPages: (resp.data.totalHits / 12).toFixed(0),
        loader: true
      }
    })
  })
  .catch(err => console.log(err))
  .finally(resp => {
    this.setState(prevState => {
      return {loader: false}
    })
  })
  }
}
  render() {
    const {searchedElements, totalPages, loader, isModalOpen, modalData} = this.state
    return <>
      <Searchbar submit={this.onBtnSubmit}/>
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
        <ImageGallery elements={searchedElements} click={this.onCardClick}/>
        {totalPages > 0 && <Button funcForButton={this.onLoadMore}/>}
        
{isModalOpen && <Modal imageData={modalData}/>}
        </section>
      </main>
      <GlobalStyles/>
    </>
  }
};
