import React, { Component } from 'react'
import classes from '../estilos/estilos.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { removeEstudiante, loadEstudiantes } from '../reducers/actionCreator'
import { connect } from 'react-redux' 

const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveEstudiante: (estudianteId) => {
            dispatch(removeEstudiante(estudianteId))
        }
    }
}

class Estudiante extends Component {
    // constructor(props) {
    //     super(props);
    // }
    state = {
        id: '',
        edad: 0,
        sexo: '',
        nombre: '',
        email: '',
        fechaNacimiento: '',
        lugarNacimiento: '',
        grupoId: '',
        grupoNombre:'',
        ciudadNombre:''
    }
    componentDidMount(){
        axios.get('http://localhost:3005/grupos/' + this.props.grupo).then(response => {
            this.setState({
                grupoNombre : response.data.nombre
            })
        })        
        axios.get('http://localhost:3005/ciudades/' + this.props.lugarnacimiento).then(response => {
            this.setState({
                ciudadNombre : response.data.nombre
            })
        })
    }
    eliminarEstudiante = (idEstudiante) => {
        //alert("idest " + idEstudiante)
        axios.delete('http://localhost:3005/estudiantes/' + idEstudiante).then(response => {
            this.props.onRemoveEstudiante(idEstudiante)
        })
    }
    render() {
        return (
            <tr >
                <td>
                    {this.props.nombre}
                </td>
                <td>
                    {this.props.email}
                </td>
                <td>
                    {this.props.sexo}
                </td>
                <td>
                    {this.props.edad}
                </td>
                <td>
                    {this.props.fechanacimiento}
                </td>
                <td>
                    {this.state.ciudadNombre}
                </td>
                <td>
                    {this.state.grupoNombre}
                </td>
                <td>
                    <Link to={`/EditarEstudiante/${this.props.id}`}><i class = "material-icons">edit</i></Link>
                    <Link to={`/DetallesEstudiante/${this.props.id}`}><i class = "material-icons">description</i></Link>
                    {/* <i class="material-icons dp48"></i> */}
                    
                    <Link to={`/`}><i onClick={() => this.eliminarEstudiante(this.props.id)} class = "material-icons">delete</i></Link>
                </td>                
            </tr>
            // </div>
        )
    }
}

export default connect(null, mapDispatchToProps) (Estudiante); 