import styled from 'styled-components'

declare interface IBoardScreenTextProps {
  isError?: boolean
  isWarning?: boolean
}

export const BoardContainer = styled.div`
    background-color: #101522;
`
export const BoardElementWrap = styled.div`
display: flex;
flex-direction: column;
`

export const BoardWrap = styled.div`
    display: flex;
    justify-content: center;
    margin: auto;
`

export const BoardElement = styled.div`
  flex-basis: 1100px;
  height: 300px;
  margin: 5px;
  user-select: none;
 -webkit-user-select: none;
 -moz-user-select: none;
`

export const BoardScreen = styled.span`
  width: 100%;
  height: 300px;
  background: #000;
  border: solid;
  border-radius: 25px;
  border-color: #fff;
  border-width: 1px;
  padding: 1px;
  justify-content: center;
  text-align: center;
 `
export const BoardScreenText = styled.span<IBoardScreenTextProps>`
  color: ${({isError, isWarning}) => isError ? 'red' : isWarning ? 'yellow' : '#01BF71'};
  text-align: center;
  display: block;
`