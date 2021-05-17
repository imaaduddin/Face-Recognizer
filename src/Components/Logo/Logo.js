import React from "react";
import Tilt from 'react-tilt';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt" options={{ max : 25 }} style={{ height: 250, width: 250 }} >
        <div className="Tilt-inner"> HI </div>
      </Tilt>
    </div>
  )
}

export default Logo;