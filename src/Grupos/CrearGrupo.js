import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadProfesores, crearGrupo } from '../reducers/actionCreator'
import axios from 'axios'
import { ValidateEmptyFields } from '../Validaciones/validaciones'
const mapStateToProps = (state) => {
    return {
        grupos: state.reducer.grupos,
        profesores: state.reducer.profesores
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateGrupo: (grupo) => {
            dispatch(crearGrupo(grupo))
        },
        onLoadProfesores: (listaProfesores) => {
            dispatch(loadProfesores(listaProfesores))
        }
        // onLoadGrupos: (listaGrupos) => {
        //     dispatch(loadGrupos(listaGrupos))
        // }
    }
}
class CrearGrupo extends Component {
    state = {
        nombre: '',
        profesorGuia: '',
        listaProfesores: []
    }
    componentDidMount() {
        axios.get('http://localhost:3005/profesores').then(response => {
            this.setState({
                listaProfesores: response.data,
                profesorGuia: response.data[0].id
            })
            this.props.onLoadProfesores(response.data)
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!ValidateEmptyFields(this.state.nombre)) {
            alert("Campos vacíos")
        } else {
            let grupo = {
                nombre: this.state.nombre,
                profesorId: this.state.profesorGuia
            }
            axios({
                method: 'post',
                url: 'http://localhost:3005/grupos',
                data: grupo
            }).then(response => {
                this.props.onCreateGrupo(grupo)
                this.props.history.push('/Grupos')
            });
        }
    }
    Regresar = () => {
        this.props.history.push('/Grupos')
    }
    render() {
        return (
            <div style={{ textAlign: 'left' }} id="insertarGrupo">
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
                            <label>Profesor Guía</label>
                            <select id="profesorGuia" onChange={this.handleChange} style={{ display: 'initial' }}>
                                {this.props.profesores.map((profesor) => {
                                    return (
                                        <option id="profesorGuia" key={profesor.id} value={profesor.id} >
                                            {profesor.nombre}
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
export default connect(mapStateToProps, mapDispatchToProps)(CrearGrupo)