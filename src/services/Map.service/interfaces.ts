import { ISpaceDoor, ICheapestPath } from "../SpaceDoor.service/interfaces";


export interface IMapService {
    createMapLinks: (mapNodes: Array<ISpaceDoor>) => Array<IMapLink>
    getPossibleDestinations: (
        path: ICheapestPath,
        currentNode: ISpaceDoor,
        availableCurrency: number,
        desiredDestination?: ISpaceDoor
    ) => Array<ISpaceDoor>
    createMapPathLinks: (path: ICheapestPath) => Array<IMapLink>
}

export interface IMapLink {
    start: number
    destination: number
    isPath?: boolean
}