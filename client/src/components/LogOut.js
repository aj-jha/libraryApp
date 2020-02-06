import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import { checkPropTypes } from "prop-types"

const LogOut = () => {
  const [navigate, setNavigate] = useState(false)

  const redirect = () => {
    setNavigate(!navigate)
  }

  const logout = () => {
    localStorage.clear("token")
    checkPropTypes.setNavigate({ navigate: true })
    console.log("Log Out")
  }

  return (
    <div>
      <button onClick={logout}>Log Out</button>
    </div>
  )
}

export default LogOut
