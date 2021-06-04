//* *********************************************************** */
//  Interfaces imports
//* *********************************************************** */

import IWorkspace from '../../interfaces/IWorkspace';
import IMainState from '../../interfaces/IMainState';

//* *********************************************************** */
//  Initial empty Workspace
//* *********************************************************** */

export const initWorkSpace: IWorkspace = {
  id: null,
  type: "",
  name: "",
  capacity: null,
  description: ""
};

//* *********************************************************** */
//  Initial Main State
//* *********************************************************** */

export const MainState: IMainState = {
  isLoading: false,
  workspacesLoaded: false,
  isAdding: false,
  isEditing: false,
  isDeleting: false,
  workspaces: null as Array<IWorkspace> | null,
  itemToEdit: initWorkSpace,
  itemToDelete: null,
  notification: null
}

export default MainState;