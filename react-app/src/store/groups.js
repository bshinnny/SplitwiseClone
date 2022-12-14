// Part of sidebar, need to coordinate.
const GET_ALL_USER_GROUPS = 'groups/GET_ALL_USER_GROUPS';
const GET_GROUP_MEMBERS = 'groups/GET_GROUP_MEMBERS';
const GET_GROUP_EXPENSES = 'groups/GET_GROUP_EXPENSES';
const GET_GROUP_DETAILS = 'groups/GET_GROUP_DETAILS';
const CREATE_A_GROUP = 'groups/CREATE_A_GROUP';
const ADD_GROUP_MEMBER = 'groups/ADD_GROUP_MEMBERS';
const DELETE_A_GROUP = 'groups/DELETE_A_GROUP';

// ACTIONS
export const getUserGroups = (groups) => {
    return {
        type: GET_ALL_USER_GROUPS,
        groups
    }
}

export const getGroupMembers = (members) => {
    return {
        type: GET_GROUP_MEMBERS,
        members
    }
}

export const getGroupExpenses = (expenses) => {
    return {
        type: GET_GROUP_EXPENSES,
        expenses
    }
}

export const getGroupDetails = (group) => {
    return {
        type: GET_GROUP_DETAILS,
        group
    }
}

export const createAGroup = (group) => {
    return {
        type: CREATE_A_GROUP,
        group
    }
}

// export const addGroupMember = (member) => {
//     return {
//         type: ADD_GROUP_MEMBER,
//         member
//     }
// }

export const deleteAGroup = (groupId) => {
    return {
        type: DELETE_A_GROUP,
        groupId
    }
}

// THUNKS
export const getUserGroupsThunk = () => async dispatch => {
    const response = await fetch('/api/groups/current');

    if (response.ok) {
        const groups = await response.json();
        dispatch(getUserGroups(groups));
        return response;
    }
}

export const getGroupMembersThunk = (groupId) => async dispatch => {
    const response = await fetch(`/api/groups/${groupId}/members`)
    if (response.ok) {
        const members = await response.json();
        dispatch(getGroupMembers(members));
        return response;
    }
}

export const getGroupExpensesThunk = (groupId) => async dispatch => {
    const response = await fetch(`/api/groups/${groupId}/expenses`)
    if (response.ok) {
        const expenses = await response.json();
        dispatch(getGroupExpenses(expenses));
        return response;
    }
}

export const getGroupDetailsThunk = (groupId) => async dispatch => {
    const response = await fetch(`/api/groups/${groupId}`)
    if (response.ok) {
        const group = await response.json();
        dispatch(getGroupDetails(group));
        return response;
    }
}

export const createAGroupThunk = (group) => async dispatch => {
    const { memberEmail, ...newGroup } = group;
    const response = await fetch(`/api/groups`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newGroup)
    })

    if (response.ok) {
        const group = await response.json();
        const userGroup = await fetch(`/api/groups/${group.id}/members`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(memberEmail)
        })
        dispatch(createAGroup(group))
        return group;
    }
}

// export const addGroupMemberThunk = () => async dispatch => {
//     const response = await fetch(`/api/groups`, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(group)
//     })

//     if (response.ok) {
//         const group = await response.json();
//         dispatch(createAGroup(group))
//         return group;
//     }
// }

export const deleteAGroupThunk = (groupId) => async dispatch => {
    const response = await fetch(`/api/groups/${groupId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        // console.log('Deleted spot from database.')
        dispatch(deleteAGroup(groupId))
    }
}

// Format initial data.
const formatData = (array) => {
    const object = {};
    array.forEach(item => {
        object[item.id] = item;
    });
    return object;
}

// REDUCER
const initialState = {
    userGroups: {},
    groupDetails: {},
    groupMembers: {},
    groupExpenses: {}
}

export default function groupsReducer(state = initialState, action) {
    let newState = {...state}
    switch(action.type) {
        case GET_ALL_USER_GROUPS:
            const groupsArr = action.groups.Groups;
            const groupsObj = formatData(groupsArr);
            newState = {...state, userGroups: groupsObj}
            return newState;
        case GET_GROUP_MEMBERS:
            const membersArr = action.members.Members;
            const membersObj = formatData(membersArr);
            newState = {...state, groupMembers: membersObj}
            return newState;
        case GET_GROUP_EXPENSES:
            const expensesArr = action.expenses.Expenses;
            const expensesObj = formatData(expensesArr);
            newState = {...state, groupExpenses: expensesObj}
            return newState;
        case GET_GROUP_DETAILS:
            const groupDetails = action.group;
            newState = {...state, groupDetails}
            return newState;
        case CREATE_A_GROUP:
            newState = {...state, userGroups: {...state.userGroups}};
            newState.userGroups[action.group.id] = action.group;
            return newState;
        case DELETE_A_GROUP:
            newState = {...state, userGroups: {...state.userGroups}};
            delete newState.userGroups[action.groupId];
            return newState
        default:
            return state;
    }
}
