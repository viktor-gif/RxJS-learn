

export function validatioInputs(value: string) {
    
    let error;
    if (!value) {
        error = 'Field is required'
    } else if (value.length < 4) {
        error = 'Min length is 4 symbols'
    } else if (value.length > 40) {
        error = 'Max length is 40 symbols'
    }
    return error
}