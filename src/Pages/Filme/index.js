import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../services/api';

import './filme-info.css';

export default function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFilme = async () => {
      try {
        const { data } = await api.get(`movie/${id}`);
        setFilme(data);
      } catch (err) {
        setError('Não foi possível carregar os detalhes do filme.');
        console.error(err);
        navigate('/', { replace: true });
        return;
      } finally {
        setLoading(false);
      }
    };

    loadFilme();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="filme-info loading">
        <h2>Carregando detalhes...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="filme-info error">
        <h2>{error}</h2>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  if (!filme) return null;

  const { title, poster_path, overview, vote_average } = filme;

  const fallbackImage = 'https://via.placeholder.com/400x600?text=Imagem+Indisponível';

  function salvarFilme() {
    const minha_lista = localStorage.getItem("@primeflix");
    let filmes_salvos = JSON.parse(minha_lista) || [];

    const hasFilme = filmes_salvos.some((savedFilme) => savedFilme.id === filme.id);
    
    if (!hasFilme) {
      filmes_salvos.push(filme);
      localStorage.setItem("@primeflix", JSON.stringify(filmes_salvos));
      toast.success("Filme salvo com sucesso!");
    } else {
      toast.warn("Este filme já está na sua lista.");
    }
  }

  return (
    <div className="filme-info">
      <h1>{title}</h1>
      <img
        src={poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` : fallbackImage}
        alt={title}
      />
      <h3>Sinopse</h3>
      <span>{overview || 'Sinopse não disponível.'}</span>
      <strong>Avaliação: {vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={`https://www.youtube.com/results?search_query=${title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
