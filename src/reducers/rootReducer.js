import * as actionTypes from './actionsType';

const initialState = {
    estudiantes: [],
    profesores: [],
    ciudades: [],
    grupos: []
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        //ADD
        case actionTypes.ADD_ESTUDIANTE:
            return {
                ...state,
                estudiantes: [
                    ...state.estudiantes,
                    action.estudiante
                ]
            }
        case actionTypes.ADD_GRUPO:
            return {
                ...state,
                grupos: [
                    ...state.grupos,
                    action.grupo
                ]
            }
        //EDITAR
        case actionTypes.EDITAR_ESTUDIANTE:
            return {
                ...state,
                estudiantes: state.estudiantes.map((estudiante) => {
                    if (estudiante.id === action.estudiante.id) {
                        return action.estudiante
                    }
                    else {
                        return estudiante
                    }
                })

            }
        case actionTypes.EDITAR_GRUPO:
            return {
                ...state,
                grupos: state.grupos.map((grupo) => {
                    if (grupo.id === action.grupo.id) {
                        return action.grupo
                    }
                    else {
                        return grupo
                    }
                })
            }
        //REMOVE
        case actionTypes.REMOVE_GRUPO:
            return {
                ...state,
                grupos: state.grupos.filter(grupo => grupo.id !== action.grupoId)
            }
        case actionTypes.REMOVE_ESTUDIANTE:
            return {
                ...state,
                estudiantes: state.estudiantes.filter(estudiante => estudiante.id !== action.estudianteId)
            }
        //LOAD    
        case actionTypes.LOAD_ESTUDIANTES:
            return {
                ...state,
                estudiantes: action.listaEstudiantes
            }
        case actionTypes.LOAD_GRUPOS:
            return {
                ...state,
                grupos: action.listaGrupos
            }

        //LOAD EXTRAS
        case actionTypes.LOAD_CIUDADES:
            return {
                ...state,
                ciudades: action.listaCiudades
            }
        case actionTypes.LOAD_PROFESORES:
            return {
                ...state,
                profesores: action.listaProfesores
            }

        default:
            return state
    }
    return state;
};

export default reducer;