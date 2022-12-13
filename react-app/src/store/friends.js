

//action
const LOAD_FRIENDS = 'friends/DISPLAY_FRIENDS'
const displayFriends = (data)=> { 
  return {
    type: LOAD_FRIENDS,
    payload: data
  }
};


const CREATE_FRIEND ="friends/CREATE_FRIEND"
const addFriend = (info) => {
  return {
    type:CREATE_FRIEND,
    payload:info
  }
}







//thunk
//get all the friends from the backend
export const getAllFriends = () => async (dispatch) =>{
    console.log("thunk 3")
    const response = await fetch("/api/friends/current");

    if(response.ok){
        const data = await response.json();
        console.log("+++++data at get all friends",data)
        dispatch(displayFriends(data.currentUserFriends))
        
    }
}



//create a friends by sending the data to backend
export const createFriend = (email) => async (dispatch) => {
  // console.log("start create friend thunk")
  // console.log("email on thunk", email)
  // console.log("email type", typeof(email))

  const response = await fetch("/api/friends",{
    method:"post",
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify(email)
  } )

    if(response.ok) {
      const friend = await response.json()
      console.log("friend___at thunk", friend)
      dispatch(addFriend(friend))
      return friend
    } else if(response.status < 500) {
      const data = await response.json()
      if(data.error) {
        return data;
      
    }
    else {
      return {"error":'something just happened,please try again'}
    }
    
    
    }
}







//reducer
let initialState = {}
export default function friendReducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_FRIENDS:
        const newState = Object.assign({},state);
        action.payload.forEach((friend)=>{
          newState[friend.id] = friend
        })
        return newState
      // case CREATE_FRIEND:
      //   const addFriendState = {...state}
      //   if(addFriendState) {
      //     const newFriends = [action.info, ...addFriendState]
      //   }
      default:
        return state;
    }
  }
  

  