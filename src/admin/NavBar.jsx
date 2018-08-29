import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import NewUser from './NewUser';
import NewBook from './NewBook';
import Rent from './Rent';
import NewAdmin from './NewAdmin';


class NavBar extends Component {

    constructor() {
        super()
        this.state = {
            logged: false
        }
    }

    noLogged(){
        if(localStorage.getItem('DD101_TOKEN') === null){
            var result = Object.getOwnPropertyDescriptor(window, 'location');
            window.location = 'http://localhost:3000/admin/';
        }
    }

    componentDidMount(){
        this.noLogged()
    }

    handleEndSession() {
        localStorage.removeItem("DD101_TOKEN")
        var result = Object.getOwnPropertyDescriptor(window, 'location');
    window.location = 'http://localhost:3000/admin/';
    }
  


    teste(){
        alert('teste')
    }
    render() {

    


        return (
            <div>

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Biblioteca</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to='/admin' className="nav-link" href="#">Inicio</Link>
                            </li>
                            <li className="nav-item">

                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Livros</a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link to='/admin/livros' className="dropdown-item" >Ver Livros</Link>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" data-toggle="modal" data-target="#cadlivros" >Cadstrar Livros</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Usuários</a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link to='/admin/user' className="dropdown-item" >Ver Usuários</Link>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" data-toggle="modal" data-target="#cadUsuarios">Cadstrar Usuários</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link to='/admin/avaliacoes' className="nav-link" href="#">Avaliações</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" data-toggle="modal" data-target="#rentAbook">Alugar</a>
                            </li>
                            <li>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-danger" onClick={this.handleEndSession}>Sair</button>
                                    <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="sr-only">Toggle Dropdown</span>
                                    </button>
                                    
                                    
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#newAdmin">Novo Administrador</a>
                                        <a class="dropdown-item" href="#">Relatório</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#">Sistema</a>
                                    </div>
                                </div>
                            </li>
                        </ul>

                        <form className="form-inline my-2 my-lg-0">
                            <form className="form-inline my-2 my-lg-0">




                            </form>

                        </form>



                    </div>

                </nav>
                <NewBook />
                <NewUser />
                <Rent />
                <NewAdmin />
            </div>
        )
    }
}

export default NavBar;
