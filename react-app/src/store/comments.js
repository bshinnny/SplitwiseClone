const LOAD = 'comments/GET'
const CREATE = 'comments/CREATE'
const UPDATE = 'comments/UPDATE'
const REMOVE = 'comments/REMOVE'

const load = (comments) => ({
    type: LOAD,
    comments
})

const create = (comment) => ({
    type: CREATE,
    comment
})

const update = (comment) => ({
    type: UPDATE,
    comment
})

const remove = (commentId) => ({
    type: REMOVE,
    commentId
})


//thunk action creators
export const getComments = (expenseId) => async dispatch => {
    const response = await fetch(`/api/expenses/${expenseId}/comments`);
    if (response.ok) {
        const comments = await response.json();
        dispatch(load(comments.Comments))
    }
};

export const createComment = (expenseId, payload) => async dispatch => {
    const response = await fetch(`/api/expenses/${expenseId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const comment = await response.json();
        dispatch(create(comment));
        return comment
    }
};

export const updateComment = (commentId, payload) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const comment = await response.json();
        dispatch(update(comment));
        return comment
    }
}

export const removeComment = (commentId) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(remove(commentId))
    }
}


//reducers
const commentsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            let newState = {};
            action.comments.forEach(comment => newState[comment.id] = comment);
            return newState;
        case CREATE:
            return Object.assign({...state}, {[action.comment.id]: action.comment})
        case UPDATE:
            const updateObj = Object.assign({...state}, {[action.comment.id]: action.comment});
            return updateObj
        case REMOVE:
            let newOne = {...state}
            delete newOne[action.commentId]
            return newOne;
        default:
            return state;
    }
}

export default commentsReducer;
