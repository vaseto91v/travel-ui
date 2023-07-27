
import { ISpaceDoor, ICheapestPath } from "../SpaceDoor.service/interfaces"
import { IMapLink, IMapService } from "./interfaces"

const createMapLinks = (
    mapNodes: Array<ISpaceDoor>
): Array<IMapLink> => {
    let mapLinks: Array<IMapLink> = []
    for (let mapNode of mapNodes) {
        for (let link of mapNode.links) {
            mapLinks.push({
                start: mapNode.id,
                destination: link.to
            })
        }
    }

    return mapLinks
}

const getPossibleDestinations = (
    path: ICheapestPath,
    currentNode: ISpaceDoor,
    availableCurrency: number,
    desiredDestination?: ISpaceDoor
): Array<ISpaceDoor> => {
    let totalCost = 0
    let possibleDestinations: Array<ISpaceDoor> = []
    path.pathWay.forEach((spaceDoor, i, pathWay) => {
        if (spaceDoor.id !== currentNode?.id && spaceDoor.id !== desiredDestination?.id) {
            let price = pathWay[i - 1].links.find(door => door.to === spaceDoor.id)?.cost
            if (price) totalCost = totalCost + price
            console.log(totalCost)
            if (totalCost <= availableCurrency) possibleDestinations.push(spaceDoor)
        }
    })

    return possibleDestinations
}

const createMapPathLinks = (
    path: ICheapestPath
): Array<IMapLink> => {
    let pathLinks: Array<IMapLink> = []
    path.pathWay.forEach((door, index, pathWay) => {
        if (index !== pathWay.length - 1) {
            let path: IMapLink = {
                start: door.id,
                destination: pathWay[index + 1].id
            }
            let reversePath = {
                start: pathWay[index + 1].id,
                destination: door.id
            }
            pathLinks.push(path)
            pathLinks.push(reversePath)
        }
    })
    
    return pathLinks
}

const MapService: IMapService = {
    createMapLinks,
    getPossibleDestinations,
    createMapPathLinks
}

export default MapService