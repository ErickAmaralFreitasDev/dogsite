import { Route, Routes } from "react-router-dom"
import LoginForm from "./LoginForm"
import LoginPasswordLost from "./LoginPasswordLost"
import LoginPasswordReset from "./LoginPasswordReset"
import LoginCreate from "./LoginCreate"

const Login = () => {
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
