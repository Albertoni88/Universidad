export function ValidateEmail(email) {
    return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) && email !== ''
}
export function ValidateEmptyFields(text){
    return text != ''
}
export function ValidateEdad(edad){
    return edad >= 17
}