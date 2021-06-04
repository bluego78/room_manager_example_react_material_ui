//* *********************************************************** */
//  React and other npm's packages imports
//* *********************************************************** */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

//* *********************************************************** */
//  Custom components imports
//* *********************************************************** */
import * as CommonStrings from '../../constants/CommonStrings';
import * as actions from '../../stores/actions/WorkspacesActions';
import { initWorkSpace } from '../../stores/states/MainState';

//* *********************************************************** */
//  Interfaces imports
//* *********************************************************** */
import IMainState from '../../interfaces/IMainState';

const WorkspaceTableHeader = () => {

    const dispatch = useDispatch();
    const mainState: IMainState = useSelector((state: IMainState) => state);

    //* *********************************************************** */
    //  Shows the Add/Edit form
    //* *********************************************************** */
    const showAddNewForm = () => {
        dispatch(actions.setIsAdding(true));
        dispatch(actions.setIsEditing(false));
        dispatch(actions.setIsDeleting(false));
        dispatch(actions.setItemToDelete(null));
        dispatch(actions.setItemToEdit(initWorkSpace));
    };

    return <div className="WorkspacesTableHeader">
        <h1 className="TableTitle">{CommonStrings.WORKSPACES_TITLE} {(mainState.isLoading) && <CircularProgress className="spinner" size={25} />}</h1>
        <div>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={showAddNewForm} disabled={mainState.isAdding || mainState.isEditing}>{CommonStrings.ADD_NEW}</Button>
        </div>
    </div>

}

export default WorkspaceTableHeader;