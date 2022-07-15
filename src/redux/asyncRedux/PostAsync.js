import { _getAllPosts, _setPost } from "redux/redusers/PostReducer"
import PostService from "requests/service/PostService"


export const getAllPosts = async (dispatch) => {
  const posts = await PostService.getAllPosts().then(res => res.data)
  await dispatch(_getAllPosts(posts.posts))
} 
export const getCurrentPost = async (dispatch,postId) => {
  const post = await PostService.getPost(postId).then(res => res.data)
  dispatch(_setPost(post.post))
}