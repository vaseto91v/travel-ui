export interface ISpaceDoor {
    id: number
    name: string
    links: Array<ILink>
    coordinates: ICoordinates
}

declare interface ICoordinates {
    x: number,
    y: number
}


export interface ILink {
    to: ISpaceDoor['id'],
    cost: number
}

export interface ICheapestPath {
    pathWay: Array<ISpaceDoor>
    totalCost: number
}

export interface ISpaceDoorResponse extends Response {
    data: Array<ISpaceDoor> | ICheapestPath
}

export interface ISpaceDoorService {
    getAll: () => Promise<ISpaceDoorResponse>
    getAllAccessible: (spaceDoorId: ISpaceDoor['id'], availableCurrency: ILink['cost']) => Promise<ISpaceDoorResponse>
    getCheapestPath: (startDoorId: ISpaceDoor['id'], endDoorId: ISpaceDoor['id']) => Promise<ISpaceDoorResponse>
}
