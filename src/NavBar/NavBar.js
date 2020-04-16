import { Link, NavLink, withRouter } from 'react-router-dom'
import React from 'react'

const NavBar = (props) => {
    return (
        <nav className="nav red darken-3">
            <div className="container">
                {/* <a className ="bra"> */}
                <ul className="right">
                    <li>
                        <Link to="/">Listado de estudiantes</Link>
                        {/* <Link to="/CrearEstudiante">Crear Estudiante</Link> */}
                    </li>

                    {/* <li>
                        <Link to="/CrearEstudiante">Crear Estudiante</Link>
                    </li> */}
                </ul>
                <ul className="right">
                    <li>
                        <Link to="/Grupos">Listado de grupos</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default withRouter(NavBar)