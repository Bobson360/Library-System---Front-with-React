import React, { Component } from 'react';

class Rent extends Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleClearFild = this.handleClearFild.bind(this)

        this.state = {
            logged: false,
            success: false,
            titulo: undefined,
            email: undefined,
            message: undefined,
            bookList: undefined
        }


    }

    componentDidMount(){
        this.bookList()
    }

    handleEmailChange(e) {
        this.setState({
            title: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        let token = localStorage.getItem('DD101_TOKEN')//pega o token no navegador
       
                const dataToSend = {
                    email: this.refs.email.value,
                    livro: this.refs.livro.value,
                    status: true,
                }
        
        fetch('http://localhost:3001/admin/alugar', {
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
                    this.setState({                     // ATUALIZA O STADO DAS VARIAVEIS
                        success: responseJson.success,  //
                        message: responseJson.message,  //  RECEBE STATUS DO SERVIDOR
                        error: responseJson.error       //
                    })
                    console.log(responseJson.message)
                } else {
                    this.setState({                     // ATUALIZA O STADO DAS VARIAVEIS
                        success: responseJson.success,  //
                        message: responseJson.message,  //  RECEBE STATUS DO SERVIDOR
                        error: responseJson.error       //
                    })
                }
            }).catch(err => console.log('Error', err))
    }

    showAlert() {

        if (this.state.success) {
            return (
                <div className="container">
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Aluguel cadastrado</h4>
                        <p>{this.state.message}</p>
                        <hr />
                        <p className="mb-0">Deseja cadastrar outro?.</p>
                        <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" onClick={this.handleClearFild} data-dismiss="modal">Não</button>
                                        <button type="button" className="btn btn-primary" onClick={this.handleClearFild}>Sim</button>
                                    </div>
                    </div>
                </div>
            )
        }

    }

    handleClearFild(){
        this.setState({
            success:false,

        })
        this.refs.email.value = ''
        this.refs.livro.value = ''
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

    render() {

        return (
            <div>


                {/*MODAL CADASTRO NOVO USUARIO*/}
                <div className="modal fade" id="rentAbook" tabIndex="-1" role="dialog" aria-labelledby="Rent" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Alugar</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {
                                this.showAlert()
                            }
                            <div className="modal-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email do usuário</label>
                                        <input type="email" className="form-control" onChange={this.handleEmailChange} id="exampleInputEmail1" placeholder="Email" ref="email" required />

                                    </div>
                                    <div className="form-group">
                                                    <label htmlFor="book">Livros</label>
                                                    <select className="form-control" id="book" ref="livro">
                                                        
                                                        {

                                                            (this.state.bookList !== undefined && this.error === undefined) ? (
                                                                this.state.bookList.map((livro) => (
                                                                    <option>{livro.titulo}</option>
                                                                ))
                                                            ) : this.state.error
                                                        }
                                                    </select>
                                                </div>
                                    <div className="form-group">

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" onClick={this.handleClearFild} data-dismiss="modal">Cancelar</button>
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

export default Rent;
