import React from "react"
import NavButton from "./styledComponents/NavButton"
import { useMutation } from "react-apollo-hooks"
import gql from "graphql-tag"
const Logout = () => {
  const LOGOUT_MUTATION = gql`
    mutation {
      logout
    }
  `

  const [logout, { data }] = useMutation(LOGOUT_MUTATION)

  return (
    <NavButton
      onClick={() => {
        logout()
      }}
    >
      Logout
    </NavButton>
  )
}
export default Logout
