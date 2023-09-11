import PropTypes from "prop-types";
export const ImageGalleryItem = ({searchedElement, onCardClick}) => {
    return <li data-image={searchedElement.largeImageURL} onClick={onCardClick}>
        <img src={searchedElement.webformatURL} alt={searchedElement.tags}/>
    </li>
}
ImageGalleryItem.propTypes = {
    searchedElement: PropTypes.object,
    onCardClick: PropTypes.func
  };