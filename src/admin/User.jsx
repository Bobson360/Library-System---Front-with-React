import React, { Component } from 'react';

import NavBar from './NavBar';

class User extends Component {
    constructor() {
        super()
        this.state = {
            logged: false,
            usuarios: undefined,
            error: undefined,
            success: false
        }
    }

    componentDidMount() {
        this.userList()

        console.log(this.state.success)
    }

    userList = () => {
        let token = localStorage.getItem('DD101_TOKEN')//busca o token no localSorage
        fetch('http://localhost:3001/admin/usuarios',     //faz a requisição na url
            {
                method: 'POST',
                headers: { "x-access-token": token }
            })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    usuarios: responseJson,
                    success: true
                })

                console.log('__METHOD__FETH__')
                console.log(responseJson)

            }).catch(err => this.setState({ error: err }))
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
                                        <th scope="col">Nome</th>
                                        <th scope="col">Email</th>
                                        <th scope="col"></th>
                                        <th scope="col">Opções</th>
                                    </tr>
                                </thead>
                                {
                                    /*
                                        List of books 
                                    */
                                    (this.state.usuarios !== undefined) ? (
                                        this.state.usuarios.map((user) => (


                                            <tbody>
                                                <tr>
                                                    <td>{user.nome}</td>
                                                    <td>{user.email}</td>
                                                    <td></td>
                                                    <td><button type="button" className="btn btn-outline-primary">editar</button><button type="button" className="btn btn-outline-danger">Excluir</button></td>

                                                </tr>
                                            </tbody>


                                        ))
                                    ) : this.state.error
                                }

                            </table>

                        </div>
                    </div>
                </div>
            </div>

        )

    }


}

export default User;
