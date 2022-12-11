## Expenses

### Get all of the Current User's Expenses

Return all of the current user's expenses

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/expenses/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Expenses": [
        {
          "id": 1,
          "description": "Good",
          "user_id": 1,
          "group_id": 3,
          "recipient_id": 2,
          "amount": 30.99,
          "date": null,
          "note": "thanks",
          "status": "Accepted",
          "Opposing_User": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe",
            "nickname": "Johnny",
            "email": "john@doe.com",
          },
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36"
        }
      ]
    }
    ```

### Get all Expenses for a Group based on the Group's id

Return all the expenses for a group based on the Group's id

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/groups/:groupId/expenses
  * Body: none

* Successful Response:
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Expenses": [
        {
          "id": 1,
          "description": "Good",
          "user_id": 1,
          "group_id": 3,
          "recipient_id": 2,
          "amount": 30.99,
          "date": null,
          "note": "thanks",
          "status": "Accepted",
          "User": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe",
            "nickname": "Johnny",
            "email": "john@doe.com",
          },
          "Recipient": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe",
            "nickname": "Johnny",
            "email": "john@doe.com",
          },
        }
      ]
    }
    ```

* Error response: Couldn't find a Group with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Group couldn't be found",
      "statusCode": 404
    }
    ```

### Create an Expense

Create and return a new expense

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/expenses/
  * Body:

    ```json
    {
        "description": "Good",
        "user_id": 1,
        "group_id": null,
        "recipient_id": 2,
        "amount": 30.99,
        "date": null,
        "note": null
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "id": 1,
        "description": "Good",
        "user_id": 1,
        "group_id": null,
        "recipient_id": 2,
        "amount": 30.99,
        "date": null,
        "note": null,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "description": "Description required",
        "amount": "Amount must be a number and is required",
      }
    }
    ```

* Error response: Couldn't find a User, Recipient or Group with given Id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User, Recipient, or Group not found.",
      "statusCode": 404
    }
    ```


### Edit an Expense

Update an exisitng expense.

* Require Authentication: true
* Require proper authorization: Expense must belong to the current user
* Request
  * Method: PUT
  * URL: /api/expenses/:expenseId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "description": "Good",
        "user_id": 1,
        "group_id": null,
        "recipient_id": 2,
        "amount": 30.99,
        "date": null,
        "note": null
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "id": 1,
        "description": "Good",
        "user_id": 1,
        "group_id": null,
        "recipient_id": 2,
        "amount": 30.99,
        "date": null,
        "note": null,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "description": "Description required",
        "amount": "Amount must be a number and is required",
      }
    }
    ```

* Error response: Couldn't find a User, Recipient or Group with given Id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User, Recipient, or Group not found.",
      "statusCode": 404
    }
    ```

### Delete an Expense

Delete an existing expense.

* Require Authentication: true
* Require proper authorization: Expense must have status "Pending"
* Request
  * Method: DELETE
  * URL: /api/expenses/:expenseId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find an Expense with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Expense couldn't be found",
      "statusCode": 404
    }
    ```

* Error response: Expenses that have been completed or declined can't be deleted
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Expenses that have been completed or declined can't be deleted",
      "statusCode": 403
    }
    ```


<!-- ### Create an Expense from a Group based on the Group's id ??? -->

<!-- ### Get all Shared Expenses Between Individuals given other User's id ???
