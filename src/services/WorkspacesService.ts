
//* *********************************************************** */
//  React and other npm's packages imports
//* *********************************************************** */

import axios from 'axios'
import IServiceResponse from '../interfaces/IServiceResponse';

//* *********************************************************** */
//  Interface imports
//* *********************************************************** */

import IWorkspace from '../interfaces/IWorkspace';

//* *********************************************************** */
//  This service offers the methods to fetch the workspaces
//* *********************************************************** */

// GET 
export const getWorkspaces = async () : Promise<IServiceResponse>  => {
    return await axios.get(process.env.REACT_APP_DATA_ENDPOINT as string)
    .then((res)=>{
        return {status: res.status, statusText:res.statusText, payload: res.data} as IServiceResponse;
    })
    .catch((error)=>{
        return {status: 0, statusText:"Error", payload: []};
    })
}

// POST 
export const postWorkspace = async (workspace: IWorkspace) : Promise<IServiceResponse> => {
    return await axios.post(process.env.REACT_APP_DATA_ENDPOINT as string, workspace)
    .then((res)=>{
        return {status: res.status, statusText:res.statusText, payload: res.data} as IServiceResponse;
    })
    .catch((error)=>{
        return {status: 0, statusText:"Error", payload: []};
    })
}

// PUT 
export const putWorkspace = async (workspace: IWorkspace) : Promise<IServiceResponse>  => {
    return await axios.put(`${process.env.REACT_APP_DATA_ENDPOINT as string}/${workspace.id}`, workspace)
    .then((res)=>{
        return {status: res.status, statusText:res.statusText, payload: res.data} as IServiceResponse;
    })
    .catch((error)=>{
        return {status: 0, statusText:"Error", payload: []};
    })
}

// DELETE 
export const deleteWorkspace = async (workspace: IWorkspace) : Promise<IServiceResponse>  => {
    return await axios.delete(`${process.env.REACT_APP_DATA_ENDPOINT as string}/${workspace.id}`)
    .then((res)=>{
        return {status: res.status, statusText:res.statusText, payload: res.data} as IServiceResponse;
    })
    .catch((error)=>{
        return {status: 0, statusText:"Error", payload: []};
    })
}
