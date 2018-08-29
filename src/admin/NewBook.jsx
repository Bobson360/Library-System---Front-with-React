import React, { Component } from 'react';
import NavBar from './NavBar';

class NewBook extends Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleAuthorChange = this.handleAuthorChange.bind(this)
        this.handlePublishCoChange = this.handlePublishCoChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        
        this.state = {
            logged: false,

            titulo: undefined,
            autor: undefined,
            editora: undefined,
            descrição: undefined,
            error:undefined,
            message:undefined,
            success:false
            
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
    handleSubmit(e) {
        e.preventDefault()
        let token = localStorage.getItem('DD101_TOKEN')

        const dataToSend = {

              titulo: this.refs.titulo.value,      
              autor: this.refs.autor.value,
              editora: this.refs.editora.value,
              descricao: this.refs.descricao.value,
              slug: this.refs.titulo.value
              

         }

         console.log(JSON.stringify(dataToSend))
        fetch('http://localhost:3001/admin/livros', {
            method: 'POST',
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
                      
                        success:responseJson.success,
                        message:responseJson.message,
                        error:responseJson.error
                        
                    })
                } else {
                    this.setState({
                       
                        success:responseJson.success,
                        message:responseJson.message,
                        error:responseJson.error
                        
                    })
                }console.log(this.state.message)
            }).catch(err => console.log('Error', err))
            
         this.refs.titulo.value = ''
         this.refs.autor.value = ''
         this.refs.editora.value = ''
         this.refs.descricao.value = ''


    }

    showAlert() {
        if (this.state.success) {
            return (
                <div className="container">
                    <div class="alert alert-success" role="alert">
                        Livro cadastrado com sucesso!
                    </div>
                </div>
            )

        } else if (this.state.error) {
            return (
                <div className="container">
                    <div class="alert alert-danger" role="alert">
                        Livro já cadastrado!
                    </div>
                </div>
            )
        }

    }

    render() {

        return (
            <div>
                

                {/*MODAL CADASTRO NOVO USUARIO*/}
                <div className="modal fade" id="cadlivros" tabIndex="-1" role="dialog" aria-labelledby="cadlivros" aria-hidden="true">
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

export default NewBook;
