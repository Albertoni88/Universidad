import React, { Component } from 'react'
import { BrowserRouter, Route, withRouter, useHistory, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadCiudades, loadGrupos } from '../reducers/actionCreator'
import axios from 'axios'
import Select from 'react-select'

const mapStateToProps = (state) => {
    return {
        ciudades: state.reducer.ciudades,
        grupos: state.reducer.grupos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // onRemoveEstudiante: (estudianteId) => {
        //     dispatch(removeEstudiante(estudianteId))
        // },
        onLoadCiudades: (listaCiudades) => {
            dispatch(loadCiudades(listaCiudades))
        },
        onLoadGrupos: (listaGrupos) => {
            dispatch(loadGrupos(listaGrupos))
        }
    }
}
class DetallesEstudiante extends Component {
    constructor(props) {
        super(props)
        console.log("params " + JSON.stringify(this.props))
    }
    state = {
        edad: '',
        sexo: '',
        nombre: '',
        email: '',
        fechaNacimiento: '',
        lugarNacimiento: '',
        grupo: '',
        grupoNombre: '',
        ciudadNombre: ''
        // listaCiudades: [],
        // listaGrupos: []
    }
    componentDidMount() {

        const id = this.props.match.params.id
        axios.get('http://localhost:3005/estudiantes/' + id).then(response => {
            console.log(JSON.stringify(response.data))
            this.setState({
                edad: response.data.edad,
                sexo: response.data.sexo,
                nombre: response.data.nombre,
                email: response.data.email,
                fechaNacimiento: response.data.fechaNacimiento,
                lugarNacimiento: response.data.lugarNacimiento,
                grupo: response.data.grupoId,
            })

            axios.get('http://localhost:3005/grupos/' + this.state.grupo).then(response => {
                this.setState({
                    grupoNombre: response.data.nombre
                })
            })
            axios.get('http://localhost:3005/ciudades/' + this.state.lugarNacimiento).then(response => {
                this.setState({
                    ciudadNombre: response.data.nombre
                })
            })
        })
    }
    Regresar = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div style={{ textAlign: 'left' }} id="detallesEstudiante">
                <div style={{ marginRight: '10px', marginLeft: '10px', width: '400px' }} >
                    <div style={{ textAlign: 'left' }}>
                        <label>Nombre</label>
                        <div
                            id="nombre"
                            value={this.state.nombre}
                        >{this.state.nombre}</div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label>Edad</label>
                        <div
                            id="edad"
                            value={this.state.edad}
                        >{this.state.edad}</div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label>Sexo</label>
                        <div
                            id="sexo"
                            value={this.state.sexo}
                        >{this.state.sexo}</div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label>Email</label>
                        <div
                            id="email"
                            value={this.state.email}
                        >{this.state.email}</div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label>Fecha de Nacimiento</label>
                        <div
                            id="fechaNacimiento"
                            value={this.state.fechaNacimiento}
                        >{this.state.fechaNacimiento}</div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label>Lugar de Nacimiento</label>
                        <div
                            id="lugarNacimiento"
                            value={this.state.ciudadNombre}
                        >{this.state.ciudadNombre}</div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label>Grupo</label>
                        <div
                            id="grupo"
                            value={this.state.grupoNombre}
                        >{this.state.grupoNombre}</div>
                    </div>
                </div>
                <button onClick={() => this.Regresar()} className='waves-effect waves-light btn' style={{ marginTop: '10px' }}>Volver</button>

            </div>
        )

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetallesEstudiante)