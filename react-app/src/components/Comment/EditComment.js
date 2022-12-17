import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { updateComment } from "../../store/comments";
import './comment.css'

function UpdateComment ( {comment} ) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()

    const [description, setDescription] = useState(comment.description);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (description.length > 254){
            return setErrors(["Description must be less than 255 characters"])
        }

        if (description.trim().length === 0) {
            return setErrors(["Description should not contain only spaces"])
        }

        setShowModal(false)
        const payload = { description };

        return dispatch(updateComment(comment.id, payload))
        .catch(async (res) => {
        const data = await res.json();
        if (data && typeof data.errors === 'object') {
            setErrors(Object.values(data.errors))
        }
        if (data && (data.errors || data.message)) setErrors([data.errors? data.errors : data.message]);
        });

        // let updatedComment = await dispatch(updateComment(comment.id, payload))
        // if(updatedComment.errors) {
        //     await setErrors(updatedComment.errors)
        // }
        // else {
        //     setShowModal(false)
        // }

    }

    return (
        <>
          <button onClick={()=> setShowModal(true)}><i className="fa-solid fa-pen"></i></button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <div className="update-comment-container">
                <form className="update-comment" onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <textarea
                        placeholder={description}
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required>
                    </textarea>
                    <label>
                        <button id='update-review-button' type='submit'>Update</button>
                    </label>
                </form>
                </div>
            </Modal>
            )}
        </>
    )
}

export default UpdateComment;
