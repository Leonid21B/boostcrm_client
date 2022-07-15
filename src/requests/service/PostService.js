import api from 'requests'

export default class PostService {
  static async getAllPosts(){
    try{
      return api.get('/blog/get_all_posts')
    }catch(err){
      console.log(err)
    }
  }
  static async getPost(postId){
    try{
      return api.get(`/blog/get_post/${postId}`)
    }catch(err){
      console.log(err)
    }
  }
}