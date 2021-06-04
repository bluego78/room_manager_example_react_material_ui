//* *********************************************************** */
//  Interface imports
//* *********************************************************** */

import INotification from './INotification';

//* *********************************************************** */
//  Interface for the main state
//* *********************************************************** */

import IWorkspace from './IWorkspace';

interface IMainState {
    isLoading: boolean,
    workspacesLoaded: boolean,
    isAdding: boolean,
    isEditing: boolean,
    isDeleting: boolean,
    workspaces: IWorkspace[] | null,
    itemToEdit: IWorkspace | null,
    itemToDelete: number | null,
    notification: INotification | null
}

export default IMainState;