import { Navigate, Route, Routes } from "react-router-dom"
import LoginForm from "./LoginForm"
// import LoginPasswordLost from "./LoginPasswordLost"
// import LoginPasswordReset from "./LoginPasswordReset"
import LoginCreate from "./LoginCreate"
import { UserContext } from "../../UserContext"
import React from "react"
import styles from "./Login.module.css"

const Login = () => {
  const userContext = React.useContext(UserContext);

  if (userContext?.login === true) return <Navigate to="/conta" replace />
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="criar" element={<LoginCreate />} />
          {/* <Route path="lost" element={<LoginPasswordLost />} />
          <Route path="reset" element={<LoginPasswordReset />} /> */}
        </Routes>
      </div>
    </section>
  )
}

export default Login
