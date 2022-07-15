import React, { useEffect } from "react";
import { useMemo } from "react";
import PhotoSlider from "./PhotoSlider/PhotoSlider";

const ObjectImg = (props) => {
  return (
    <div className="blog-object">
      <div className="blog-object__image">
        {props.object.value.map(val => <img src={`${process.env.REACT_APP_STATIC_SERVER_PATH_VALUE}${val}`}/>)}
      </div>
      <PhotoSlider values={props.object.value} />
    </div>
  )
}

export default ObjectImg