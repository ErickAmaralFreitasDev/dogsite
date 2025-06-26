import React from "react";
import { Link } from "react-router-dom"
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";

const LoginForm = () => {
  const username = useForm('username');
  const password = useForm(false);
  const context = React.useContext(UserContext);
  
  if (!context) {
    throw new Error('useContext deve estar dentro do Provider');
  }

  const { userLogin } = context;

  // interface logForms {
  //   token: string;
  // };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if(username.validate() && password.validate()) {
      userLogin(username.value, password.value)
      }
    }

  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input 
          label="Usuário" 
          type="text" 
          name='username' 
          {...username}
        />
        <Input 
          label="Senha" 
          type="password" 
          name='password' 
          {...password}
        />
        <Button>Entrar</Button>
      </form>
      <Link to='/login/criar'>Cadastro</Link>
    </section>
  )
}

export default LoginForm
