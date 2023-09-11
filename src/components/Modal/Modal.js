import { ModalStyled, ModalStyledOverlay } from "./Modal.styled"
import PropTypes from "prop-types";

export const Modal = ({imageData}) => {
    return <ModalStyledOverlay>
    <ModalStyled>
      <img src={imageData} alt="" />
    </ModalStyled>
  </ModalStyledOverlay>
}
Modal.propTypes = {
  imageData: PropTypes.string
};