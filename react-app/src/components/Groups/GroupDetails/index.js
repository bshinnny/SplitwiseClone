import { useEffect } from 'react';
import * as groupActions from '../../../store/groups';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function GroupDetails() {
    const dispatch = useDispatch();
    const { groupId } = useParams();

    useEffect(() => {
        dispatch(groupActions.getGroupMembersThunk(groupId))
    }, [dispatch, groupId])

    useEffect(() => {
        dispatch(groupActions.getGroupExpensesThunk(groupId))
    }, [dispatch, groupId])

    useEffect(() => {
        dispatch(groupActions.getGroupDetailsThunk(groupId))
    }, [dispatch, groupId])


    const members = useSelector(state => state.groups.groupMembers)
    const expenses = useSelector(state => state.groups.groupExpenses)
    const group = useSelector(state => state.groups.groupDetails)
    // console.log(members)
    // console.log(expenses)

    return (
        <div className='group-details-div'>
            <h1>{group.name}</h1>
            <div className='group-members-div'>
                <h2>Group Members</h2>
                {Object.values(members).map((member) => {
                    return (
                        <div key={`member-${member.id}`}>{member.first_name}</div>
                    )
                })}
            </div>
            <div className='group-expenses-div'>
                <h2>Group Expenses</h2>
                {Object.values(expenses).map((expense) => {
                    return (
                        <div key={`group-expense-${expense.id}`}>
                            <div className='group-expense'>
                                <div className='group-expense-recipient'>
                                    {`You lent ${expense.Recipient.first_name}:`}
                                </div>
                                <div className='group-expense-amount'>
                                    {`$${expense.amount}`}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GroupDetails
