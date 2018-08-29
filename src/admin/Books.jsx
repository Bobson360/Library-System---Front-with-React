import React, { Component } from 'react';

import NavBar from './NavBar';

class Books extends Component {

    constructor() {
        super()

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleAuthorChange = this.handleAuthorChange.bind(this)
        this.handlePublishCoChange = this.handlePublishCoChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)

        this.state = {

            bookList: undefined,
            error: undefined,
            id: undefined,
            titulo: undefined,
            autor: undefined,
            editora: undefined,
            descrição: undefined,
            error: undefined,
            message: undefined,
            success: false

        }
    }

    componentDidMount() {
        this.bookList()
    }

    bookList = () => {

        fetch('http://localhost:3001/livros',     //faz a requisição na url
            { method: 'GET' })
            .then(response => response.json())
            .then(responseJson => {

                this.setState({
                    bookList: responseJson
                })
                console.log('__METHOD__FETH__BOOKLIST__')
                console.log(responseJson)

            }).catch(err => this.setState({ error: err }))
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
    handleSubmit(e) {
         e.preventDefault()
        let token = localStorage.getItem('DD101_TOKEN')

        const dataToSend = {
            titulo: this.refs.titulo.value,
            autor: this.refs.autor.value,
            editora: this.refs.editora.value,
            descricao: this.refs.descricao.value,
}
        console.log(JSON.stringify(dataToSend))
        fetch('http://localhost:3001/livros/id/' + this.state.id, {
            method: 'PUT',
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        })
            .then(response => response.json())
            .then(responseJson => {

                if (responseJson.success) {
                    this.setState({

                        success: responseJson.success,
                        message: responseJson.message,
                        error: responseJson.error

                    })
                } else {
                    this.setState({

                        success: responseJson.success,
                        message: responseJson.message,
                        error: responseJson.error

                    })
                } console.log(this.state.message)
            }).catch(err => console.log('Error', err))
    }

    handleSubmitdelete(e) {
        
        e.preventDefault()
        console.log(this.state.id)
       let token = localStorage.getItem('DD101_TOKEN')

       
       console.log(JSON.stringify(this.state.id))
       fetch('http://localhost:3001/livros/', {
           method: 'DELETE',
           body: JSON.stringify(this.state.id),
           headers: {
               "Content-Type": "application/json",
               "x-access-token": token
           }
       })
           .then(response => response.json())
           .then(responseJson => {

               if (responseJson.success) {
                   this.setState({

                       success: responseJson.success,
                       message: responseJson.message,
                       error: responseJson.error

                   })
               } else {
                   this.setState({

                       success: responseJson.success,
                       message: responseJson.message,
                       error: responseJson.error

                   })
               } console.log(this.state.message)
           }).catch(err => console.log('Error', err))
   }

    showAlert() {
        if (this.state.success) {
            return (
                <div className="container">
                    <div class="alert alert-success" role="alert">
                        Livro Atualizado com sucesso!
                    </div>
                </div>
            )

        } else if (this.state.error) {
            return (
                <div className="container">
                    <div class="alert alert-danger" role="alert">
                        Falha ao atualizar!
                    </div>
                </div>
            )
        }

    }


    alterbook(id, titulo, autor, descricao, editora) {
        console.log(id)
        this.setState({
            id: id
        })
        this.refs.titulo.value = titulo
        this.refs.autor.value = autor
        this.refs.descricao.value = descricao
        this.refs.editora.value = editora
        console.log(this.state.id)
    }

    excluirbook(id, titulo, autor, descricao, editora) {
        
        this.setState({
            id: id
        })
        this.refs.titulo.value = titulo
        this.refs.autor.value = autor
        this.refs.descricao.value = descricao
        this.refs.editora.value = editora
        console.log(this.state.id)
    }



    render() {
        return (
            <div>
                <NavBar />
                <div className="list-group">
                    <div className="container">
                        <div className="row">


                            <table className="table table-hover">
                                <thead>
                                    <tr>

                                        <th scope="col">Livro</th>
                                        <th scope="col">Autor</th>
                                        <th scope="col">Descrição</th>
                                        <th scope="col">Editar</th>
                                    </tr>
                                </thead>
                                {
                                    /*
                                        List of books 
                                    */
                                    (this.state.bookList !== undefined) ? (
                                        this.state.bookList.map((books) => (
                                            <tbody>
                                                <tr>

                                                    <td scope="row">{books.titulo}</td>
                                                    <td scope="row">{books.autor}</td>
                                                    <td scope="row">{books.descricao}</td>
                                                    <td scope="row">
                                                        <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#alterlivros" onClick={() => { this.alterbook(books._id, books.titulo, books.autor, books.descricao, books.editora) }}>Editar</button>
                                                        <button type="button" className='btn btn-outline-danger' data-toggle="modal" data-target="#excluirlivro"onClick={() => { this.excluirbook(books._id) }}>Excluir</button>
                                                    </td>

                                                </tr>

                                            </tbody>




                                        ))
                                    ) : this.state.error
                                }
                            </table>

                            <div className="modal fade" id="alterlivros" tabIndex="-1" role="dialog" aria-labelledby="cadlivros" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Inserir novo Livro</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            {
                                                this.showAlert()
                                            }
                                            <form onSubmit={this.handleSubmit}>
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
                                                    <textarea className="form-control" onChange={this.handleDescriptionChange}  id="descricao" placeholder="Descrição" ref="descricao" required />
                                                </div>
                                                <div className="form-group">

                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Sair</button>
                                                    <button type="submit" className="btn btn-primary">Alterar</button>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/*modal excluir livros*/}
                            <div className="modal fade" id="excluirlivro" tabIndex="-1" role="dialog" aria-labelledby="excluirlivro" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Excluir livro</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            {
                                                this.showAlert()
                                            }
                                            <form >
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Titulo</label>
                                                    <input type="text" className="form-control"  id="exampleInputEmail1"   disabled placeholder="Titulo"   />

                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="autor">Autor</label>
                                                    <input type="text" className="form-control"  id="autor"  placeholder="Autor" disabled   />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="editora">Editora</label>
                                                    <input type="text" className="form-control"  id="editora"  placeholder="Editora" disabled   />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="descricao">Descrição</label>
                                                    <textarea className="form-control" id="descricao"  placeholder="Descrição" disabled/>
                                                </div>
                                                <div className="form-group">

                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Sair</button>
                                                    <button type="submit" className="btn btn-primary">Excluir</button>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>





                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Books;
