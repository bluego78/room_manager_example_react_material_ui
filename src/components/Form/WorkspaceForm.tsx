//* *********************************************************** */
//  React and other npm's packages imports
//* *********************************************************** */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

//* *********************************************************** */
//  Style imports
//* *********************************************************** */

import './WorkspaceForm.scss';

//* *********************************************************** */
//  Custom components imports
//* *********************************************************** */

import * as CommonStrings from '../../constants/CommonStrings';
import RoomTypeEnum from '../../enums/RoomTypeEnum';
import * as actions from '../../stores/actions/WorkspacesActions';
import { postWorkspace, putWorkspace } from '../../services/WorkspacesService';
import { initWorkSpace } from '../../stores/states/MainState';
import NotificationEnum from '../../enums/NotificationEnum';

//* *********************************************************** */
//  Interfaces imports
//* *********************************************************** */

import IMainState from '../../interfaces/IMainState';
import IWorkspace from '../../interfaces/IWorkspace';
import IFormValidationError from '../../interfaces/IFormValidationError';



const WorkSpaceForm = () => {

  const dispatch = useDispatch();
  const mainState: IMainState = useSelector(state => state) as IMainState;
  const [formErrors, setFormErrors] = useState([] as IFormValidationError[]);

  //* ********************************************************************* */
  //  Populate the typeOptions array based on the RoomTypeEnum values
  //* ********************************************************************* */

  const typeOptions = [];
  var types = Object.values(RoomTypeEnum);
  for (var i in types) {
    typeOptions.push({ value: types[i], label: types[i] });
  }

  //* ********************************************************************* */
  //  Set the type of the room in the mainState to show capacity if is Room
  //* ********************************************************************* */

  const onSelectRoomType = (event: any) => {
    dispatch(actions.setItemToEdit({ ...mainState.itemToEdit, type: event.target.value } as IWorkspace));
    resetError('type');
  }

  //* ********************************************************************* */
  //  Updates the value of the field in the mainState
  //* ********************************************************************* */

  const setFieldValue = (event: any) => {
    let tempWorkSpace: IWorkspace = { ...mainState.itemToEdit } as IWorkspace;
    tempWorkSpace = { ...tempWorkSpace, [event.target.id]: event.target.value };
    dispatch(actions.setItemToEdit(tempWorkSpace));
    resetError(event.target.id);
  }

  //* ********************************************************************* */
  //  Reset the field error
  //* ********************************************************************* */

  const resetError = (fieldName:string) => {
    console.log(fieldName)
    let errorIdx = formErrors.findIndex(e=>e.field===fieldName);
    if(errorIdx>-1)
    {
      setFormErrors(formErrors.filter(e=>e.field!==fieldName))
    }
  }

  //* ********************************************************************* */
  //  Close the add/edit form and reset all necessary values in the mainState
  //* ********************************************************************* */
  const closeForm = () => {
    dispatch(actions.setIsEditing(false));
    dispatch(actions.setIsAdding(false));
    dispatch(actions.setIsDeleting(false));
    dispatch(actions.setItemToEdit(initWorkSpace));
  }

  //* ********************************************************************* */
  //  Form validation
  //* ********************************************************************* */
  const formIsValid = (workspace: IWorkspace): boolean => {
    var errors = false;
    var tempFormErrors = [...formErrors];

    // CHECK THE NAME FIELD
    if (workspace.name === null || workspace.name==="")
    {
      tempFormErrors.push({ field:'name', error:true, helperText:CommonStrings.FIELD_REQUIRED } as IFormValidationError);
      setFormErrors(tempFormErrors);
      errors = true;
    }

    // CHECK THE DESCRIPTION FIELD
    if (workspace.description === null  || workspace.description==="")
    {
      tempFormErrors.push({ field:'description', error:true, helperText:CommonStrings.FIELD_REQUIRED } as IFormValidationError);
      setFormErrors(tempFormErrors);
      errors = true;
    }

    // CHECK THE TYPE FIELD
    if (workspace.type === null  || workspace.type==="")
    {
      tempFormErrors.push({ field:'type', error:true, helperText:CommonStrings.FIELD_REQUIRED} as IFormValidationError);
      setFormErrors(tempFormErrors);
      errors = true;
    }

    // CHECK THE CAPACITY FIELD ONLY IF TYPE IS ROOM
    if (workspace.type !==null && workspace.type===RoomTypeEnum.ROOM && (workspace.capacity===null || isNaN(workspace.capacity) || workspace.capacity<=0))
    {
      tempFormErrors.push({ field:'capacity', error:true, helperText:CommonStrings.FIELD_REQUIRED } as IFormValidationError);
      setFormErrors(tempFormErrors);
      errors = true;
    }

    return !errors;
  }

  //* ********************************************************************* */
  //  Save (Add or Update) the workspace
  //* ********************************************************************* */
  const saveWorkSpace = async () => {

    if (formIsValid(mainState.itemToEdit as IWorkspace)) {
      // ADD A NEW WORKSPACE
      if (mainState.isAdding) {

        let res = await postWorkspace(mainState.itemToEdit as IWorkspace);
        if (res.status === 201 && res.statusText === "Created") {
          dispatch(actions.addWorkspace({ ...mainState.itemToEdit, id: res.payload.id } as IWorkspace));
          dispatch(actions.setItemToEdit(initWorkSpace));
          dispatch(actions.setNotification({ type: NotificationEnum.SUCCESS, message: CommonStrings.SAVE_OK }));
          closeForm();
        }
        else {
          dispatch(actions.setNotification({ type: NotificationEnum.ERROR, message: CommonStrings.ERROR_SAVE }));
        }

      }

      // UPDATE AN EXISTING WORKSPACE
      else {

        let res = await putWorkspace(mainState.itemToEdit as IWorkspace);
        if (res.status === 200 && res.statusText === "OK") {
          dispatch(actions.editWorkspace(mainState.itemToEdit as IWorkspace));
          dispatch(actions.setItemToEdit(initWorkSpace));
          dispatch(actions.setNotification({ type: NotificationEnum.SUCCESS, message: CommonStrings.UPDATE_OK }));
          closeForm();
        }
        else {
          dispatch(actions.setNotification({ type: NotificationEnum.ERROR, message: CommonStrings.ERROR_UPDATE }));
        }

      }
    }
  }

  return <form className="form" noValidate autoComplete="off">
    <div className="formRow" >
      <TextField
        className="inputs"
        required
        id="name"
        label={CommonStrings.WORKSPACE_NAME}
        value={mainState.itemToEdit?.name}
        onChange={setFieldValue}
        error={formErrors.find(e=>e.field==='name')?.error}
        helperText={formErrors.find(e=>e.field==='name')?.helperText}
      />

      <TextField
        className="inputs"
        id="type"
        label={CommonStrings.TYPE}
        select
        required 
        onChange={onSelectRoomType}
        value={mainState.itemToEdit?.type}
        error={formErrors.find(e=>e.field==='type')?.error}
        helperText={formErrors.find(e=>e.field==='type')?.helperText}
      >
        {typeOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      {mainState.itemToEdit?.type === RoomTypeEnum.ROOM &&
        <TextField
          className="inputs"
          id="capacity"
          required
          label={CommonStrings.CAPACITY}
          InputProps={{
            endAdornment: <InputAdornment position="start">{CommonStrings.PEOPLE}</InputAdornment>,
          }}
          value={mainState.itemToEdit?.capacity}
          onChange={setFieldValue}
          error={formErrors.find(e=>e.field==='capacity')?.error}
          helperText={formErrors.find(e=>e.field==='capacity')?.helperText}
        />
      }
    </div>
    <div className="formRow">
      <TextField
        className="description"
        id="description"
        required
        label={CommonStrings.DESCRIPTION}
        value={mainState.itemToEdit?.description}
        onChange={setFieldValue}
        error={formErrors.find(e=>e.field==='description')?.error}
        helperText={formErrors.find(e=>e.field==='description')?.helperText}
      />
    </div>
    <div className="formBtnRow">
      <div>
        <Button className="formBtns" color="primary" onClick={closeForm}>{CommonStrings.CANCEL}</Button>
      </div>
      <div>
        <Button className="formBtns" color="primary" onClick={saveWorkSpace} disabled={formErrors.length > 0}>
          {mainState.isAdding ? CommonStrings.ADD : CommonStrings.SAVE}
        </Button>
      </div>
    </div>
  </form>

}

export default WorkSpaceForm;