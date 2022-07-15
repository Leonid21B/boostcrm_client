import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import brownPoint from '../../../../images/brownPoint.svg'
import bluePoint from '../../../../images/bluePoint.svg'

const PhotoSlider = (props) => {
  let postRef = useRef()
  const [current, setCurrent] = useState(0)
  let activeSwipe = false
  let startPosX = 0
  let startPosY = 0
  let currentCand = 0
  let isSwipe = false

  const [values, setValues] = useState(props.values.slice(0, 4))
  const startSwipe = (e) => {
    console.log(e)
    startPosX = e.clientX
    startPosY = e.clientY
    activeSwipe = true
  }
  const endSwipe = (cand, is) => {
    if (is && activeSwipe) {
      console.log(cand)
      isSwipe = false
      activeSwipe = false
      postRef.current.style.opacity = 0
      setTimeout(() => {
        postRef.current.style.opacity = 1
        console.log(is)
        setCurrent(it => { if (it - cand < 0) return values.length - 1; else return (it - cand) % values.length})
        startPosX = 0
        startPosY = 0
        currentCand = 0
      }, 0)
    }
  }
  const onSwipe = (e) => {
    console.log(e)
    if (activeSwipe) {
      if (Math.abs(e.clientX - startPosX) > 50) {
        if (!isSwipe) {
          if (e.clientX - startPosX > 0) {
            isSwipe = true
            currentCand = 1
          } else {
            isSwipe = true
            currentCand = -1
          }
        }
      }
    }
  }
  useEffect(() => {
    setValues([...props.values].slice(0,4))
  }, [props.posts])
  return (
    <div className="slider">
      {!!values[current] && <div ref={postRef} onDragEnd={() => endSwipe(currentCand, isSwipe)} onMouseDown={startSwipe} onMouseMove={(e) => onSwipe(e)} className="blog-object__image">
        <img src={`${process.env.REACT_APP_STATIC_SERVER_PATH_VALUE}/${values[current]}`} alt="" />
      </div>}
      <div className="slider__navigate">
        {values.map((val,ind) => {
          return <img src={current == ind ? bluePoint : brownPoint} onClick={() => setCurrent(ind)} alt="" />
        })}
      </div>
    </div>
  )
}

export default PhotoSlider