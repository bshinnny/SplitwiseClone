

//action
const LOAD_FRIENDS = 'friend/DISPLAY_FRIENDS'
const displayFriends = (data)=> { 
  return {
    type: LOAD_FRIENDS,
    payload: data
  }
};







//thunk
export const getAllFriends = () => async (dispatch) =>{
    console.log("thunk 3")
    const response = await fetch("/api/friends/current");

    if(response.ok){
        const data = await response.json();
        console.log("+++++data at get all friends",data)
        dispatch(displayFriends(data))
        
    }
}







//reducer
let initialState = {}
function friendReducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_FRIENDS:
        return {"friend":"hello"}
      default:
        return state;
    }
  }
  

  export default friendReducer