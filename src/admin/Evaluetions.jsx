import React, { Component } from 'react';

import NavBar from './NavBar';

class Evaluations extends Component {
    constructor() {
        super()
        this.state = {
            logged: false,
            evaluations: undefined,
            error: undefined

        }
    }

    componentDidMount() {
        this.evaluationsList()
    }

    evaluationsList = () => {
        let token = localStorage.getItem('DD101_TOKEN')//busca o token no localSorage
        fetch('http://localhost:3001/admin/avaliacoes',     //faz a requisição na url
            {
                method: 'GET',
                headers: { "x-access-token": token }
            })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    evaluations: responseJson
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
                                        <th scope="col">Livro</th>
                                        <th scope="col">Estado de Coservação</th>
                                        <th scope="col">Avaliação</th>
                                        <th scope="col">Observações</th>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>
                                {
                                    /*
                                        List of books 
                                    */
                                    (this.state.evaluations !== undefined) ? (
                                        this.state.evaluations.map((books) => (


                                            <tbody>
                                                <tr>
                                                    <td>{books.Livro}</td>
                                                    <td>{books.Conservação}</td>
                                                    <td>{books.Nota}</td>
                                                    <td>{books.Observações}</td>
                                                    <td><a href="#" >ver mais</a></td>
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

export default Evaluations;
