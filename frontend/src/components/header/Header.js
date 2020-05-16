import React from 'react'

export const Header = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <a className="navbar-brand" href="/">MERN_CRUD</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            <a className="nav-item nav-link active" href="/">Home <span className="sr-only">(current)</span></a>
            <a className="nav-item nav-link active" href="/book/new">New Book <span className="sr-only">(current)</span></a>
            </div>
        </div>
        </nav>
    )
}