import styled, { css } from "styled-components"

const NavButton = styled.button`
display: flex;
flex-direction:column;

  width: 75px;
  font-size: 16px;
  color: white;
  border-radius: 12px;
  background-color: gray;
  &:hover{color:#03bafc}

  }
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
