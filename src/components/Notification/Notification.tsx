//* *********************************************************** */
//  React and other npm's packages imports
//* *********************************************************** */
import Alert from '@material-ui/lab/Alert';

//* *********************************************************** */
//  Styles imports
//* *********************************************************** */

import './Notification.scss';

const Notification = (props:any) => {

    //Allowed types: warning, success, error, info
    return <Alert className="notification" severity={props.type}>{props.message}</Alert>
}

export default Notification;