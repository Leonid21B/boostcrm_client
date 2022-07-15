import SuccesRegistrationModal from "componentStore/modals/SuccesRegistrationModal";
import Registraton from "pages/home/src/components/regModal/Registraton";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllPosts } from "redux/asyncRedux/PostAsync";
import '../../../scss/blog.scss'
import ChangePage from "./ChangePage/ChangePage";
import PostItem from "./PostItem/PostItem";
import Posts from "./Posts/Posts";

const MainBlog = (props) => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.post.posts)
  
  
  const [numberPosts,setNumber] = useState(0)
  const [activeReg, setActiveReg] = useState(false)
  const [activeSuccess, setActiveSuccess] = useState(false)
  const body = document.querySelector('body')
  
  
  return(
    <div className="blog">
      <div className="homepage__container">
        <h1 className="blog__zag">
          Блог
        </h1>
        <div className="prod__item-blue">
          <div className="prod-left">
            <h2>Заголовок</h2>
            <p>Продающий текст</p>
          </div>
          <div className="prod-right">
            <button onClick={() => setActiveReg(true)}>Попробовать бесплатно</button>
          </div>
        </div>
        <Posts setActiveReg  = {setActiveReg} setNumb = {setNumber} number ={numberPosts}  posts = {posts}/>
        <ChangePage allPage = {numberPosts ? Math.ceil(posts.length / (numberPosts * 4)) : 1} />
      </div>
      
      <Registraton
        isBlog={true}
        body={body}
        active={activeReg}
        setActive={setActiveReg}
        setActiveSuccessRegistrationModal={setActiveSuccess}
      />
      <SuccesRegistrationModal
        body={body}
        active={activeSuccess}
        setActive={setActiveSuccess}
      />
    </div>
  )
}

export default MainBlog