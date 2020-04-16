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
class DetallesGrupo extends Component {
    constructor(props) {
        super(props)
        console.log("params " + JSON.stringify(this.props))
    }
    state = {
        nombre: '',        
        profesorGuia: '',
        profesorNombre :''
        // listaCiudades: [],
        // listaGrupos: []
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get('http://localhost:3005/grupos/' + id).then(response => {
            console.log(JSON.stringify(response.data))
            this.setState({
                nombre: response.data.nombre,                
                profesorGuia: response.data.profesorId,
            })
            axios.get('http://localhost:3005/profesores/' + this.state.profesorGuia).then(response => {
                this.setState({
                    profesorNombre: response.data.nombre
                })
            })
        })
    }
    Regresar = ()=>{
        this.props.history.push('/Grupos')
    }

    render() {
        return (
            <div style={{ textAlign: 'left' }} id="detallesGrupo">
                    <div style={{ marginRight: '10px', marginLeft: '10px', width: '400px' }} >
                        <div style={{ textAlign: 'left' }}>
                            <label>Nombre</label>
                            <div
                                id="nombre"
                                value={this.state.nombre}
                            >{this.state.nombre}</div>
                        </div>                        
                        <div style={{ textAlign: 'left' }}>
                            <label>Profesor Guía</label>
                            <div
                                id="profesorGuia"
                                value={this.state.profesorGuia}
                            >{this.state.profesorNombre}</div>
                        </div>
                    </div>
                    <button onClick = {() => this.Regresar()} className='waves-effect waves-light btn' style={{ marginTop: '10px' }}>Volver</button>
             
            </div>
        )

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetallesGrupo)