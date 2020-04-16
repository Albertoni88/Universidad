import React, { Component } from 'react'
import { BrowserRouter, Route, withRouter, useHistory, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadProfesores, loadGrupos, editarGrupo } from '../reducers/actionCreator'
import axios from 'axios'
import Select from 'react-select'
import { ValidateEmptyFields } from '../Validaciones/validaciones'

const mapStateToProps = (state) => {
    return {
        profesores: state.reducer.profesores,
        grupos: state.reducer.grupos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditGrupo: (estudianteId) => {
            dispatch(editarGrupo(estudianteId))
        },
        onLoadProfesores: (listaProfesores) => {
            dispatch(loadProfesores(listaProfesores))
        },
        onLoadGrupos: (listaGrupos) => {
            dispatch(loadGrupos(listaGrupos))
        }
    }
}
class EditarGrupo extends Component {
    constructor(props) {
        super(props)
        console.log("params " + JSON.stringify(this.props))
    }
    state = {
        nombre: '',
        profesorGuia: '',
        listaProfesores: [],
        listaGrupos: []
    }
    componentDidMount() {

        axios.get('http://localhost:3005/profesores').then(response => {
            this.setState({
                listaProfesores: response.data,
                profesorGuia: response.data[0].id
            })
            //alert("profesores "+ JSON.stringify(response.data))
            this.props.onLoadProfesores(response.data)
        })

        const id = this.props.match.params.id
        axios.get('http://localhost:3005/grupos/' + id).then(response => {
            //alert("profesorrrrrr " + JSON.stringify(response.data))
            this.setState({
                nombre: response.data.nombre,
                profesorGuia: response.data.profesorId,
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
        if (!ValidateEmptyFields(this.state.nombre)) {
            alert("Campos vacíos")
        } else {
            const id = this.props.match.params.id
            let grupo = {
                nombre: this.state.nombre,
                profesorId: this.state.profesorGuia
            }

            axios.put('http://localhost:3005/grupos/' + id, grupo)
                .then(response => {
                    this.props.history.push('/Grupos')
                    this.props.onEditGrupo(grupo)
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
                            <label>Profesor Guía</label>
                            <select id="profesorGuia" value={this.state.profesorGuia} onChange={this.handleChange} style={{ display: 'initial' }}>
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
                    <button className='waves-effect waves-light btn' style={{ marginTop: '10px' }}>Editar</button>
                </form>
            </div>
        )

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditarGrupo)