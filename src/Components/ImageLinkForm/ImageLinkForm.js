import React from "react";

const ImageLinkForm = () => {
  return (
    <div>
      <p className="f3">
        {"This blob here known as The Magic Brain will detect faces in your pictures. Give it a try!"}
      </p>
      <div className="center">
        <div className="pa4 br3 shadow-5">
          <input className="f4 pa2 w-70 center"/>
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-red">Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;