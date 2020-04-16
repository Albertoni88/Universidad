import React, { Component } from 'react'
import Estudiante from './Estudiante'
import Aux from '../hoc/hoc'
import axios from 'axios'
import { connect } from 'react-redux'
import { removeEstudiante, loadEstudiantes } from '../reducers/actionCreator'
import { BrowserRouter, Route, NavLink, Link, Switch } from 'react-router-dom'
import CrearEstudiante from './CrearEstudiante'
import AccionesEstudiantes from '../NavBar/AccionesEstudiantes'
import classes from '../estilos/estilos.css'
// import {} from '../estilos/materialize.css';


const mapStateToProps = (state) => {
    return {
        estudiantes: state.reducer.estudiantes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadEstudiantes: (listaEstudiantes) => {
            dispatch(loadEstudiantes(listaEstudiantes))
        }
    }
}
class ListaEstudiantes extends Component {
    // constructor(props) {
    //     super(props);
    // }
    state = {
        listaEstudiantes: [],
        grupoId: ''
    }
    componentDidMount() {

        axios.get('http://localhost:3005/estudiantes').then(response => {
            this.setState({
                listaEstudiantes: response.data
            })
            this.props.onLoadEstudiantes(response.data)
        })

    }
    
    render() {
        return (
            <Aux>
                <table className="bordered highlight centered responsive-table" >
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Sexo</th>
                            <th>Edad</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Lugar de Nacimiento</th>
                            <th>Grupo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.estudiantes.map((estudiante) => {
                            return (

                                <Estudiante
                                    id={estudiante.id}
                                    nombre={estudiante.nombre}
                                    email={estudiante.email}
                                    sexo={estudiante.sexo}
                                    edad={estudiante.edad}
                                    fechanacimiento={estudiante.fechaNacimiento}
                                    lugarnacimiento={estudiante.lugarNacimiento}
                                    grupo={estudiante.grupoId}
                                />
                                // <button className='waves-effect waves-light btn' onClick={() => this.eliminarEstudiante(estudiante.id)}>Eliminar Estudiante</button>


                            )
                        })}
                    </tbody>
                </table>
                <Link to="/CrearEstudiante" >
                    <button className='waves-effect waves-light btn'>Crear Estudiante</button>
                </Link>
            </Aux>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListaEstudiantes)