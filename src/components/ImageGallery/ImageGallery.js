import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { ImageGalleryStyled } from "./ImageGallery.styled"
import PropTypes from "prop-types";

export const ImageGallery = ({elements, click}) => {
    return <ImageGalleryStyled>
      {elements.map(element => <ImageGalleryItem key={element.id} searchedElement={element} onCardClick={click}/>
      )}
  </ImageGalleryStyled>
}
ImageGallery.propTypes = {
  elements: PropTypes.array,
  click: PropTypes.func
}