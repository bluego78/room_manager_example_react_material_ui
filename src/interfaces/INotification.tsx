//* *********************************************************** */
//  Interface for the notifications
//* *********************************************************** */

import NotificationEnum from '../enums/NotificationEnum';

interface INotification {
    type: NotificationEnum,
    message: string | null
}

export default INotification;