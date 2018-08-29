import React, { Component } from 'react';

import HomeAdmin from './HomeAdmin'
import User from './User';

class Admin extends Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)

        this.state = {
            username: undefined,
            email: undefined,
            password: undefined,
            signUp: {
                success: undefined,
                message: undefined
            },
            logged: false,
            users: undefined,
            error: undefined,
            token: undefined
        },
            this.handleTokenChange = () => {
                this.setState({ token: localStorage.getItem('DD101_TOKEN') })
            }
    }

    componentDidMount() {
        this.verifytoken()
    }

    verifytoken() {

        let token = localStorage.getItem('DD101_TOKEN')
        if (!token) {
            this.setState({
                logged: false,
                error: 'No token defined. Please login'
            })
            return
        }

        fetch('http://localhost:3001/admin/verifytoken', {
            method: 'GET',

        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.success) {
                    this.setState({
                        logged: responseJson.success,
                        error: undefined
                    })

                } else {
                    this.setState({
                        error: 'usuario não logado'
                    })
                }
            }).catch(err => this.setState({ error: err }))
    }

    handleSubmit(e) {
        e.preventDefault()
        let dataToSend = {
            userData: {
                email: this.state.email,
                password: this.state.password
            }
        }

        console.log(JSON.stringify(dataToSend))

        fetch('http://localhost:3001/admin/', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json"
            }

        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                if (responseJson.success) {
                    localStorage.setItem('DD101_TOKEN', responseJson.token)
                    this.setState({
                        logged: true,
                        error: undefined
                    })

                }
            }).catch(err => this.setState({ error: err }))
        e.target.reset()
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    

    render() {
        <User logged={this.state.logged}/>
        //=======================================login Admin==================================================

        if (this.state.logged) {
            return (
                <HomeAdmin logged={this.state.logged}/>

            )

            //=========================================Home Admin=======================================================

        } else {
            return (

                <div className="row" style={{ paddingTop: '50px' }}>
                    <div className="col">
                    </div>
                    <div className="col">
                        <div className="card" style={{ width: '20rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                            <img className="card-img-top" src="https://www.elegantthemes.com/blog/wp-content/uploads/2017/04/password-protect-wordpress.jpg" alt="" />
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input type="email" onChange={this.handleEmailChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" onChange={this.handlePasswordChange} className="form-control" id="exampleInputPassword1" placeholder="Senha" />
                                    </div>
                                    <div className="form-check">
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block">Entrar</button>
                                    <br />

                                </form>


                            </div>
                        </div>

                    </div>
                    <div className="col">
                    </div>
                </div>
            )
        }
    }
}

export default Admin;
