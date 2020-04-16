import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadCiudades, loadGrupos, crearEstudiante } from '../reducers/actionCreator'
import axios from 'axios'
import Select from 'react-select'
import { ValidateEmail, ValidateEmptyFields, ValidateEdad } from '../Validaciones/validaciones'
const mapStateToProps = (state) => {
    return {
        ciudades: state.reducer.ciudades,
        grupos: state.reducer.grupos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateEstudiante: (estudiante) => {
            dispatch(crearEstudiante(estudiante))
        },
        onLoadCiudades: (listaCiudades) => {
            dispatch(loadCiudades(listaCiudades))
        },
        onLoadGrupos: (listaGrupos) => {
            dispatch(loadGrupos(listaGrupos))
        }
    }
}
class CrearEstudiante extends Component {
    state = {
        edad: '',
        sexo: 'Masculino',
        nombre: '',
        email: '',
        fechaNacimiento: '',
        lugarNacimiento: '',
        grupo: '',
        listaCiudades: [],
        listaGrupos: []
    }
    componentDidMount() {
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
        }else
        if(!ValidateEdad(this.state.edad)){
            alert("La edad debe ser mayor o igual que 17")
        }else
        if (!ValidateEmptyFields(this.state.nombre) &&
            !ValidateEmptyFields(this.state.edad) &&
            !ValidateEmptyFields(this.state.fechaNacimiento)) {
            alert("Campos vacíos")
        } else {
            let estudiante = {
                nombre: this.state.nombre,
                edad: this.state.edad,
                sexo: this.state.sexo,
                email: this.state.email,
                fechaNacimiento: this.state.fechaNacimiento,
                lugarNacimiento: this.state.lugarNacimiento,
                grupoId: this.state.grupo
            }
            //alert("Estudiante " + JSON.stringify(estudiante))
            axios({
                method: 'post',
                url: 'http://localhost:3005/estudiantes',
                data: estudiante
            }).then(response => {
                this.props.onCreateEstudiante(estudiante)
                this.props.history.push('/')
            });
        }
    }
    Regresar = () => {
        this.props.history.push('/')
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
                                type="number"
                                min = {17}
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
                            <select id="lugarNacimiento" onChange={this.handleChange} style={{ display: 'initial' }}>
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
                            <select id="grupo" onChange={this.handleChange} style={{ display: 'initial' }}>
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
                    <button className='waves-effect waves-light btn' style={{ marginLeft: '10px', marginTop: '10px' }}>Adicionar</button>
                </form>
                <button onClick={() => this.Regresar()} className='waves-effect waves-light btn' style={{ marginLeft: '10px', marginTop: '10px' }}>Volver</button>
            </div>
        )

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CrearEstudiante)