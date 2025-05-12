import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

import './home.css';

export default function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadFilmes = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/movie/now_playing', {
          params: {
            page: page
          },
        });

        setFilmes((prevFilmes) => [
          ...prevFilmes,
          ...data.results.slice(0, 3),
        ]);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar os filmes.');
      } finally {
        setLoading(false);
      }
    };

    loadFilmes();
  }, [page]);

  if (error) {
    return (
      <div className="loading">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map(({ id, title, poster_path }) => (
          <article key={id}>
            <strong>{title}</strong>
            {poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                alt={`Poster de ${title}`}
              />
            ) : (
              <p>Imagem não disponível</p>
            )}
            <Link to={`filmes/${id}`}>Acessar</Link>
          </article>
        ))}
      </div>

      <div className="load-more">
        {loading ? (
          <h2>Carregando...</h2>
        ) : (
          <button onClick={() => setPage((prev) => prev + 1)}>
            Carregar mais
          </button>
        )}
      </div>
    </div>
  );
}
