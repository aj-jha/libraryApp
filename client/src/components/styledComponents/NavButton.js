import styled from "styled-components"

const NavButton = styled.button`
  display: flex;
  justify-content: center;
  width: 105px;
  font-size: 16px;
  color: white;
  border-radius: 12px;
  background-color: gray;
  &:hover {
    color: #03bafc;
  }
  text-decoration: none;
  margin: 5px;
`
// ${props =>
//   props.theme == "light" &&
//   css`
//     background: white;
//     color: dark;
//   `}
// ${props =>
//   props.theme == "dark" &&
//   css`
//     background: black;
//     color: white;
//   `}
export default NavButton
