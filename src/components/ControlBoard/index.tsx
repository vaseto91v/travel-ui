import React, { FunctionComponent } from 'react'
import { ISpaceDoor, ICheapestPath } from '../../services/SpaceDoor.service/interfaces'
import Button from '../Button'
import CoolText from '../CoolText'
import { BoardContainer, BoardElement, BoardWrap, BoardElementWrap, BoardScreen, BoardScreenText } from './ControlBoardElements'

declare interface IControlBoardProps {
    currentNode?: ISpaceDoor
    currency: number
    notEnoughCurrencyError: boolean
    pathNotAvailableError: boolean
    path?: ICheapestPath
    possibleDestinations?: Array<ISpaceDoor>
    showPossibleDestinations: boolean
    onDestinationButtonClick: () => void
    addCurrency: () => void
    removeCurrency: () => void
}


const ControlBoard: FunctionComponent<IControlBoardProps> = ({
    currentNode,
    currency,
    notEnoughCurrencyError,
    pathNotAvailableError,
    possibleDestinations,
    showPossibleDestinations,
    path,
    addCurrency,
    removeCurrency,
    onDestinationButtonClick
}) => {
    const renderPossibleDestinations = () => {
        if (possibleDestinations && possibleDestinations.length > 0) {
            return possibleDestinations.map(destination => `${destination.name}, `)
        } else {
            return `No were. Please add more Camemberts`
        }

    }

    const renderText = (textType: string, error?: boolean, warning?: boolean) => {
        const text: any = {
            'currentNode': `Emon Lusk welcomes you to: ${currentNode?.name} galaxy. Enjoy your stay.`,
            'currency': `Your available Camembert is: ${currency} `,
            'path': `You need ${path?.totalCost} Camembert to reach your destination`,
            'noCurrency': `You don't have enough Camembert to travel to your desired destination. You can however go to: `,
            'noCurrencyError': `We are sorry you dont have enough Camembert to travel to that galaxy. Try adding more from the button on the left`,
            'noPathError': ` We are sorry there is no available path to your desired destination`
        }

        return (<>
            <BoardScreenText
                isError={error}
                isWarning={warning}
            >
                <CoolText
                    text={text[textType]}
                />
            </BoardScreenText>
            <br />
        </>
        )
    }

    return (
        <BoardContainer>
            <BoardWrap>
                <BoardElement>
                    <BoardElementWrap>
                        <Button label={'+ Camembert'} onClick={() => addCurrency()} />
                        <Button label={'- Camembert'} onClick={() => removeCurrency()} />
                        <Button
                            label={'Travel'}
                            onClick={() => onDestinationButtonClick()}
                        />
                    </BoardElementWrap>
                </BoardElement>
                <BoardElement>
                    <BoardElementWrap>
                        <BoardScreen>
                            {currentNode && renderText('currentNode')}
                            {renderText('currency')}
                            {path && renderText('path')}

                            {possibleDestinations && showPossibleDestinations && renderText('noCurrency', false, true)
                            }
                            {possibleDestinations && showPossibleDestinations &&
                                <BoardScreenText isWarning={true}>
                                    {renderPossibleDestinations()}
                                </BoardScreenText>
                            }
                            {notEnoughCurrencyError && renderText('noCurrencyError', true)}
                            {pathNotAvailableError && renderText('noPathError', true)}

                        </BoardScreen>
                    </BoardElementWrap>
                </BoardElement>
            </BoardWrap>
        </BoardContainer>
    )
}

export default ControlBoard