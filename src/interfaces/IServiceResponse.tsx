//* *********************************************************** */
//  Interface imports
//* *********************************************************** */

import IWorkspace from "./IWorkspace";

//* *********************************************************** */
//  Interface for the service response
//* *********************************************************** */

interface IServiceResponse {
    status: number,
    payload: IWorkspace[] | IWorkspace | null | any,
    statusText: string | null,
}

export default IServiceResponse;