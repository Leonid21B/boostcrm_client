import randomArr from "pages/Blog/functions/randomArr";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getAllPosts } from "redux/asyncRedux/PostAsync";
import PostSlider from './Slider/PostSlider.jsx'

const Recomendation = (props) => {
  const getStartedText = (text) => {
    let arr = text.split('.')
    let resArr = []
    for(let i in arr){
      if (i > 0 && arr[i].length + resArr.length > 130) {
        break
      }
      resArr.push(arr[i])
      
    }
    console.log(resArr)
    return resArr.join('. ')
  }
  const [curPosts,setCurPosts] = useState([])
  const posts = useSelector(state => state.post.posts)
  const dispatch = useDispatch()
  useEffect(() => {
    if (posts && posts != []) {
      setCurPosts(randomArr(posts,3,props.postId))
    }
  }, [posts,props.postId])

  useEffect(() => {
    getAllPosts(dispatch)
  }, [])
  return(
    <div className="current-post__recomendation">
      <h1>Смотреть другие статьи</h1>
      <div className="recomendation__container">
        {curPosts.map(post => <Link to={`../blog/${post.id}`} key={post.id + '_recomend'} className="recomendation__item">
          <img src={`${process.env.REACT_APP_STATIC_SERVER_PATH_POST}/${post.image}`} alt="" />
          <h2>{post.zag}</h2>
          <p>{getStartedText(post.startedText)}</p>
        </Link>)}
      </div>
      <PostSlider getStartedText={getStartedText} posts={randomArr(posts, 4, props.postId)} />
    </div>
  )
}

export default Recomendation