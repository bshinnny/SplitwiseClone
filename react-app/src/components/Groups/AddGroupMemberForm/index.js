import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as groupActions from '../../../store/groups';
import './AddGroupMemberForm.css'

function AddGroupMemberForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { groupId } = useParams();
    // console.log(groupId)

    const [memberEmail, setMemberEmail] = useState('');
    const [additionalEmails, setAdditionalEmails] = useState([])
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

    console.log('USERS ARRAY:', users)
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
        // console.log('DELETE', counter)
        setCounter(counter - 1)

    }

    const handleOnChange = (e) => {
        e.preventDefault();
        const emailsObj = {};
        emailsObj[e.target.className] = e.target.value;
        setAdditionalEmails({...additionalEmails, ...emailsObj})
        console.log('THESE ARE THE ADDITIONAL EMAILS:', additionalEmails)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const emailsArr = Object.values(additionalEmails);
        emailsArr.push(memberEmail)

        const errorsArr = [];

        for (let i = 0; i < emailsArr.length; i++) {
            if (!userEmailsArr.includes(emailsArr[i])) {
                errorsArr.push(`${emailsArr[i]} doesn't belong to any user.`)
            }
        }

        // Comment in after.
        // setErrors(errorsArr)

        // if (errors.length) {
        //     console.log(errors)
        //     return;
        // }

        // setErrors([])

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


        // if(additionalEmails.length > 0) {
        //     Object.values(additionalEmails).map((additionalEmail) => {
        //         dispatch(groupActions.addGroupMemberThunk(additionalEmail, groupId))
        //             .catch(
        //                 async (response) => {
        //                     const data = await response.json();
        //                     if(data && data.error) {
        //                         setErrors(data.error)
        //                     }
        //                 }
        //             )
        //     })
        // }

        // return dispatch(groupActions.addGroupMemberThunk(memberEmail, groupId))
        //     .then(() => {
        //         setMemberEmail('')
        //         history.push(`/groups/${groupId}`)
        //     })
        //     .catch(
        //         async (response) => {
        //             const data = await response.json();
        //             if(data && data.error) {
        //                 setErrors(data.error)
        //             }
        //         }
        //     )

    }

    return (
        <div className='add-group-member-form-div'>
            <form className='add-group-member-form' onSubmit={handleSubmit}>
                <ul className="errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className='grp-form-container'>
                    <input
                        type='email'
                        onChange={(e) => setMemberEmail(e.target.value)}
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
                            <button className= 'add-grp-delete-button' onClick={handleDeleteClick}>X</button>
                        </div>
                    )
                })}
                <button className= 'add-grp-submit-button' onClick={handleAddClick}>Add Additional Member</button>
                <button className= 'add-grp-submit-button' type='submit'>Submit Group Members</button>
            </form>
        </div>
    )

}

export default AddGroupMemberForm;
