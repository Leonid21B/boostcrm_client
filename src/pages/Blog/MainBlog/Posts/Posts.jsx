import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllPosts } from "redux/asyncRedux/PostAsync";
import PostItem from "../PostItem/PostItem";

const Posts = (props) => {
  const dispatch = useDispatch()
  const [statePosts, setStatePosts] = useState([[], []])
  const changeSize = (pg = false) => {
    console.log(props.posts)
    if (props.posts && props.posts.length != 0) {
      console.log(props.posts, 'posts')
      let resPosts = [[], []]
      let numb = null
      if (window.screen.width > 1240) {
        if (props.number === 3 && !pg) {
          console.log(window.screen.width)
          return
        }
        numb = 6
      } else if (window.screen.width <= 1240 && window.screen.width > 650) {
        if (props.number === 2 && !pg) {
          console.log(window.screen.width)
          return
        }
        numb = 4
      } else {
        if (props.number === 1 && !pg) {
          console.log(window.screen.width)
          return
        }
        numb = 2
      }
      let sliceArr = props.posts.slice((page - 1) * 2 * numb, page * 2 * numb)
      for (let it in sliceArr) {
        if (it < numb) {
          resPosts[0].push(sliceArr[it])
        } else {
          resPosts[1].push(sliceArr[it])
        }
      }
      console.log(resPosts)
      props.setNumb(numb / 2)
      setStatePosts([...resPosts])
    }
  } 
  const page = useSelector(state => state.post.currentPage)
  useEffect(() => {
    if (props.posts && props.posts.length) {
      changeSize(true)
    }
  }, [props.posts, page])
  useEffect(() => {
    window.addEventListener('resize', () => changeSize(false))
    getAllPosts(dispatch)
    return () => window.removeEventListener('resize', () => changeSize(false))
  }, [])
  return (
    <>
      {statePosts.map((item, ind) => {
        if (item[0]) return (
          <div key={item[0].id + 'blockPosts'} className="post__blocks">
            <div className="blog__items">
              {item.map(it => <PostItem key={it.id} post={it} />)}
            </div>
            <div className={`prod__item-${ind % 3 === 0 ? 'white' : ind % 3 === 1 ? 'grey' : 'blue'}`}>
              <div className="prod-left">
                <h2>Заголовок</h2>
                <p>Продающий текст</p>
              </div>
              <div className="prod-right">
                <button onClick={() => props.setActiveReg(true)}>Попробовать бесплатно</button>
              </div>
            </div>
          </div>)
      })}
    </>
  )
}
export default Posts