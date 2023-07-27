import http from "../../http-common";
import { ILink, ISpaceDoor, ISpaceDoorResponse, ISpaceDoorService } from "./interfaces";

const getAll = (): Promise<ISpaceDoorResponse> => {
    return http.get('/space-doors')
};

const getAllAccessible = (
    spaceDoorId: ISpaceDoor['id'],
    availableCurrency: ILink['cost']
): Promise<ISpaceDoorResponse> => {
    return http.get(`/space-doors/${spaceDoorId}/access?availableCurrency=${availableCurrency}`)

}

const getCheapestPath = (
    startDoorId: ISpaceDoor['id'],
    endDoorId: ISpaceDoor['id']
): Promise<ISpaceDoorResponse> => {
    return http.get(`/space-doors/${startDoorId}/path/${endDoorId}`)
}

const SpaceDoorService: ISpaceDoorService = {
    getAll,
    getAllAccessible,
    getCheapestPath
}

export default SpaceDoorService