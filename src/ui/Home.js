import React, { Component } from 'react';


class App extends Component {

    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEvaluate = this.handleEvaluate.bind(this)

        this.state = {
            email: '',
            cadastrado: false,
            livros: undefined,
            id: '',
            error: undefined,
            success: false
         
        }

            this.handleEmailChange = (e) => {
                this.setState({ email: e.target.value })
            }
    }
    handleSubmit(e) {
        e.preventDefault()

        fetch('http://localhost:3001/user/' + this.state.email, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(responseJson => {
                this.id = responseJson[0]._id
                if (responseJson) {
                    this.setState({
                        cadastrado: true,
                        error: undefined,
                        id: responseJson[0]._id
                    })
                    console.log('user status: ' + this.state.cadastrado + ', id: ' + this.state.id)
                    fetch('http://localhost:3001/livros', {
                        method: 'GET'
                    })
                        .then(response => response.json())
                        .then(responseJson => {
                            this.setState({
                                livros: responseJson,
                                error: undefined
                            })

                            console.log(this.state.livros)

                        })
                }
            }).catch(err => this.setState({ error: err }))

        e.target.reset()
    }


    handleEvaluate(e) {

        e.preventDefault()
        
         const dataToSend = {

              user: this.state.id,      
              livro: this.refs.book.value,
              conservacao: this.refs.conservation.value,
              nota: this.refs.content.value,
              obs: this.refs.obs.value,

         }

         console.log(JSON.stringify(dataToSend))
        fetch('http://localhost:3001/', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json"
            }

        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.success) {
                    this.setState({
                        success: true
                    })
                } else {
                    this.setState({
                         success: false
                   })
                }
            }).catch(err => console.log('Error', err))

           }

    reloadPage(){
        window.location.reload()
    }

    clearFilds(){
        
        // this.setState({
        //     success: false
        // })

    }

    showAlert() {

        if (this.state.success) {
            return (
                <div className="container">
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Avaliação cadastrada</h4>
                        <p>{this.state.message}</p>
                        <hr />
                        <p className="mb-0">Deseja cadastrar outra?</p>
                        <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" onClick={this.reloadPage} data-dismiss="modal">Não</button>
                                        <button type="button" className="btn btn-primary" onClick={this.clearFilds}>Sim</button>
                                    </div>
                    </div>
                </div>
            )
        }

    }

    showBookEvaluatearea() {
        if (this.state.cadastrado) {
            return (
                <div>

                    <div className="container" style={{ padding: '20px' }}>

                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>Bem Vindo!</strong><br /><br />
                            Você acaba de logar no sistema<br /><br />
                            Você pode avaliar os livros que ja tenha lido<br /><br />
                            &bull; Estado de Conservação Ótimo, Bom, Ruim e Regular<br />
                            &bull; Avaliar o conteudo do livro de 0 a 10, sendo, 0 péssimo e 10 exelente.<br />
                            &bull; Fazer observações<br />
                            &bull; Seu id: {this.state.id}

                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>

                        </div>
                        {/*Modal*/}
                        <div className="container">
                            {/* Begin Modal Register Form */}
                            <div className="modal fade" id="signupModel" tabIndex="-1" role="dialog" aria-labelledby="signupModelLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="signupModelLabel">Registration Form</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                            {
                                                this.showAlert()
                                            }
                                        <div className="modal-body">

                                            <form onSubmit={this.handleEvaluate}>
                                                <div className="form-group">
                                                   
                                                </div>
                                                <div className="list-group">





                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="book">Livros</label>
                                                    <select className="form-control" id="book" ref="book">
                                                        <option disabled defaultValue>Livros</option>
                                                        {

                                                            (this.state.livros !== undefined && this.error === undefined) ? (
                                                                this.state.livros.map((livro) => (
                                                                    <option>{livro.titulo}</option>
                                                                ))
                                                            ) : this.state.error
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="conservation">Nota para a Conservação</label>
                                                    <select className="form-control" id="conservation" ref="conservation">
                                                        <option disabled selected >nota</option>
                                                        <option value="otimo">Ótimo</option>
                                                        <option value="bom">Bom</option>
                                                        <option value="ruim">Ruim</option>
                                                        <option value="regular">Regular</option>

                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="content">Nota para o Conteúdo</label>
                                                    <select multiple className="form-control" id="content" ref="content">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="obs">Observações Máximo de 256 caracteres</label>
                                                    <textarea className="form-control" id="obs" maxLength="256" rows="3" ref="obs"></textarea>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Sair</button>
                                                    <button type="submit" className="btn btn-primary">Enviar</button>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Modal Register Form */}



                            {/* Begin Login Form */}

                            <div className="row" style={{ paddingTop: '50px' }}>
                                <div className="col">
                                </div>
                                <small id="emailHelp" className="form-text text-muted">Click aqui para <a href="" data-toggle="modal" data-target="#signupModel" data-whatever="@mdo" >Avaliar</a></small>
                                <div className="col">
                                </div>
                                
                            </div>
                            {/* End Login Form */}
                        </div>
                        {/*End modal*/}

                    </div>
                </div>
            )
        } else {
            return (
                <div className="login-form">
                    <form onSubmit={this.handleSubmit}>
                        <h2 className="text-center">Avaliação de Livro</h2>
                        <div className="form-group">
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required="required"  placeholder="Verifique nome de usuário"  value={this.state.email} onChange={this.handleEmailChange} ref="email"/>
                            
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Verificar</button>
                        </div>
                    </form>
                    <br /> Email: {this.state.email}

                </div>
            )
        }
    }

    render() {
        return (
            this.showBookEvaluatearea()
        )
    }
}

export default App;
