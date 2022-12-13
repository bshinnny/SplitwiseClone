import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../store/comments";
import './comment.css'

function CommentsOfExpense () {
    const { expenseId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getComments(expenseId))
    }, [])

    const comments = useSelector(state => Object.values(state.comment))
    if (!comments) return null;

    return (
        <div>
            <label><i className="fa-regular fa-comment"></i>NOTES AND COMMENTS</label>
            <div>
                {comments.map(comment => (
                    <div className="comment-detail">
                        <div>
                            <li>{comment.User?.first_name}.{comment.User?.last_name[0]}<span>{comment.date.slice(0,16)}</span></li>
                            <li>{comment.description}</li>
                        </div>
                        <button>Delete</button>
                    </div>
                ))}
            </div>
            <textarea placeholder="Add a comment"></textarea>
        </div>
    )
}


export default CommentsOfExpense;
