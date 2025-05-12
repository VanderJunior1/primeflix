import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './favoritos.css'
import { toast } from 'react-toastify';

export default function Favoritos() {

    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        const minha_lista = localStorage.getItem("@primeflix");
        const filmesSalvos = JSON.parse(minha_lista) || [];

        // Ordena por título (ordem alfabética)
        filmesSalvos.sort((a, b) => a.title.localeCompare(b.title));

        setFilmes(filmesSalvos);
    }, []);


    function excluirFilme(id) {
        const filmesAtualizados = filmes.filter(filme => filme.id !== id);
        setFilmes(filmesAtualizados);
        localStorage.setItem("@primeflix", JSON.stringify(filmesAtualizados));
        toast.info("Filme removido com sucesso!");
    }


    return (
        <div className="meus-filmes">
            <h1>Meus Filmes</h1>
            {filmes.length === 0 &&
                <span>Você ainda não salvou nenhum filme. Que tal <Link to="/">explorar alguns?</Link> 🎬</span>}

            <ul>
                {filmes.map((i) => {
                    return (
                        <li key={i.id}>
                            <span>{i.title}</span>
                            <div>
                                <Link to={`/filmes/${i.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(i.id)} >Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
