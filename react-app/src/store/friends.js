

//action
const LOAD_FRIENDS = 'friends/DISPLAY_FRIENDS'
const displayFriends = (data)=> {
  return {
    type: LOAD_FRIENDS,
    payload: data
  }
};



const FRIEND_DETAIL = 'friends/FRIEND_DETAIL'
const fetchFriendDetail = (info) => {
  return {
    type:FRIEND_DETAIL,
    info
  }
}

const CREATE_FRIEND ="friends/CREATE_FRIEND"
const addFriend = (info) => {
  return {
    type:CREATE_FRIEND,
    payload:info
  }
}


const REMOVE_FRIEND = "friends/REMOVE_FRIEND"
const deleteFriend = (firendId) => {
  return {
    type: REMOVE_FRIEND,
    payload:firendId
  }
}

const CLEAR_FRIENDS = "friends/CLEAR_FRIENDS"
export const clearFriends = () => {
  return {
    type: CLEAR_FRIENDS
  }
}







//thunk
//get all the friends from the backend
export const getAllFriends = () => async (dispatch) =>{
  
    const response = await fetch("/api/friends/current");

    if(response.ok){
        const data = await response.json();

        dispatch(displayFriends(data.currentUserFriends))

    }
}



//get friend detail
export const getFriendDetail = (id) => async (dispatch) =>{
 
  const response = await fetch(`/api/friends/${id}`)

  const info = await response.json()

  dispatch(fetchFriendDetail(info))

  return info
}



//create a friends by sending the data to backend
export const createFriend = (email) => async (dispatch) => {
 

  const response = await fetch("/api/friends",{
    method:"post",
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify(email)
  } )

    if(response.ok) {
      const friend = await response.json()
  
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


//delete a friend from the backend
export const deletingFriend = (id)=>async (dispatch)=> {

  const response = await fetch(`/api/friends/${id}`,{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      "friend_id":id
    })
  } )

  if (response.ok) {
    dispatch(deleteFriend(id))
    const message = await response.json()
    return message
} else if (response.status < 500) {
    const data = await response.json();
    if (data.error) {
        return data;
    }
} else {
    return  {'error': 'An error occurred. Please try again.' }
}
}





//reducer
let initialState = {}
export default function friendReducer(state = initialState, action) {
    let newState
    switch (action.type) {
      case LOAD_FRIENDS:
        newState = Object.assign({},state);
        action.payload.forEach((friend)=>{
          newState[friend.id] = friend
        })
        return newState
      case REMOVE_FRIEND:
        newState = {...state};
        delete newState[action.payload];
        return newState;
      case CLEAR_FRIENDS:
        newState = {...state}
        newState = {}
        return newState;
      default:
        return state;
    }
  }

  export function friendDetailReducer(state = initialState, action) {
    let detailState
    switch (action.type) {
      case FRIEND_DETAIL:
        detailState = Object.assign({},state);
        detailState[action.info.id] = action.info
        return detailState
      default:
        return state;
    }
  }
