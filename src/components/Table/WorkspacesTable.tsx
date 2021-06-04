//* *********************************************************** */
//  React and other npm's packages imports
//* *********************************************************** */

import React from 'react';
import { useSelector } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//* *********************************************************** */
//  Import Styles
//* *********************************************************** */

import './Table.scss';

//* *********************************************************** */
//  Custom components imports
//* *********************************************************** */

import * as CommonStrings from '../../constants/CommonStrings';
import WorkspaceTableRow from './WorkspaceTableRow';
import WorkspaceForm from '../Form/WorkspaceForm';
import WorkSpaceTableHeader from './WorkspaceTableHeader';

//* *********************************************************** */
//  Interfaces imports
//* *********************************************************** */

import IWorkspace from '../../interfaces/IWorkspace';
import IMainState from '../../interfaces/IMainState';

const WorkspacesTable = (props: any) => {

  const mainState: IMainState = useSelector((state: IMainState) => state);

  return <React.Fragment>

    {/* THE HEADER OF THE TABLE */}
    <WorkSpaceTableHeader />

    {/* THE EDIT / ADD FORM */}
    {(mainState.isAdding || mainState.isEditing) && <WorkspaceForm />}

    {/* THE TABLE CONTENT */}
    {mainState.workspacesLoaded &&
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className="tableRow">
            <TableCell className="collapseCell" />
            <TableCell align="left" className="rowCell nameCell">{CommonStrings.NAME}</TableCell>
            <TableCell align="left" className="rowCell">{CommonStrings.TYPE}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mainState.workspaces && mainState.workspaces.length > 0 && mainState.workspaces.map((workspace: IWorkspace, index) => (
            <WorkspaceTableRow key={index} workspace={workspace} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    }
  </React.Fragment >
}

export default WorkspacesTable;
