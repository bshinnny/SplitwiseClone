import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../store/comments";

function CommentsOfExpense () {
    const { expenseId } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getComments(expenseId))
    }, [])
    return (
        <div>
            <h1>all comments of expense</h1>
        </div>
    )
}


export default CommentsOfExpense;
