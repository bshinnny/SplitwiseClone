import React from 'react'

const DeleteWarning = () => {
  return (
    <div>
        <p>Some of your expenses with this person also involve other third parties. As a result, deleting this friend will not delete those expenses, and they will still be visible from the "All expenses" screen. However, this friend should be removed from your list of friends successfully.</p>
        <button>Cancel</button>
        <button>Delete</button>
      
    </div>
  )
}

export default DeleteWarning
