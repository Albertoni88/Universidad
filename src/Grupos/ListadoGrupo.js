import React, { Component } from 'react'
import Grupo from './Grupo'
import Aux from '../hoc/hoc'
import axios from 'axios'
import { connect } from 'react-redux'
import { removeGrupo, loadGrupos } from '../reducers/actionCreator'
import { BrowserRouter, Route, NavLink, Link, Switch } from 'react-router-dom'
//import CrearGrupo from './CrearGrupo'
import AccionesEstudiantes from '../NavBar/AccionesEstudiantes'
import classes from '../estilos/estilos.css'



const mapStateToProps = (state) => {
    return {
        grupos: state.reducer.grupos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadGrupos: (listaGrupos) => {
            dispatch(loadGrupos(listaGrupos))
        }
    }
}
class ListaGrupos extends Component {
    // constructor(props) {
    //     super(props);
    // }
    state = {
        listaGrupos: []
    }
    componentDidMount() {

        axios.get('http://localhost:3005/grupos').then(response => {
            this.setState({
                listaGrupos: response.data
            })
            this.props.onLoadGrupos(response.data)
        })

    }
    
    render() {
        return (
            <Aux>
                <table className="bordered highlight centered responsive-table" >
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Profesor Guía</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.grupos.map((grupo) => {
                            return (
                                <Grupo
                                    id={grupo.id}
                                    nombre={grupo.nombre}
                                    profesor={grupo.profesorId}
                                />
                                // <button className='waves-effect waves-light btn' onClick={() => this.eliminarGrupo(grupo.id)}>Eliminar Grupo</button>
                                )
                        })}
                    </tbody>
                </table>
                <Link to="/CrearGrupo" >
                    <button className='waves-effect waves-light btn'>Crear Grupo</button>
                </Link>
            </Aux>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListaGrupos)