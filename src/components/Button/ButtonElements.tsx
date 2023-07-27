import styled from "styled-components";

export const StyledButton = styled.div`
    border-radius:  8px;
    background: #01BF71;
    white-space: nowrap;
    padding: 14px 48px;
    width: 200px;
    margin: 10px;
    color: #010606;
    font-size: 20px;
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #0cec90;
    }
`
