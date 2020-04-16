import {EDITAR_ESTUDIANTE,EDITAR_GRUPO, REMOVE_GRUPO,LOAD_GRUPOS,REMOVE_ESTUDIANTE, LOAD_ESTUDIANTES,LOAD_CIUDADES , LOAD_PROFESORES, ADD_ESTUDIANTE, ADD_GRUPO } from './actionsType'


//Crear
export const crearEstudiante = (estudiante) => {
    return {
        type: ADD_ESTUDIANTE,
        estudiante
    }
}
export const crearGrupo = (grupo) => {
    return {
        type: ADD_GRUPO,
        grupo
    }
}
//Editar
export const editarEstudiante = (estudiante) => {
    return {
        type: EDITAR_ESTUDIANTE,
        estudiante
    }
}
export const editarGrupo = (grupo) => {
    return {
        type: EDITAR_GRUPO,
        grupo
    }
}
//Load
export const loadEstudiantes = (listaEstudiantes) => {
    return {
        type: LOAD_ESTUDIANTES,
        listaEstudiantes
    }
}
export const loadGrupos = (listaGrupos) => {
    return {
        type: LOAD_GRUPOS,
        listaGrupos
    }
}

//Remove
export const removeGrupo = (grupoId) => {
    return {
        type: REMOVE_GRUPO,
        grupoId
    }
}
export const removeEstudiante = (estudianteId) => {
    return {
        type: REMOVE_ESTUDIANTE,
        estudianteId
    }
}


//Load Extras
export const loadCiudades = (listaCiudades) => {
    return {
        type: LOAD_CIUDADES,
        listaCiudades
    }
}
export const loadProfesores = (listaProfesores) => {
    return {
        type: LOAD_PROFESORES,
        listaProfesores
    }
}