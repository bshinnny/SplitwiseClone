## FRIENDS

### Get all FRIENDS

Returns all the friends of current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/friends/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Friends": [
        {
          "id": 1,
          "first_name": "John",
          "last_name": "Doe",
          "username": "johndoe",
          "nickname": "Johnny",
          "email": "john@doe.com",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
        }
      ]
    }
    ```

### Get details of Friend from id

Returns the details of a friend specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/friends/:friendId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "username": "johndoe",
      "nickname": "Johnny",
      "email": "john@doe.com",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "shared_expenses": [
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
        },
        {
          "id": 2,
          "description": "Chipotle",
          "user_id": 2,
          "group_id": 3,
          "recipient_id": 1,
          "amount": 8.50,
          "date": "2022-11-19 20:39:36",
          "notes": "Thanks",
          "status": "Pending"
        }
      ],
    }
    ```

* Error response: Couldn't find a Spot with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Spot couldn't be found",
      "statusCode": 404
    }
    ```

### Create a Friend

Creates and returns a new friend request.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/friends
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "john@doe.com",
      "user_id": 1,
      "friend_id": 2,
      "status": "pending",
      "date": "2022-12-07"
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "john@doe.com",
      "user_id": 1,
      "friend_id": 2,
      "status": "pending",
      "date": "2022-12-07",,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "email": "Email is required",
      }
    }
    ```

* Error Response: Email Not Found error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "email": "User with that email not found",
      }
    }
    ```
* Error Response: Friend Yourself error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "email": "Can't friend yourself",
      }
    }
    ```

### Delete a Friend

Deletes an existing Friend.

* Require Authentication: true
* Require proper authorization: Friend must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/friends/:friendId
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

* Error response: Couldn't find a Friend with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Friend couldn't be found",
      "statusCode": 404
    }
    ```
