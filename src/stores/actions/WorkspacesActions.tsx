//* *********************************************************** */
//  Custom components imports
//* *********************************************************** */

import * as Constants from '../../constants/Constants';

//* *********************************************************** */
//  Interfaces imports
//* *********************************************************** */

import IWorkspace from '../../interfaces/IWorkspace';
import INotification from '../../interfaces/INotification';

//* *********************************************************** */
//  Actions for the reducer
//* *********************************************************** */

export const setIsLoading = (isLoading: boolean) => {
    return { type: Constants.SET_ISLOADING, isLoading };
}

export const setWorkspacesLoaded = (workspacesLoaded: boolean) => {
    return { type: Constants.SET_WORKSPACE_LOADED, workspacesLoaded };
}

export const setIsAdding = (isAdding: boolean) => {
    return { type: Constants.SET_IS_ADDING, isAdding };
}

export const setIsDeleting = (isDeleting: boolean) => {
    return { type: Constants.SET_IS_DELETING, isDeleting };
}

export const setItemToEdit = (workspace: IWorkspace | null) => {
    return { type: Constants.SET_ITEM_TO_EDIT, workspace };
}

export const setItemToDelete = (itemToDelete: number | null) => {
    return { type: Constants.SET_ITEM_TO_DELETE, itemToDelete };
}

export const setIsEditing = (isEditing: boolean) => {
    return { type: Constants.SET_IS_EDITING, isEditing };
}

export const setNotification = (notification: INotification | null) => {
    return { type: Constants.SET_NOTIFICATION, notification };
}

export const setWorkspaces = (workspaces: Array<IWorkspace>) => {
    return { type: Constants.SET_WORKSPACES, workspaces };
}

export const addWorkspace = (workspace: IWorkspace) => {
    return { type: Constants.ADD_WORKSPACE, workspace };
}

export const editWorkspace = (workspace: IWorkspace) => {
    return { type: Constants.EDIT_WORKSPACE, workspace };
}

export const removeWorkspace = (workspace: IWorkspace) => {
    return { type: Constants.REMOVE_WORKSPACE, workspace };
}