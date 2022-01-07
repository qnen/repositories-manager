import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

export default function Home() {
   const [repositories, setRepositories] = useState([]);
   const [url, setUrl] = useState('');
   const [repoName, setRepoName] = useState('');
   const navigate = useNavigate();

   const userId = localStorage.getItem("userId");

   if(userId === undefined || userId === null) {
      navigate('/');
   }

   useEffect(() => {
      api.get("repositories", {
         headers: {
            Authorization: userId,
         }
      }).then((response) => {
         setRepositories(response.data);
      });
   }, [userId]);

   async function handleDeleteRepositoy(id) {
      try {
         await api.delete(`repositories/${id}`, {
            headers: {
               Authorization: userId,
            }
         });
         setRepositories(repositories.filter(repository => repository._id !== id));
      } catch (err) {
         alert('Erro ao deletar repositório, tente novamente.');
      }
   }

   function handleLogout() {
      localStorage.clear();

      navigate('/');
   }

   async function handleNewRepository(e) {
      e.preventDefault();

      try {
         await api.post('repositories', {url}, {
            headers: {
               Authorization: userId,
            }
         })

         api.get("repositories", {
            headers: {
               Authorization: userId,
            }
         }).then((response) => {
            setRepositories(response.data);
            setUrl('');
         });
      } catch (err) {
         alert('Erro ao cadastrar novo repositório, tente novamente.');
      }

   }
   
   async function handleRepositorySearch(e) {
      e.preventDefault();

      try {
         await api.post('search', {repoName}, {
            headers: {
               Authorization: userId,
            }
         }).then((response) => {
            setRepositories(response.data);
         });
      } catch (err) {
         alert('Erro ao cadastrar novo repositório, tente novamente.');
      }

   }

   return (
      <div className="repos-container">
         <header>
            <h1 className="header-title">Gerenciador de Repositórios</h1>
            <nav>
               <button onClick={handleLogout} className="button">Sair</button>
            </nav>
         </header>
         <section className="form-search">
            <form onSubmit={handleRepositorySearch}>
               <h3>Procurar</h3>
               <input 
                  type="text" 
                  placeholder="Nome do repositório..."
                  value={repoName}
                  onChange={e => setRepoName(e.target.value)}
               />
               <button className="button" type="submit">Procurar</button>
            </form>
         </section>
         <main className="list-repo">
            <h3>Repositórios</h3>
            <div className="list">
               <ul>
                  {repositories.map((repository) => (
                     <li key={repository._id}>
                        <p>{repository.author}</p>
                        <p>{repository.repository}</p>
                        <button onClick={() => handleDeleteRepositoy(repository._id)} type="button">
                           <FiX size={25} color="#FFF" />
                        </button>
                     </li>
                  ))}
               </ul>
            </div>
         </main>
         <footer className="form-create-repo">
            <form onSubmit={handleNewRepository}>
               <h3>Novo Repo</h3>
               <input 
                  type="text"
                  placeholder="URL do repositório..."
                  value={url}
                  onChange={e => {
                     setUrl(e.target.value);
                  }}
               />
               <button className="button" type="submit">Adicionar</button>
            </form>
         </footer>
      </div>
   );
}
