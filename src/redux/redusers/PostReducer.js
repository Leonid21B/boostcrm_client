const SET_ALL_POSTS = 'SET_ALL_POSTS'
const SET_POST = 'SET_POST'
const SET_PAGE = 'SET_PAGE'

let initialState = {
  posts:[],
  currentPage:1,
  currentPost:{
    id:1,
    zag: 'New post',
    items:[],
    imgref:'',
    startedText:'hello'
  },
  currentPage: 1,

}

const postReducer = (state = initialState,action) => {
  switch(action.type) {
    case SET_ALL_POSTS:
      console.log(action.payload)
      return{
        ...state,posts:action.payload
      }
    case SET_POST:
      return{
        ...state,currentPost:action.payload
      }
    case SET_PAGE:
      console.log(action.payload)
      return{
        ...state,currentPage:action.payload
      }
    default:
      return{
        ...state
      }
  }
}

export const _getAllPosts = (payload) => ({type:SET_ALL_POSTS,payload}) 
export const _setPost = (payload) => ({type:SET_POST,payload}) 
export const _setPage = (payload) => ({type:SET_PAGE, payload})



export default postReducer