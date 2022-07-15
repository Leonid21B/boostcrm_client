import Header from "pages/home/src/components/home/header/Header";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import backIcon from '../images/back.svg'
import { getAllPosts, getCurrentPost } from "redux/asyncRedux/PostAsync";
import '../../../scss/blog.scss'
import { Link } from "react-router-dom";
import Item from "./Item/Item";
import { useRef } from "react";
import Recomendation from "./Recomendation/Recomendation";

const CurrentPost = (props) => {
  const itemsRef = useRef()
  const scrollCustom = (ind) => {
    const current = itemsRef.current.querySelector(`#scroll_${ind}`)
    console.log(current)
    window.scrollTo(0, current.offsetTop)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(window.location.pathname.split('/')[2])
    if (window.location.pathname.split('/')[2]){
      getCurrentPost(dispatch, window.location.pathname.split('/')[2])
    }
    window.scrollTo(0,0)
  }, [window.location.pathname])
  

  const currentPost = useSelector(state => state.post.currentPost)
  console.log(currentPost)

  return(
    <div className="current-post">
      <div className="homepage__container">
        <Link className="current-post__back" to={'../blog'}><img src={backIcon} alt="" /> Вернуться в блог</Link>
        <div style={{backgroundImage:`url(${process.env.REACT_APP_STATIC_SERVER_PATH_POST}/${currentPost.image})`}} className="current-post__img">
          <h1>{currentPost.zag}</h1>
        </div>
        <div className="current-post__container">
          <div ref={itemsRef} className="container__left">
            <p className="started-text">{currentPost.startedText}</p>
            {currentPost.items.map((it,ind) => <Item index = {ind} item = {it}/>)}
          </div>
          <div className="container__right">
            <div className="container__navigate">
              <h3>Содержание:</h3>
              {currentPost.items.map((it, ind) => <p index={ind} onClick = {() => scrollCustom(ind)} item={it}>{it.zag}</p>)}
            </div>
          </div>
        </div>
        <Recomendation postId = {currentPost.id}/>
      </div>
    </div>
  )
}

export default CurrentPost