import React from "react";
import { Link } from "react-router-dom"
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { TOKEN_POST, USER_GET } from "../../Hooks/api";

const LoginForm = () => {
  const username = useForm('username');
  const password = useForm(false);
  
  interface logForms {
    token: string;
  };

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      getUser({ token: token });
    }
  }, []);

  async function getUser({token}: logForms) {
    const {url, options} = USER_GET({token});
    const response = await fetch(url, options);
    const json = await response.json(); 
    console.log(json)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if(username.validate() && password.validate()) {
      const {url, options} = TOKEN_POST ({
        username: username.value,
        password: password.value,
      });

      const response = await fetch(url, options);
      const json = await response.json();
      await window.localStorage.setItem('token', json.token);
      getUser(json.token);
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
