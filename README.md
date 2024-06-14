# auth_api
## about

## start server
`npm start`

## APIV1

### Routes
- index
localhost:9090/


- users

PROTECT ROUTES
==================================================
GET '/'
requires: auth token, admin authorization
200 {success: True, msg: [all users]}

GET '/:id'
requires: auth token, admin authorization
200 {success: True, msg: [user:id]}
---------------------------------------------------
POST '/'
body {userObject}
200 {success: True, msg: [user]}

POST '/login'
body {username: string, password: string}
200 {success: True, msg: [authToken]}

POST '/reset'

