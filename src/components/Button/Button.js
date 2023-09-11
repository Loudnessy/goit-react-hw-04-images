import PropTypes from "prop-types";
import { ButtonStyled } from "./Button.styled"

export const Button = ({funcForButton}) => {
    return <ButtonStyled type="button" onClick={funcForButton}>Load more</ButtonStyled>
}
Button.propTypes = {
    funcForButton: PropTypes.func
}