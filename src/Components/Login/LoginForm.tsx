import React from "react";
import { Link } from "react-router-dom"
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { TOKEN_POST } from "../../Hooks/api";

const LoginForm = () => {
  const username = useForm('username');
  const password = useForm(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if(username.validate() && password.validate()) {
      const {url, options} = TOKEN_POST ({
        username: username.value,
        password: password.value,
      })

      const response = await fetch(url, options);
      const json = await response.json();
      window.localStorage.setItem('token', json.token);
      console.log(json)
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
