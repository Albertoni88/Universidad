import { Link, NavLink } from 'react-router-dom'
import React from 'react'

const AccionesEstudiantes = (props) => {
    return (
        // <nav className="nav red darken-3">
        <div className="container">
            {/* <a className ="bra"> */}
            <ul className="right">
                <li>
                    <Link to="/CrearEstudiante">Crear Estudiante</Link>
                </li>
                <li>
                    <Link to="/EditarEstudiante">Editar Estudiante</Link>
                </li>

                <li>
                    <Link to="/DetallesEstudiante">Detalles Estudiante</Link>
                </li>
            </ul>
        </div>
        // </nav>
    )
}
export default AccionesEstudiantes