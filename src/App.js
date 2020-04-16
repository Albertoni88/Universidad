import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import NavBar from './NavBar/NavBar'
import './estilos/materialize.css';
import ListadoGrupo from './Grupos/ListadoGrupo'
import ListaEstudiantes from './Estudiantes/listadoEstudiantes'

import CrearEstudiante from './Estudiantes/CrearEstudiante'
import CrearGrupo from './Grupos/CrearGrupo'

import EditarEstudiante from './Estudiantes/EditarEstudiante';
import EditarGrupo from './Grupos/EditarGrupo';

import DetallesEstudiante from './Estudiantes/DetallesEstudiante';
import DetallesGrupo from './Grupos/DetallesGrupo';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <NavBar />
          <Route exact path="/" component = {ListaEstudiantes}/> 
          <Route path="/CrearEstudiante" component = {CrearEstudiante}/>        
          <Route path="/EditarEstudiante/:id" component = {EditarEstudiante}/>        
          <Route path="/DetallesEstudiante/:id" component = {DetallesEstudiante}/> 

          <Route path="/Grupos" component = {ListadoGrupo}/>    
          <Route path="/CrearGrupo" component = {CrearGrupo}/>        
          <Route path="/EditarGrupo/:id" component = {EditarGrupo}/>        
          <Route path="/DetallesGrupo/:id" component = {DetallesGrupo}/>     
      </div>
    </BrowserRouter>
  );
}

export default App;
