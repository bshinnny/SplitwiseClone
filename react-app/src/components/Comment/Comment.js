import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments, createComment, removeComment } from "../../store/comments";
import UpdateComment from "./EditComment";
import './comment.css'

function CommentsOfExpense () {
    const { expenseId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    const comments = useSelector(state => Object.values(state.comment))
    const user = useSelector(state => Object.values(state.session)[0])

    useEffect(() => {
        dispatch(getComments(expenseId))
    }, [dispatch, expenseId])

    if (!comments) return null;

    const verifyUser = (comment) => {
        if (user.id === comment.user_id) {
            return (
                <span>
                    <UpdateComment comment={comment}/>
                    <button onClick={(e) => dispatch(removeComment(comment.id))}><i className="fa-solid fa-xmark"></i></button>
                </span>
            )
        }
        else {
            return (<></>)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            description,
        }

        const newComment = await dispatch(createComment(expenseId, payload))
        .catch(async (res) => {
        const data = await res.json();
        if (data && typeof data.errors === 'object') {
            setErrors(Object.values(data.errors))
        }
        if (data && (data.errors || data.message)) setErrors([data.errors? data.errors : data.message]);
        });

        if (newComment) {
            setErrors([])
            history.push(`/expenses/${expenseId}/comments`)
            setDescription('');
        }
    }

    return (
        <div>
            <label><i className="fa-regular fa-comment"></i>NOTES AND COMMENTS</label>
            <div>
                {comments.map(comment => (
                    <div key={comment.id} className="each-comment-container">
                        <div className="comment-detail">
                            <p>{comment.User?.first_name} {comment.User?.last_name[0]}. <span>{comment.date?.slice(0,16)}</span></p>
                            {/* <span>
                                <button><i className="fa-solid fa-pen"></i></button>
                                <button onClick={(e) => dispatch(removeComment(comment.id))}><i className="fa-solid fa-xmark"></i></button>
                            </span> */}
                            {verifyUser(comment)}
                        </div>
                        <p id='comment-description'>{comment.description}</p>
                    </div>
                ))}
            </div>
            <form className="post-comment" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <textarea
                    placeholder="Add a comment"
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required>
                </textarea>
                <label>
                    <button id='post-review-button' type='submit'>Post</button>
                </label>
            </form>
        </div>
    )
}


export default CommentsOfExpense;
