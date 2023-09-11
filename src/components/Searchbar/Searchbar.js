import { SearchbarStyled } from "./Searchbar.styled"
import PropTypes from "prop-types";

export const Searchbar = ({submit}) => {
    return <SearchbarStyled>
    <form onSubmit={submit}>
      <button type="submit">
        <span>Search</span>
      </button>
  
      <input
      name="name"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  </SearchbarStyled>
}
Searchbar.propTypes = {
  submit: PropTypes.func
};