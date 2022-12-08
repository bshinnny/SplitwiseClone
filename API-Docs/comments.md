## Comments

### Get all Comments of Expense Given Expense Id ???

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


### Create a Comment ???

Create and return a new booking from a spot specified by id.

* Require Authentication: true
* Require proper authorization: Spot must NOT belong to the current user
* Request
  * Method: POST
  * URL: /api/spots/:spotId/bookings
  * Body:

    ```json
    {
      "startDate": "2021-11-19",
      "endDate": "2021-11-20"
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
      "spotId": 1,
      "userId": 2,
      "startDate": "2021-11-19",
      "endDate": "2021-11-20",
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
        "endDate": "endDate cannot be on or before startDate"
      }
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

### Edit a Comment ???

Update and return an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: PUT
  * URL: /api/reviews/:reviewId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review": "This was an awesome spot!",
      "stars": 5,
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
      "userId": 1,
      "spotId": 1,
      "review": "This was an awesome spot!",
      "stars": 5,
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
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
      }
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found",
      "statusCode": 404
    }
    ```


### Delete a Comment ???

Delete an existing image for a Spot.

* Require Authentication: true
* Require proper authorization: Spot must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/spot-images/:imageId
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

* Error response: Couldn't find a Spot Image with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Spot Image couldn't be found",
      "statusCode": 404
    }
    ```
