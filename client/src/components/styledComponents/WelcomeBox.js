import styled from "styled-components"
const WelcomeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
  width: 100vw;

  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.4) 100%
    ),
    url("./assets/background.jpg");
  background-size: 100% auto;
  color: white;
`
export default WelcomeBox
