import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

export default function Login() {
   const [user, setUser] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();

   async function handleLogin(e) {
      e.preventDefault();

         try {
            const response = await api.post('sessions', {
               user,
               password
            });
            console.log(response.data);
            localStorage.setItem('userId', response.data);

            navigate('/repositories');
         } catch (err) {
            alert("Falha no login, tente novamente.");
         }
   }

   return (
      <div className="login-container">
         <section className="form">
            <form onSubmit={handleLogin}>
               <h1>Login</h1>

               <input
                  placeholder="Usuário"
                  value={user}
                  onChange={e => setUser(e.target.value)}
               />
               <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
               />
               <button className="button" type="submit">Entrar</button>

            </form>
         </section>
      </div>
   );
}
