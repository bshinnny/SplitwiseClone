import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as groupActions from '../../../store/groups';
import './AddGroupMemberForm.css'

function AddGroupMemberForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { groupId } = useParams();

    const [memberEmail, setMemberEmail] = useState('');
    const [additionalEmails, setAdditionalEmails] = useState({})
    const [counter, setCounter] = useState(0);
    const [errors, setErrors] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);

    // console.log('USERS ARRAY:', users)
    const userEmailsArr = [];
    for (const user of users) {
        userEmailsArr.push(user.email)
    }

    // console.log('USER EMAILS:', userEmailsArr)

    const handleAddClick = (e) => {
        e.preventDefault();
        // console.log('ADD', counter)
        setCounter(counter + 1)
    }

    const handleDeleteClick = (e) => {
        e.preventDefault();
        setAdditionalEmails({})
        // setCounter(counter - 1)
        setCounter(0)
    }

    const handleOnChange = (e) => {
        e.preventDefault();
        const emailsObj = {};
        emailsObj[e.target.className] = e.target.value;
        setAdditionalEmails({...additionalEmails, ...emailsObj})
        // console.log('THESE ARE THE ADDITIONAL EMAILS:', additionalEmails)
    }

    const handleMemberEmail = (e) => {
        e.preventDefault();
        setMemberEmail(e.target.value)
        // setAdditionalEmails({})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // setAdditionalEmails({})
        // setAdditionalEmails({...additionalEmails, firstEmail: memberEmail})

        const emailsArr = Object.values(additionalEmails);
        emailsArr.push(memberEmail);
        console.log('EMAILS:', emailsArr);

        const errors = [];

        for (let i = 0; i < emailsArr.length; i++) {
            if (!userEmailsArr.includes(emailsArr[i])) {
                errors.push(`${emailsArr[i]} doesn't belong to any user.`)
            }
        }

        // console.log('ERRORS ARRAY', errors)
        // Comment in after.
        setErrors(errors)

        if (errors.length) {
            return;
        }


        for (let i = 0; i < emailsArr.length; i++) {
            dispatch(groupActions.addGroupMemberThunk(emailsArr[i], groupId))
                .catch(
                    async (response) => {
                        const data = await response.json();
                        if(data && data.error) {
                            setErrors(data.error)
                        }
                    }
                )
        }

        setMemberEmail('')
        setAdditionalEmails({})
        dispatch(groupActions.getGroupMembersThunk(groupId))
        dispatch(groupActions.getGroupExpensesThunk(groupId))
        history.push(`/groups/${groupId}`)
    }

    return (
        <div className='add-group-member-form-div'>
            <form className='add-group-member-form' onSubmit={handleSubmit}>
                <h2>Add Group Members</h2>
                <ul className="errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className='grp-form-container'>
                    <input
                        type='email'
                        // onChange={(e) => setMemberEmail(e.target.value)}
                        onChange={handleMemberEmail}
                        value={memberEmail}
                        placeholder='Member Email'
                        required
                        className='input'
                    />
                </div>
                {[...Array(counter).keys()].map((num) => {
                    // console.log('RENDER', additionalEmails)
                    return (
                        <div key={`additional-email-${num}`} className='dynamic-form-container'>
                            <input
                                type='email'
                                onChange={handleOnChange}
                                key={`additional-email-${num}`}
                                // value={`additionalEmail-${num}`}
                                placeholder='Additional Member Email'
                                required
                                className={num}
                            />
                        </div>
                    )
                })}
                <button className= 'add-grp-submit-button' onClick={handleAddClick}>Add Additional Member</button>
                <button className= 'add-grp-delete-button' onClick={handleDeleteClick}>Delete Additional Member Emails</button>
                <button className= 'add-grp-submit-button' type='submit'>Submit Group Members</button>
            </form>
        </div>
    )

}

export default AddGroupMemberForm;
