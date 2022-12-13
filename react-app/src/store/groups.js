// Part of sidebar, need to coordinate.
const GET_ALL_USER_GROUPS = 'groups/GET_ALL_USER_GROUPS';
const GET_GROUP_MEMBERS = 'groups/GET_GROUP_MEMBERS';
const CREATE_A_GROUP = 'groups/CREATE_A_GROUP';

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

export const createAGroup = (group) => {
    return {
        type: CREATE_A_GROUP,
        group
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
        return response
    }
}

// export const createAGroupThunk = (group) => async dispatch => {
//     const { name, type, userId } = group;
//     const response = await fetch('api/groups' , {
//         method: "POST",
//         conten

//     })
// }

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
    groupMembers: {}
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
        default:
            return state;
    }
}
