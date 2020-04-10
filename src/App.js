import React, { useState, useEffect } from 'react';

import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        setRepositories(response.data);
      })
  }, []);


  async function handleAddRepository() {

    try {

      const repo = {
        url: "https://github.com/ruiblaese/gostack-desafio-reactjs-conceitos",
        title: "Desafio ReactJS",
        techs: ["JS", "React"]
      };

      const response = await api.post(`repositories`, repo);

      setRepositories([...repositories, response.data]);

    } catch (error) {
      alert(`Erro ao deletar caso, tente novamente.\n\n` +
        error && error.response && error.response.data && error.response.data.error ?
        error.response.data.error : '');
    }

  }

  async function handleRemoveRepository(id) {
    
    try {

      await api.delete(`repositories/${id}`);

      setRepositories(repositories.filter(
        repo => repo.id !== id
      ));

    } catch (error) {

      alert(`Erro ao deletar caso, tente novamente.\n\n` +
        error && error.response && error.response.data && error.response.data.error ?
        error.response.data.error : '');
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
