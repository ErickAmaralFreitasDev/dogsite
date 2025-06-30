import { Navigate, Route, Routes } from "react-router-dom"
import LoginForm from "./LoginForm"
import LoginPasswordLost from "./LoginPasswordLost"
import LoginPasswordReset from "./LoginPasswordReset"
import LoginCreate from "./LoginCreate"
import { UserContext } from "../../UserContext"
import React from "react"

const Login = () => {
  const userContext = React.useContext(UserContext);

  if (userContext?.login === true) return <Navigate to="/conta" replace />
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="criar" element={<LoginCreate />} />
        <Route path="lost" element={<LoginPasswordLost />} />
        <Route path="reset" element={<LoginPasswordReset />} />
      </Routes>
    </div>
  )
}

export default Login
