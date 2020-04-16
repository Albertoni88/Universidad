import React, { Component } from 'react'
import { BrowserRouter, Route, withRouter, useHistory, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadCiudades, loadGrupos, editarEstudiante } from '../reducers/actionCreator'
import axios from 'axios'
import Select from 'react-select'
import { ValidateEmail, ValidateEmptyFields } from '../Validaciones/validaciones'

const mapStateToProps = (state) => {
    return {
        ciudades: state.reducer.ciudades,
        grupos: state.reducer.grupos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditEstudiante: (estudiante) => {
            dispatch(editarEstudiante(estudiante))
        },
        onLoadCiudades: (listaCiudades) => {
            dispatch(loadCiudades(listaCiudades))
        },
        onLoadGrupos: (listaGrupos) => {
            dispatch(loadGrupos(listaGrupos))
        }
    }
}
class EditarEstudiante extends Component {
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
        // listaCiudades: [],
        // listaGrupos: []
    }
    componentDidMount() {
        const ciudadEditar = ''
        const grupoEditar = ''
        axios.get('http://localhost:3005/ciudades').then(response => {
            this.setState({
                listaCiudades: response.data,
                lugarNacimiento: response.data[0].id
            })
            this.props.onLoadCiudades(response.data)
        })
        axios.get('http://localhost:3005/grupos').then(response => {
            this.setState({
                listaGrupos: response.data,
                grupo: response.data[0].id
            })
            //alert("grupos "+ JSON.stringify(response.data))
            this.props.onLoadGrupos(response.data)
        })
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
        })
    }
    handleChange = (e) => {
        // alert(e.target.id)
        // alert(e.target.value)
        this.setState({
            [e.target.id]: e.target.value
        })

    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!ValidateEmail(this.state.email)) {
            alert("Correo inválido")
        } else
            if (!ValidateEmptyFields(this.state.nombre) &&
                !ValidateEmptyFields(this.state.edad) &&
                !ValidateEmptyFields(this.state.fechaNacimiento)) {
                alert("Campos vacíos")
            } else {
                const id = this.props.match.params.id
                let estudiante = {
                    nombre: this.state.nombre,
                    edad: this.state.edad,
                    sexo: this.state.sexo,
                    email: this.state.email,
                    fechaNacimiento: this.state.fechaNacimiento,
                    lugarNacimiento: this.state.lugarNacimiento,
                    grupoId: this.state.grupo
                }

                axios.put('http://localhost:3005/estudiantes/' + id, estudiante)
                    .then(response => {
                        this.props.onEditEstudiante(estudiante)
                        this.props.history.push('/')
                    }
                    );
            }
    }
    render() {
        return (

            <div style={{ textAlign: 'left' }} id="insertarEstudiante">
                <form onSubmit={this.handleSubmit}>
                    <div style={{ marginRight: '10px', marginLeft: '10px', width: '400px' }} >
                        <div>
                            <label>Nombre</label>
                            <input
                                id="nombre"
                                value={this.state.nombre}
                                onChange={this.handleChange}
                                type="text"
                                placeholder="Nombre"></input>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <label>Edad</label>
                            <input
                                id="edad"
                                type="text"
                                placeholder="Edad"
                                value={this.state.edad}
                                onChange={this.handleChange}></input>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <label>Sexo</label>
                            <select
                                style={{ display: 'initial' }}
                                onChange={this.handleChange}
                                id="sexo">
                                <option>Masculino</option>
                                <option>Femenino</option>
                            </select>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <label>Email</label>
                            <input
                                id="email"
                                type="text"
                                placeholder="Email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            ></input>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <label>Fecha de Nacimiento</label>
                            <input
                                id="fechaNacimiento"
                                type="text"
                                value={this.state.fechaNacimiento}
                                onChange={this.handleChange}
                                placeholder="Fecha de Nacimiento"></input>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <label>Lugar de Nacimiento</label>
                            <select id="lugarNacimiento" value={this.state.lugarNacimiento} onChange={this.handleChange} style={{ display: 'initial' }}>
                                {this.props.ciudades.map((ciudad) => {
                                    return (
                                        <option id="lugarNacimiento" key={ciudad.id} value={ciudad.id} >
                                            {ciudad.nombre}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <label>Grupo</label>
                            <select id="grupo" value={this.state.grupo} onChange={this.handleChange} style={{ display: 'initial' }}>
                                {this.props.grupos.map((grupo) => {
                                    return (
                                        <option id="grupo" key={grupo.id} value={grupo.id}>
                                            {grupo.nombre}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <button className='waves-effect waves-light btn' style={{ marginTop: '10px' }}>Editar</button>
                </form>
            </div>
        )

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditarEstudiante)