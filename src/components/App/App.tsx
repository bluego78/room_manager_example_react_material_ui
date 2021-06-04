//* *********************************************************** */
//  React and other npm's packages imports
//* *********************************************************** */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';

//* *********************************************************** */
//  Interfaces imports
//* *********************************************************** */

import IMainState from '../../interfaces/IMainState';

//* *********************************************************** */
//  Custom components imports
//* *********************************************************** */

import { getWorkspaces } from '../../services/WorkspacesService';
import * as actions from '../../stores/actions/WorkspacesActions';
import WorkspacesTable from '../Table/WorkspacesTable';
import Notification from '../../components/Notification/Notification';
import * as CommonStrings from '../../constants/CommonStrings';
import NotificationEnum from '../../enums/NotificationEnum';


const App = () => {

  const dispatch = useDispatch();
  const mainState: IMainState = useSelector(state => state) as IMainState;

  //* *********************************************************** */
  //  Function to load the workspaces from the WorkspacesService
  //* *********************************************************** */
  const loadWorkspaces = async () => {
    dispatch(actions.setIsLoading(true));
    let workspacesResponse = await getWorkspaces();
    if (workspacesResponse) {
      if (workspacesResponse.status && workspacesResponse.status === 200) {
        dispatch(actions.setWorkspaces(workspacesResponse.payload))
        dispatch(actions.setWorkspacesLoaded(true));
        dispatch(actions.setIsLoading(false));
      }
      else {
        dispatch(actions.setNotification({ type: NotificationEnum.ERROR, message: CommonStrings.LOADING_ERROR }));
        dispatch(actions.setIsLoading(false));
      }
    }
  }

  //* *********************************************************** */
  //  Fire the loading of workspaces for the first time
  //* *********************************************************** */
  useEffect(() => {
    loadWorkspaces();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //* *********************************************************** */
  //  If a notification is on the screen, this reset/cancel it
  //  after 2,5 seconds (this could me moved to the env file)
  //* *********************************************************** */
  useEffect(() => {
    setTimeout(() => { dispatch(actions.setNotification(null)); }, 2500);
  }, [mainState.notification]); // eslint-disable-line react-hooks/exhaustive-deps


  return <React.Fragment>

    {/* Shows a notification if is present in the mainState */}
    {mainState.notification && mainState.notification !== null && <Notification type={mainState.notification.type} message={mainState.notification.message} />}

    {/* Loads the workspaces table */}
    <Box m="5rem">
      <WorkspacesTable />
    </Box>
  </React.Fragment>

}

export default App;