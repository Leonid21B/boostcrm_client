import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import brownPoint from '../../../images/brownPoint.svg'
import bluePoint from '../../../images/bluePoint.svg'

const Slider = (props) => {
  let postRef = useRef()
  const [current,setCurrent]  = useState(0)
  let activeSwipe = false
  let startPosX = 0
  let startPosY = 0
  let currentCand = 0
  let isSwipe = false
  const [posts,setPosts] = useState(props.posts)
  const startSwipe = (e) => {
    console.log(e)
    startPosX = e.clientX
    startPosY = e.clientY
    activeSwipe = true
  }
  const endSwipe = (cand,is) => {
    if(is && activeSwipe){
      console.log(cand)
      isSwipe = false
      activeSwipe = false
      postRef.current.style.opacity = 0 
      setTimeout(() => {
        postRef.current.style.opacity = 1 
        console.log(is)
        setCurrent(it => { if (it - cand < 0) return 3 ;else return (it-cand) % 4})
        startPosX = 0
        startPosY = 0
        currentCand = 0
      },0)
    }
  }
  const onSwipe = (e) => {
    if(activeSwipe){
      console.log(Math.abs(e.clientX - startPosX))
      if (Math.abs(e.clientX - startPosX) > 2){
        if (!isSwipe){
          if(e.clientX - startPosX > 0){
            isSwipe = true
            currentCand = 1
          }else{
            isSwipe = true
            currentCand = -1
          }
        }
      }
    }
  }
  useEffect(() => {
    setPosts([...props.posts])
  },[props.posts])
  return(
    <div className="slider">
      {!!posts[current] && <Link ref ={postRef} onDragEnd={()=> endSwipe(currentCand,isSwipe)} onMouseDown={startSwipe} onMouseMove = {(e) => onSwipe(e)} to={`../blog/${posts[current].id}`} key={posts[current].id + '_recomend'} className="recomendation__item">
        <img src={`${process.env.REACT_APP_STATIC_SERVER_PATH_POST}/${posts[current].image}`} alt="" />
        <h2>{posts[current].zag}</h2>
        <p>{props.getStartedText(posts[current].startedText)}</p>
      </Link>}
      <div className="slider__navigate">
        <img src={current == 0 ? bluePoint : brownPoint} onClick = {() => setCurrent(0)} alt="" />
        <img src={current == 1 ? bluePoint : brownPoint} onClick = {() => setCurrent(1)} alt="" />
        <img src={current == 2 ? bluePoint : brownPoint} onClick = {() => setCurrent(2)} alt="" />
        <img src={current == 3 ? bluePoint : brownPoint} onClick = {() => setCurrent(3)} alt="" />
      </div>
    </div>
  )
}

export default Slider