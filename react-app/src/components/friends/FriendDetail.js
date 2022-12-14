
import {useHistory, useParams} from 'react-router-dom';
import React, {useEffect,useState,useMemo}from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getFriendDetail } from '../../store/friends';

const FriendDetail = () => {
    const {friendId} = useParams();
    const dispatch = useDispatch()
    const [noShared,setNoshared] = useState(false)

    useEffect(()=>{
        dispatch(getFriendDetail(friendId))
    },[])

    
    const info = useSelector(state=>state.friendDetail)
    console.log("info",info)
   
    const detailList = Object.values(info)
    console.log("frontend friend detail", detailList)
    const thisFriend = detailList.filter((detail)=>detail.id == friendId)

    console.log("))))))",thisFriend)
    const friendDetail = thisFriend[0]
    console.log("*********frienddetail",friendDetail)
    
    // console.log("friendDetail.shared_expenses",friendDetail.shared_expenses)
    let expensesList
    if(friendDetail) {
      if((friendDetail.shared_expenses).length === 0) {
        return <p>You don't have any expenses yet</p>
      }
      else{
        expensesList = friendDetail.shared_expenses
      }
    
    }
    console.log("expensesList",expensesList)

    let groupIdList 
    // let sharedExpenses
    // if(friendDetail){
    //   sharedExpenses = friendDetail.shared_expenses
    //   console.log("friendDetail.shared_expenses",friendDetail.shared_expenses)
    //     if(friendDetail.shared_expenses){
    //       setNoshared(true)
    //     }
        // else{
        // expensesList = thisFriend[0].shared_expenses
        // groupIdList = expensesList.map(expense => expense.id)
        // console.log("groupId",groupIdList)
      // }
        
    // }
    // console.log("&&&&&&&&",expensesList)
  
    
   

    // console.log("groupId",groupId)

  return (
    <div>
     <p>Hello</p>
      {/* {noShared && <p>You have not added any expenses yet</p>} */}
      {friendDetail && expensesList.map(expense=><li id ={expense.id}>{expense.description} {expense.amount}</li>) }
    </div>
  )
}

export default FriendDetail
