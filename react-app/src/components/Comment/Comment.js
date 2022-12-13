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
    const comments = useSelector(state => state.comment)
    return (
        <div>
            <label><i className="fa-regular fa-comment"></i>NOTES AND COMMENTS</label>
            <div>

            </div>
            <textarea placeholder="Add a comment"></textarea>
        </div>
    )
}


export default CommentsOfExpense;
