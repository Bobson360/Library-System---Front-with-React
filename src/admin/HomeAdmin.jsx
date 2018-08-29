import React, { Component } from 'react';
import NavBar from './NavBar';

class HomeAdmin extends Component {
    constructor() {
        super()

        this.handleNewBook = this.handleNewBook.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleAuthorChange = this.handleAuthorChange.bind(this)
        this.handlePublishCoChange = this.handlePublishCoChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)

        this.state = {
            logged: false,
            titulo: undefined,
            autor: undefined,
            editora: undefined,
            descrição: undefined
        }
    }

    componentDidMount() {
        if (this.props.logged) {
            console.log('PROPS PASSOU')
        }
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        })
    }
    handleAuthorChange(e) {
        this.setState({
            author: e.target.value
        })
    }
    handlePublishCoChange(e) {
        this.setState({
            publishco: e.target.value
        })
    }
    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        })
    }
    handleNewBook(e) {
        e.preventDefault()
        let token = localStorage.getItem('DD101_TOKEN')

        const dataToSend = {

            titulo: this.refs.title.value,
            autor: this.refs.author.value,
            editora: this.refs.editora.value,
            descricao: this.refs.descricao.value,
            slug: this.refs.title.value

        }


        fetch('http://localhost:3001/admin/livros', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                "x-access-token": token
            }

        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.success) {
                    this.setState({
                        ...this.state,
                        registered: {
                            success: true

                        }
                    })
                } else {
                    this.setState({
                        ...this.state,
                        registered: {
                            success: false
                        }
                    })
                }
            }).catch(err => console.log('Error', err))

        // this.refs.book.value = ''
        // this.refs.conservation.value = ''
        // this.refs.content.value = ''


    }

    render() {
        console.log('Home admin: ' + this.props.logged)
        return (
            <div>

                <NavBar logged={this.props.logged} />
                <div className="container">
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Bem Vindo!</strong><br /><br />
                        Você acaba de logar no sistema Administrativo<br /><br />
                        Você pode:<br /><br />
                        &bull; Inserir Novos livros<br />
                        &bull; Alterar livros<br />
                        &bull; Inserir novos usuários.<br />
                        &bull; Ver as avaliações dos usuários<br />
                    </div>
                </div>

                {/*MODAL CADASTRO NOVO USUARIO*/}
                <div className="modal fade" id="#" tabindex="-1" role="dialog" aria-labelledby="cadlivros" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Iserir novo Livro</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleSubimit}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Titulo</label>
                                        <input type="text" className="form-control" onChange={this.handleTitleChange} id="exampleInputEmail1" placeholder="Titulo" ref="titulo" required />

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="autor">Autor</label>
                                        <input type="text" className="form-control" onChange={this.handleAuthorChange} id="autor" placeholder="Autor" ref="autor" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="editora">Editora</label>
                                        <input type="text" className="form-control" onChange={this.handlePublishCoChange} id="editora" placeholder="Editora" ref="editora" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="descricao">Descrição</label>
                                        <textarea className="form-control" onChange={this.handleDescriptionChange} id="descricao" placeholder="Descrição" ref="descricao" required />
                                    </div>
                                    <div className="form-group">

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                        <button type="submit" className="btn btn-primary">Confirmar</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeAdmin;
