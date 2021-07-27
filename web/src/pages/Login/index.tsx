import { FormEvent, useState } from 'react';

import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.scss'

export function Login() {
  const { push } = useHistory();

  const [email, setEmail] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!email)
      return;

    const response = await api.post('sessions', { email });

    const { _id } = response.data;

    localStorage.setItem('user', _id);

    push('/dashboard');
  };

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
      </p>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input 
          id="email" 
          name="name" 
          type="email" 
          placeholder="Seu melhor e-mail" 
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        
        <button type="submit">Entrar</button>
      </form>
    </>
  );
}