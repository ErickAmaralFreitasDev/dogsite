import React from 'react';
import Input from '../../Components/Forms/Input';
import Button from '../../Components/Forms/Button';
import useForm from '../../Hooks/useForm';
import { USER_POST } from '../../Hooks/api';
import { UserContext } from '../../UserContext';
import useFetch from '../../Hooks/useFetch';
import { Errorp } from '../Helper/Errorp';

function LoginCreate() {
  const username = useForm('username');
  const email = useForm('email');
  const password = useForm('password');
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('useContext deve estar dentro do Provider');
  }

  const { userLogin } = context;
  const { error, loading, request } = useFetch();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!username.validate() || !email.validate() || !password.validate()) return;
    const userData = {
        username: username.value,
        email: email.value,
        password: password.value,
    };
    const {url, options} = USER_POST(userData as any);
    const {response} = await request(url, options);
    if (response && response.ok) {
      userLogin(username.value, password.value);
    } else {
      console.log('Erro ao criar usuário');
    }
  }

  return (
    <section className='animeLeft'>
      <h1 className='title'>Crie sua Conta</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" name="username" type="text" {...username} />
        <Input label="E-mail" name="email" type="email" {...email} />
        <Input label="Senha" name="password" type="password" {...password} />
        {loading ? 
          (<Button disabled>Cadastrando...</Button>)
          : 
          (<Button>Cadastrar</Button>)
        }
        <Errorp error={error ? { message: error } : undefined} />
      </form>

    </section>
  )
}

export default LoginCreate
