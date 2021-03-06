import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

export default function Home() {
   const [dialog, setDialog] = useState({
      show: false,
      id: null,
      name: null,
   });
   const handleClose = () =>
      setDialog({
         show: false,
         id: null,
         name: null,
      });
   const handleDialog = (id, repository) => {
      setDialog({
         show: true,
         id: id,
         name: repository,
      });
   };
   const [repositories, setRepositories] = useState([]);
   const [url, setUrl] = useState("");
   const [repoName, setRepoName] = useState("");
   const navigate = useNavigate();

   const userId = localStorage.getItem("userId");

   if (userId === undefined || userId === null) {
      navigate("/");
   }

   useEffect(() => {
      api.get("repositories", {
         headers: {
            Authorization: userId,
         },
      }).then((response) => {
         setRepositories(response.data);
      });
   }, [userId]);

   async function handleDeleteRepositoy() {
      if (dialog.show && dialog.id) {
         try {
            await api.delete(`repositories/${dialog.id}`, {
               headers: {
                  Authorization: userId,
               },
            });
            setRepositories(
               repositories.filter((repository) => repository._id !== dialog.id)
            );
            handleClose();
         } catch (err) {
            alert("Erro ao deletar repositório, tente novamente.");
         }
      }
   }

   function handleLogout() {
      localStorage.clear();

      navigate("/");
   }

   async function handleNewRepository(e) {
      e.preventDefault();

      try {
         const response = await api.post(
            "repositories",
            { url },
            {
               headers: {
                  Authorization: userId,
               },
            }
            );
            if(response.data.msg === "Repositório já cadastrado.") {
               alert(response.data.msg);
            } else {
               api.get("repositories", {
                  headers: {
                     Authorization: userId,
                  },
               }).then((response) => {
                  setRepositories(response.data);
                  setUrl("");
               });
            }
      } catch (err) {
         console.log(err);
         alert("Erro ao cadastrar novo repositório, tente novamente.");
      }
   }

   async function handleRepositorySearch(e) {
      e.preventDefault();

      try {
         await api
            .post(
               "search",
               { repoName },
               {
                  headers: {
                     Authorization: userId,
                  },
               }
            )
            .then((response) => {
               setRepositories(response.data);
            });
      } catch (err) {
         alert("Erro ao cadastrar novo repositório, tente novamente.");
      }
   }

   return (
      <div className="repos-container">
         <header>
            <h1 className="header-title">Gerenciador de Repositórios</h1>
            <nav>
               <button onClick={handleLogout} className="button">
                  Sair
               </button>
            </nav>
         </header>
         <section className="form-search">
            <form onSubmit={handleRepositorySearch}>
               <h3>Procurar</h3>
               <input
                  type="text"
                  placeholder="Nome do repositório..."
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
               />
               <button className="button" type="submit">
                  Procurar
               </button>
            </form>
         </section>
         <main className="list-repo">
            <h3>Repositórios</h3>
            <div className="list">
               <ul>
                  {repositories.map((repository) => (
                     <li key={repository._id}>
                        <p>{repository.author}</p>
                        <a
                           href={repository.url}
                           target="_blank"
                           rel="noreferrer"
                        >
                           <p>{repository.repository}</p>
                        </a>
                        <button
                           onClick={() =>
                              handleDialog(
                                 repository._id,
                                 repository.repository
                              )
                           }
                           type="button"
                        >
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
                  onChange={(e) => {
                     setUrl(e.target.value);
                  }}
               />
               <button className="button" type="submit">
                  Adicionar
               </button>
            </form>
         </footer>

         <Modal show={dialog.show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Não será possível voltar atrás...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Tem certeza que deseja <strong>Excluir Permanentemente</strong> o
               repositório <strong>"{dialog.name}"</strong>?
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Cancelar
               </Button>
               <Button
                  variant="danger"
                  onClick={handleDeleteRepositoy}
               >
                  Excluir Permanentemente
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
}
