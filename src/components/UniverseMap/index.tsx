import React, { FunctionComponent } from 'react'
import { MapContainer, Map, SpaceDoor } from './UniverseMapElements'
import { scaleLinear } from "d3-scale"
import { IMapLink } from '../../services/Map.service/interfaces'
import { ICheapestPath, ISpaceDoor } from '../../services/SpaceDoor.service/interfaces'

declare interface UniverseMapProps {
    currentNode?: ISpaceDoor
    nodes: Array<ISpaceDoor>
    path?: ICheapestPath
    nodeLinks: Array<IMapLink>
    pathMapLinks: Array<IMapLink>
    onNodeClick: (spaceDoorId: ISpaceDoor['id']) => void
}

const UniverseMap: FunctionComponent<UniverseMapProps> = ({
    currentNode,
    nodes,
    path,
    nodeLinks,
    pathMapLinks,
    onNodeClick,
}) => {

    const xScale = scaleLinear()
        .domain([0, 100])
        .range([0, 1000])

    const yScale = scaleLinear()
        .domain([0, 100])
        .range([0, 400])


    const renderSpaceDoors = () => {
        if(currentNode)
        return nodes.map((node, index) => (
            <>
                <SpaceDoor
                    key={index}
                    cx={xScale(node.coordinates.x)}
                    cy={yScale(node.coordinates.y)}
                    r='25'
                    fill={
                        node.id === currentNode.id ? '#01BF71' :
                            path?.pathWay.find(door => door.id === node.id) ? 'green' :
                                'gray'
                    }
                    onClick={() => onNodeClick(node.id)}
                />
                <text
                    x={xScale(node.coordinates.x)}
                    y={yScale(node.coordinates.y)}
                    textAnchor="middle"
                >
                    {node.name}
                </text>
            </>
        ))
    }

    const renderMapLinks = () => {

        return nodeLinks.map((link, i) => (<line
            key={i}
            x1={xScale(nodes[link.start - 1].coordinates.x)}
            x2={xScale(nodes[link.destination - 1].coordinates.x)}
            y1={yScale(nodes[link.start - 1].coordinates.y)}
            y2={yScale(nodes[link.destination - 1].coordinates.y)}
            strokeWidth={5}
            stroke={
                pathMapLinks.some((pathL, i) => pathL.start === link.start && pathL.destination === link.destination) ? 'green' : 'gray'
            }
        />))
    }

    return (
        <MapContainer>
            <Map>
                {renderMapLinks()}
                {renderSpaceDoors()}
            </Map>
        </MapContainer>
    )
}

export default UniverseMap