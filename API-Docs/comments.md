## Comments

### Get all Comments of Expense Given Expense Id

Returns all the comments of an expense given the expense id

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/expenses/:expenseId/comments
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Comments": [
        {
          "id": 1,
          "user_id": 1,
          "expense_id": 20,
          "description": "thanks buddy",
          "date": "2021-11-19",
          "email": "john@doe.com",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "User": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe",
            "nickname": "Johnny",
            "email": "john@doe.com",
          }
        },
      ]
    }
    ```


### Create a Comment

Create and return a new comment from an expense specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/expenses/:expenseId/comments
  * Body:

    ```json
    {
      "expense_id": 2,
      "description": "Great",
      "date": "2021-11-20"
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
      "user_id": 1,
      "expense_id": 20,
      "description": "thanks buddy",
      "date": "2021-11-19",
      "email": "john@doe.com",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "User": {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "username": "johndoe",
        "nickname": "Johnny",
        "email": "john@doe.com",
      }
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
        "description": "Description is required"
      }
    }
    ```

* Error response: Couldn't find an expense with the specified id
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

### Edit a Comment

Update and return an existing comment.

* Require Authentication: true
* Require proper authorization: Comment must belong to the current user
* Request
  * Method: PUT
  * URL: /api/comments/:commentId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "description": "This was an awesome expense!",
      "date": null,
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
      "user_id": 1,
      "expense_id": 1,
      "description": "This was an awesome expense!",
      "date": null,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 10:06:40"
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "description": "Description is required",
      }
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


### Delete a Comment

Delete an existing comment for an expense.

* Require Authentication: true
* Require proper authorization: Comment must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/comments/:commentId
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

* Error response: Couldn't find a comment with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Comment couldn't be found",
      "statusCode": 404
    }
    ```
