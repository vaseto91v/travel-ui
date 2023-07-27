import React, { useEffect, useState } from 'react';
import ControlBoard from '../components/ControlBoard'
import UniverseMap from '../components/UniverseMap';
import SpaceDoorDataService from '../services/SpaceDoor.service'
import MapService from '../services/Map.service';
import { IMapLink } from '../services/Map.service/interfaces';
import { ISpaceDoor, ICheapestPath } from '../services/SpaceDoor.service/interfaces';

const Home = () => {

  const [currentNode, setCurrentNode] = useState<ISpaceDoor>()
  const [spaceDoors, setSpaceDoors] = useState<Array<ISpaceDoor>>([])
  const [mapLinks, setMapLinks] = useState<Array<IMapLink>>([])
  const [pathMapLinks, setPathMapLinks] = useState<Array<IMapLink>>([])
  const [path, setPath] = useState<ICheapestPath>()
  const [currency, setCurrency] = useState<number>(10)
  const [desiredDestination, setDesiredDestination] = useState<ISpaceDoor>()
  const [notEnoughCurrencyError, setNotEnoughCurrencyError] = useState<boolean>(false)
  const [pathNotAvailableError, setPathNotAvailableError] = useState<boolean>(false)
  const [possibleDestinations, setPossibleDestinations] = useState<Array<ISpaceDoor>>()
  const [showPossibleDestinations, setShowPossibleDestinations] = useState<boolean>(false)

  useEffect(() => {
    retrieveSpaceDoors()
  }, [])

  useEffect(() => {
    if (spaceDoors.length > 0) {
      let randomStartSpaceDoor = spaceDoors[Math.floor(Math.random() * spaceDoors.length)]
      setCurrentNode(randomStartSpaceDoor)
    }
  }, [spaceDoors])

  const retrieveSpaceDoors = () => {
    SpaceDoorDataService.getAll()
      .then((response) => {
        if (response.data) {
          setSpaceDoors(response.data as Array<ISpaceDoor>)
          const mapLinks = MapService.createMapLinks(response.data as Array<ISpaceDoor>)
          setMapLinks(mapLinks)
        }
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  const retrieveCheapestPath = (spaceDoorId: ISpaceDoor['id']) => {
    if (currentNode && spaceDoorId !== currentNode.id)
      SpaceDoorDataService.getCheapestPath(currentNode.id, spaceDoorId)
        .then((response) => {
          if (response.data) {
            let cheapestPath = response.data as ICheapestPath
            const pathMapLinks = MapService.createMapPathLinks(cheapestPath)
            setPathMapLinks(pathMapLinks)
            setPath(cheapestPath)
            setDesiredDestination(cheapestPath.pathWay[cheapestPath.pathWay.length - 1])
            setPathNotAvailableError(false)
            if (currency < cheapestPath.totalCost) {
              const possibleDestinations = MapService.getPossibleDestinations(cheapestPath, currentNode, currency, desiredDestination)
              setPossibleDestinations(possibleDestinations)
              setShowPossibleDestinations(true)
            }
          }
        })
        .catch((error: any) => {
          setPathNotAvailableError(true)
        })
  }

  const travelToDestination = () => {
    if (path) {
      if (path.totalCost <= currency) {
        if (desiredDestination && desiredDestination.id > 0) setCurrentNode(desiredDestination)
        setCurrency(currency - path.totalCost)
        setPath({ pathWay: [], totalCost: 0 })
        setPathMapLinks([])
        setPossibleDestinations([])
        setShowPossibleDestinations(false)
      } else {
        setNotEnoughCurrencyError(true)
      }
    }
  }

  const addCurrency = () => {
    let newCurrency = currency + 1
    setCurrency(newCurrency)
    if (notEnoughCurrencyError && path && newCurrency === path.totalCost)
      setNotEnoughCurrencyError(false)
    setPossibleDestinations([])
    setShowPossibleDestinations(false)
  }

  const removeCurrency = () => {
      setCurrency(currency >= 1? currency - 1 : currency)
  }
  return (
    <>
      <UniverseMap
        currentNode={currentNode}
        nodes={spaceDoors}
        nodeLinks={mapLinks}
        path={path}
        onNodeClick={retrieveCheapestPath}
        pathMapLinks={pathMapLinks} />
      <ControlBoard
        showPossibleDestinations={showPossibleDestinations}
        notEnoughCurrencyError={notEnoughCurrencyError}
        pathNotAvailableError={pathNotAvailableError}
        possibleDestinations={possibleDestinations}
        path={path}
        currentNode={currentNode}
        addCurrency={addCurrency}
        removeCurrency={removeCurrency}
        currency={currency}
        onDestinationButtonClick={travelToDestination}
      />
    </>
  );
}

export default Home;
