import React, { Component } from 'react';

class NewAdmin extends Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNomeChange = this.handleNomeChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)


        this.state = {
            logged: false,
            nome: undefined,
            email: undefined,
            error: undefined,
            message: undefined,
            success: false,
            pass: 123456

        }


    }



    handleNomeChange(e) {
        this.setState({
            nome: e.target.value
        })
    }
    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem('DD101_TOKEN')
        const dataToSend = {

            name: this.refs.nome.value,
            email: this.refs.email.value,
            password: this.state.pass

        }

        console.log(JSON.stringify(dataToSend))
        fetch('http://localhost:3001/admin/register', {
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
                }
            }).catch(err => console.log('Error', err))

        this.refs.nome.value = ''
        this.refs.email.value = ''



    }

    showAlert() {
        if (this.state.success) {
            return (
                <div className="container">
                    <div class="alert alert-success" role="alert">
                        Usuário cadastrado com sucesso!
                    </div>
                </div>
            )

        } else if (this.state.error) {
            return (
                <div className="container">
                    <div class="alert alert-danger" role="alert">
                        Usuário já cadastrado!
                    </div>
                </div>
            )
        }

    }

    render() {

        return (
            <div>


                {/*MODAL CADASTRO NOVO USUARIO*/}
                <div className="modal fade" id="newAdmin" tabIndex="-1" role="dialog" aria-labelledby="newAdmin" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Inserir novo Usuário</h5>
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
                                        <label htmlFor="exampleInputEmail1">Nome</label>
                                        <input type="text" className="form-control" onChange={this.handleNomeChange} id="exampleInputEmail1" placeholder="Nome" ref="nome" required />

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" onChange={this.handleEmailChange} id="email" placeholder="Email" ref="email" required />
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


export default NewAdmin;
