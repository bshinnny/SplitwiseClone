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
                    <div key={comment.id} className="each-comment-container">
                        <div className="comment-detail">
                            <p>{comment.User?.first_name} {comment.User?.last_name[0]}. <span>{comment.date.slice(0,16)}</span></p>
                            <span>
                                <button><i className="fa-solid fa-pen"></i></button>
                                <button><i className="fa-solid fa-xmark"></i></button>
                            </span>
                        </div>
                        <p id='comment-description'>{comment.description}</p>
                    </div>
                ))}
            </div>
            <div className="post-comment">
                <textarea placeholder="Add a comment"></textarea>
                <label>
                    <button id='post-review-button'>Post</button>
                </label>
            </div>
        </div>
    )
}


export default CommentsOfExpense;
