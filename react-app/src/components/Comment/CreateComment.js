import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/comments";
import './comment.css'

function CreateComment () {
    const { expenseId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(createComment(expenseId))
    })

    return (
        <form>
            
        </form>
    )

}
