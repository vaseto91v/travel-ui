import styled from 'styled-components'
import space from '../../recourses/images/space.jpg'

export const MapContainer = styled.div`
    background: #e7e7e7;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 400px;
    position: relative;
    z-index: 1;
    background-image: url(${space});
    border: solid;
    border-radius: 25px;
    border-color: #000;
    border-width: 5px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
`

export const Map = styled.svg`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

export const SpaceDoor = styled.circle`
    text-align: justify;
    cursor: pointer;
`

export const SpaceDoorWrapper = styled.div`
    cursor: pointer;
`