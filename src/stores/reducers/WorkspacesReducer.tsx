//* *********************************************************** */
//  Custom components imports
//* *********************************************************** */

import MainState from '../states/MainState';
import * as Constants from '../../constants/Constants';

//* *********************************************************** */
//  Interfaces imports
//* *********************************************************** */

import IWorkspace from '../../interfaces/IWorkspace';

//* *********************************************************** */
//  The reducer
//* *********************************************************** */

const WorkspacesReducer = (state = MainState, action: any) => {
    switch (action.type) {

         //* *********************************************************** */
        //  Application state settings actions
        //* *********************************************************** */

        case Constants.SET_ISLOADING:
            return { ...state, isLoading: action.isLoading };

        case Constants.SET_WORKSPACE_LOADED:
            return { ...state, workspacesLoaded: action.workspacesLoaded };

        case Constants.SET_IS_ADDING:
            return { ...state, isAdding: action.isAdding };

        case Constants.SET_IS_EDITING:
            return { ...state, isEditing: action.isEditing };

        case Constants.SET_IS_DELETING:
            return { ...state, isDeleting: action.isDeleting };

        case Constants.SET_NOTIFICATION:
            return { ...state, notification: action.notification };

        case Constants.SET_ITEM_TO_EDIT:
            return { ...state, itemToEdit: action.workspace };

        case Constants.SET_ITEM_TO_DELETE:
            return { ...state, itemToDelete: action.itemToDelete };

            
        //* *********************************************************** */
        //  Workspace actions
        //* *********************************************************** */

        case Constants.SET_WORKSPACES:
            return { ...state, workspaces: action.workspaces };

        case Constants.ADD_WORKSPACE:
            let wsToPush = [...state.workspaces as Array<IWorkspace>];
            wsToPush.push(action.workspace);
            return { ...state, workspaces: wsToPush };

        case Constants.REMOVE_WORKSPACE:
            let wsToDelete = [...state.workspaces as Array<IWorkspace>];
            wsToDelete = wsToDelete.filter(ws => ws.id !== action.workspace.id);
            return { ...state, workspaces: wsToDelete };

        case Constants.EDIT_WORKSPACE:
            let wsToupdate = [...state.workspaces as Array<IWorkspace>];
            let idx = wsToupdate.findIndex(ws => ws.id === action.workspace.id);
            wsToupdate[idx] = action.workspace;
            return { ...state, workspaces: wsToupdate };

        default:
            return state;
    }
}
export default WorkspacesReducer;