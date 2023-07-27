import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

declare interface CoolTextProps {
    text: string
}

const CoolText:FunctionComponent<CoolTextProps>  = ({
    text
}) => {
    const [placeholder, setPlaceholder] = useState('');
    const [textToDisplay, setTextToDisplay] = useState('');
    const index = useRef(0);

    useEffect(() => {
        setTextToDisplay(text)
        index.current = 0
        setPlaceholder('')
    },[textToDisplay, setTextToDisplay, text])

    useEffect(() => {
      function tick() {
        setPlaceholder(prev => prev + textToDisplay[index.current]);
        index.current++;
      }
      if (index.current < textToDisplay.length) {
        let addChar = setInterval(tick, 60);
        return () => clearInterval(addChar);
      }
    }, [placeholder, textToDisplay]);
  
    return (
      <div>
        {placeholder}
      </div>
    )
  }

  export default CoolText