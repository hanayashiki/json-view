# Design

## Authorization

1. The user generates a random string as token on its side, and saves it to the local storage.
2. The user associates the token in `Authorization: Token {token}` with each request.
3. The server takes the token as the unique identity of the user, creates a user if needed, and use that token to do authentication against resources.

## Models

1. User
   1. username
    2. token
    3. createdAt
    4. updatedAt
    5. files -> File[]

2. File
   1. id
   2. creator -> User
   3. createdAt
   4. updatedAt
   5. fileName
   6. content

