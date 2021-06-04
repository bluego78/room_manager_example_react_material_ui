//* *********************************************************** */
//  Interface for workspaces
//* *********************************************************** */

import RoomTypeEnum from '../enums/RoomTypeEnum'

interface IWorkspace {
    id: number | null,
    type: RoomTypeEnum | null | string,
    name: string | null,
    capacity: number | null,
    description: string | null
}

export default IWorkspace;