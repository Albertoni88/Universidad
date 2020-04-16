import React, { Component } from 'react'
import classes from '../estilos/estilos.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { removeGrupo } from '../reducers/actionCreator'
import { connect } from 'react-redux' 

const mapStateToProps = (state) => {
    return {
        grupos: state.reducer.grupos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveGrupo: (grupoId) => {
            dispatch(removeGrupo(grupoId))
        }
    }
}
class Grupo extends Component {
    // constructor(props) {
    //     super(props);
    // }
    state = {
        id: '',
        nombre: '',
        profesorId: '',
        profesorNombre:''
    }
    eliminarGrupo = (idGrupo) => {
        axios.delete('http://localhost:3005/grupos/' + idGrupo).then(response => {
            this.props.onRemoveGrupo(idGrupo)
        })
    }
    componentDidMount (){
        axios.get('http://localhost:3005/profesores/' + this.props.profesor).then(response => {
            this.setState({
                profesorNombre : response.data.nombre
            })
        }) 
    }
    render() {
        return (
            <tr>
                <td>
                    {this.props.nombre}
                </td>
                <td>
                    {this.state.profesorNombre}
                </td>
                <td>
                    <Link to={`/EditarGrupo/${this.props.id}`}><i class = "material-icons">edit</i></Link>
                    <Link to={`/DetallesGrupo/${this.props.id}`}><i class = "material-icons">description</i></Link>
                    <Link to={`/Grupos`}><i onClick={() => this.eliminarGrupo(this.props.id)} class = "material-icons">delete</i></Link>
                </td>
            </tr>
            // </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Grupo); 