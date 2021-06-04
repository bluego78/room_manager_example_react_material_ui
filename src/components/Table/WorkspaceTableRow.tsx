//* *********************************************************** */
//  React and other npm's packages imports
//* *********************************************************** */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

//* *********************************************************** */
//  Import Styles
//* *********************************************************** */

import './Table.scss';

//* *********************************************************** */
//  Custom components imports
//* *********************************************************** */

import * as CommonStrings from '../../constants/CommonStrings';
import * as actions from '../../stores/actions/WorkspacesActions';
import { deleteWorkspace } from '../../services/WorkspacesService';
import { initWorkSpace } from '../../stores/states/MainState';

//* *********************************************************** */
//  Interfaces imports
//* *********************************************************** */

import IWorkspace from '../../interfaces/IWorkspace';
import IMainState from '../../interfaces/IMainState';
import NotificationEnum from '../../enums/NotificationEnum';


const WorkspaceTableRow = (props: any) => {

  const dispatch = useDispatch();
  const workspace: IWorkspace = props.workspace;
  const mainState: IMainState = useSelector(state => state) as IMainState;
  const [isOpen, setIsOpen] = useState(false);

  //* *********************************************************** */
  //  On deleting workspace ask for confirmation
  //* *********************************************************** */
  const onDeleteWorkspace = (workspace: IWorkspace) => {
    setIsOpen(true);
    dispatch(actions.setItemToDelete(workspace.id));
    dispatch(actions.setIsDeleting(true));
    dispatch(actions.setIsAdding(false));
    dispatch(actions.setIsEditing(false));
    dispatch(actions.setItemToEdit(initWorkSpace));
  }

  //* *********************************************************** */
  //  After confirmation, let's call the service to delete
  //  and then dispatch the changes to the state
  //* *********************************************************** */
  const onConfirmDelete = async (workspace: IWorkspace) => {
    let res = await deleteWorkspace(workspace);
    if (res.status === 200) {
      dispatch(actions.removeWorkspace(workspace));
      dispatch(actions.setNotification({ type: NotificationEnum.SUCCESS, message: CommonStrings.DELETE_OK }));
    }
    else {
      dispatch(actions.setNotification({ type: NotificationEnum.ERROR, message: CommonStrings.ERROR_DELETE }));
    }
    onCancelDelete();
  }

  //* *********************************************************** */
  //  On Cacel Delete operation, reset the state
  //* *********************************************************** */
  const onCancelDelete = () => {
    dispatch(actions.setIsDeleting(false));
    dispatch(actions.setItemToDelete(null));
  }

  //* *********************************************************** */
  //  Set the item to edit in the state and all the other params
  //* *********************************************************** */
  const onEditWorkspace = async (workspace: IWorkspace) => {
    setIsOpen(true);
    dispatch(actions.setIsEditing(true));
    dispatch(actions.setIsAdding(false));
    dispatch(actions.setIsDeleting(false));
    dispatch(actions.setItemToEdit(workspace));
    dispatch(actions.setItemToDelete(null));
  }

  //* *********************************************************** */
  //  When click on the collapse/expand row do the corresponding
  //  action and if is deleting or editing resets the state
  //* *********************************************************** */
  const onCollapseRow = () => {
    setIsOpen(!isOpen);
    if (mainState.itemToDelete === workspace.id) {
      dispatch(actions.setIsDeleting(false));
      dispatch(actions.setItemToDelete(null));
    }
    if (mainState.itemToEdit?.id === workspace.id) {
      dispatch(actions.setIsEditing(false));
      dispatch(actions.setItemToEdit(initWorkSpace));
    }
  }

  return (
    <React.Fragment>

      {/* THE MAIN ROW CONTAININGS THE WORKSPACE NAME AND THE ACTION BUTTONS */}
      <TableRow>

        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={onCollapseRow}>
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {workspace.name}
        </TableCell>

        <TableCell align="left">{workspace.type}</TableCell>

        <TableCell align="right">
          <div>
            <IconButton aria-label="edit" onClick={() => onEditWorkspace(workspace)}>
              <EditIcon fontSize="small" color={mainState.itemToEdit?.id === workspace.id ? "primary" : "action"} />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => onDeleteWorkspace(workspace)} >
              <DeleteIcon fontSize="small" color={mainState.itemToDelete === workspace.id ? "secondary" : "action"} />
            </IconButton>
          </div>
        </TableCell>

      </TableRow>

      {/* THE DELETE CONFIRMATION ROW */}

      {mainState.isDeleting && mainState.itemToDelete === workspace.id &&
        <TableRow>
          <TableCell align="right" colSpan={8}>
            <div className="AreYouSure">
              {CommonStrings.CONFIRM_DELETE} <strong>{workspace.name}</strong> ?
                <Button color="primary" onClick={onCancelDelete}>{CommonStrings.CANCEL}</Button>
              <Button color="primary" onClick={() => onConfirmDelete(workspace)}>{CommonStrings.DELETE}</Button>
            </div>
          </TableCell>
        </TableRow>
      }

      {/* THE DETAILS ROW CONTAININGS THE WORKSPACE DETAILS */}
      <TableRow className="tableRow">
        <TableCell className="detailsCell" colSpan={6}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit className="collapse" >
            <Box margin={1} padding={3} className="box">

              {workspace.type === "Room" &&
                <div className="capacity">
                  <b>{CommonStrings.CAPACITY}</b>
                  <p>{`${workspace.capacity} ${CommonStrings.PEOPLE}`}</p>
                </div>
              }

              {workspace.description &&
                <div>
                  <b>{CommonStrings.DESCRIPTION}</b>
                  <p>{`${workspace.description}`}</p>
                </div>
              }

            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );

}


export default WorkspaceTableRow;
