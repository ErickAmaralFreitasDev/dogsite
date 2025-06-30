import React from "react";
import { Link } from "react-router-dom"
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import { Errorp } from "../Helper/Errorp";
import LoginFormStyles from './LoginForm.module.css';
import stylesBtn from '../Forms/button.module.css';

const LoginForm = () => {
  const username = useForm('username');
  const password = useForm(false);
  const context = React.useContext(UserContext);
  
  if (!context) {
    throw new Error('useContext deve estar dentro do Provider');
  }

  const { userLogin, error, loading } = context;

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
    <section className='animeLeft'>
      <h1 className='title'>Login</h1>
      <form className={LoginFormStyles.form} onSubmit={handleSubmit}>
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
        {loading ? <Button disabled>Carregando...</Button> : <Button>Entrar</Button>}
        <Errorp error={error ? { message: error } : undefined} />
        {/* {error && <p>{error}</p>} */}
      </form>
      <Link className={LoginFormStyles.perdeu} to='/login/perdeu'>
        Perdeu a Senha?
      </Link>
      <div className={LoginFormStyles.cadastro}>
        <h2 className={LoginFormStyles.subtitulo}>Cadastro</h2>
        <p>Crie sua conta para acessar recursos exclusivos.</p>
        <Link className={stylesBtn.button} to='/login/criar'>
          Criar Conta
        </Link>
      </div>
    </section>
  )
}

export default LoginForm
