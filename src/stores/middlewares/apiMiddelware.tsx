//* *********************************************************** */
//  Interface imports
//* *********************************************************** */

import IWorkspace from "../../interfaces/IWorkspace";

//* *********************************************************** */
//  Import custom modules and other
//* *********************************************************** */
import * as Constants from "../../constants/Constants";
import * as service from "../../services/WorkspacesService";
import * as actions from "../../stores/actions/WorkspacesActions";
import * as CommonStrings from "../../constants/CommonStrings";
import NotificationEnum from "../../enums/NotificationEnum";
import { initWorkSpace } from "../states/MainState";

export const apiMiddleware = ({ getState, dispatch }: any) => {

	return function (next: any) {

		return function (action: any) {

			var mainState = getState();

			switch (action.type) {

				//* *********************************************************** */
				//  FETCH WORKSPACES
				//* *********************************************************** */

				case Constants.FETCH_WORKSPACES:
					dispatch(actions.setIsLoading(true));
					service.getWorkspaces().then((res) => {
						if (res) {
							if (res.status && res.status === 200)
							{
								dispatch(actions.setWorkspaces(res.payload));
								dispatch(actions.setWorkspacesLoaded(true));
								dispatch(actions.setIsLoading(false));
							} else {
								dispatch(actions.setNotification({type: NotificationEnum.ERROR,message: CommonStrings.LOADING_ERROR}));
								dispatch(actions.setIsLoading(false));
							}
						}
					});
					break;

				//* *********************************************************** */
				//  POST WORKSPACE
				//* *********************************************************** */

				case Constants.POST_WORKSPACE:

					service.postWorkspace(action.workspace as IWorkspace).then((res) => {
						if (res.status === 201 && res.statusText === "Created")
						{
							dispatch(actions.addWorkspace({...action.workspace, id: res.payload.id} as IWorkspace));
							dispatch(actions.setItemToEdit(initWorkSpace));
							dispatch(actions.setNotification({type: NotificationEnum.SUCCESS, message: CommonStrings.SAVE_OK }));
						} 
						else 
						{
							dispatch(actions.setNotification({type: NotificationEnum.ERROR,message: CommonStrings.ERROR_SAVE}));
						}
					});
					break;

				//* *********************************************************** */
				//  PUT WORKSPACE
				//* *********************************************************** */

				case Constants.PUT_WORKSPACE:

					service.putWorkspace(action.workspace as IWorkspace).then((res) => {
						if (res.status === 200 && res.statusText === "OK")
						{
							dispatch(actions.editWorkspace({...mainState.itemToEdit, ...res.payload} as IWorkspace));
							dispatch(actions.setItemToEdit(initWorkSpace));
							dispatch(actions.setNotification({ type: NotificationEnum.SUCCESS, message: CommonStrings.UPDATE_OK }));
						} 
						else 
						{
							dispatch(actions.setNotification({ type: NotificationEnum.ERROR, message: CommonStrings.ERROR_UPDATE }));
						}
					});
					break;

				//* *********************************************************** */
				//  DELETE WORKSPACE
				//* *********************************************************** */	

				case Constants.DELETE_WORKSPACE:

					service.deleteWorkspace(action.workspace as IWorkspace).then((res) => {
						if (res.status === 200)
						{
							dispatch(actions.removeWorkspace(action.workspace));
							dispatch(actions.setNotification({ type: NotificationEnum.SUCCESS, message: CommonStrings.DELETE_OK }));
						} else {
							dispatch(actions.setNotification({ type: NotificationEnum.ERROR, message: CommonStrings.ERROR_DELETE }));
						}
					});
					break;
			}
			return next(action);
		};
	};
};

export default apiMiddleware;