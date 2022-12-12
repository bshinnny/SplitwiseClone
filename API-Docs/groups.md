## GROUPS

### Get all Groups of the Current User

Returns all the groups written by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/groups/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Groups": [
        {
          "id": 2,
          "name": "Party",
          "type": "Trip",
          },
        {
          "id": 3,
          "name": "Wedding",
          "type": "Home",
          },
      ]
    }
    ```

### Get all Group Members by a Group's id

Returns all the group members that belong to a group specified by id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/groups/:groupId/members
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Members": [
        {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe",
            "nickname": "Johnny",
            "email": "john@doe.com"
        },
        {
            "id": 2,
            "first_name": "Jane",
            "last_name": "Doe",
            "username": "janedoe",
            "nickname": "Jane",
            "email": "jane@doe.com"
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

### Get all Group Expenses by a Group's id

Returns all the group expenses that belong to a group specified by id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/groups/:groupId/expenses
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
          "description": "Panda Express",
          "user_id": 2,
          "group_id": 3,
          "recipient_id": 1,
          "amount": 5.50,
          "date": "2022-11-19 20:39:36",
          "notes": "Thanks",
          "status": "Accepted"
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

### Create a Group

Create and return a new group

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/groups/
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Amazing Group",
      "description": "This is an amazing group",
      "Members": [
        {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "username": "johndoe",
            "nickname": "Johnny",
            "email": "john@doe.com"
        }
      ]
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "Amazing Group",
      "description": "This is an amazing group",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
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
        "name": "Name is required",
        "description": "Description is required",
      }
    }
    ```

### Add User to Group

Add a user to a group specified by group's id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/groups/:groupId/members/
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user_id": 2,
      "group_id": 5,
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user_id": 1,
      "group_id": 1,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "message": "User successfully added to group"
    }
    ```

### Remove User from Group


Remove a user from a group specified by groupId

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/groups/:groupId/members/
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user_id": 1,
      "group_id": 5,
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User successfully deleted from group",
      "statusCode": 200
    }
    ```

### Add an Expense for a Group

Add a new expense to a group specified by groupId

* Require Authentication: true
* Require proper authorization: User must be part of the group
* Request
  * Method: POST
  * URL: /api/groups/:groupId/expenses
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user_id": 1,
      "group_id": 1,
      "recipient_id": 2,
      "description": "Dinner",
      "amount": 32.99,
      "notes": "Thanks for fronting the bill",
      "date": "2022-12-07",
      "status": "Pending"

    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Expense added",
      "user_id": 1,
      "group_id": 1,
      "recipient_id": 2,
      "description": "Dinner",
      "amount": 32.99,
      "notes": "Thanks for fronting the bill",
      "date": "2022-12-07",
      "status": "Pending"

    }
    ```

* Error response: Couldn't find a user in the group
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User couldn't be found in group",
      "statusCode": 404
    }
    ```

* Error response: "Logged in user not in group"
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Can not create expenses in this group",
      "statusCode": 403
    }
    ```

### Edit a Group

Update and return an existing Group

* Require Authentication: true
* Require proper authorization: User must be a part of the group
* Request
  * Method: PUT
  * URL: /api/groups/:groupsId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Amazing Group",
      "type": "Home"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully updated group.",
      "name": "Amazing Group",
      "type": "Home",
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
        "name": "Name is required",
        "description": "Description",
      }
    }
    ```

### Delete a Group

Delete an existing group.

* Require Authentication: true
* Require proper authorization: Group must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/groups/:groupId
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

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Group could not be found",
      "statusCode": 404
    }
    ```
