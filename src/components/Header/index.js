import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

export default function Header() {
    return (
        <header>
            <Link className='logo' to='/'>Prime Flix</Link>
            <Link className='favoritos' to='/favoritos'>Meus Filmes</Link>
        </header>
    )
}
