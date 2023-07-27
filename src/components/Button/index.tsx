import React, {FunctionComponent, useState} from 'react';
import { StyledButton } from './ButtonElements'

declare interface IButtonProps {
    label: string,
    onClick: () => void
}

const Button: FunctionComponent<IButtonProps> = ({
    label,
    onClick,
}) => {

    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    return (
        <>
            <StyledButton
                onMouseEnter={onHover}
                onMouseLeave={onHover}
                onClick={() =>onClick()}
            >
                {label}
            </StyledButton>
        </>
    )
}

export default Button