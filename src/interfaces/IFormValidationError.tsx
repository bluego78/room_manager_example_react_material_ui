//* *********************************************************** */
//  Interface for the form validation error
//* *********************************************************** */

interface IFormValidationError {
    field:string | null,
    error: boolean | undefined,
    helperText: string | null
}

export default IFormValidationError;