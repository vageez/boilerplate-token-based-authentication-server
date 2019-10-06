# boilerplate-token-based-authentication-server

> Express server 

> JWT authentication 

> Passport 
    > Strategies include authenticating a user 1. email, password or 2. a JWT Token

> Mongo DB data store 

> Successfull Signup `localhost:8090/signup` - returns token
    > Request POST `{ email, password }`
    > Response `{ token:  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZDk5MmNhYzRjY2VlMDAxNDNlMTc2MTIiLCJpYXQiOjE1NzAzMTk1MzI1MTN9.diegIs7t27xA7b9Yr65mEmRnHRqMD4TGvQFG3IqZDAs}`

> Successfull Signin `localhost:8090/signin` - returns token
    > Request POST `{ email, password }`
    > Response `{ token:  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZDk5MmNhYzRjY2VlMDAxNDNlMTc2MTIiLCJpYXQiOjE1NzAzMTk1MzI1MTN9.diegIs7t27xA7b9Yr65mEmRnHRqMD4TGvQFG3IqZDAs}`

### Local Development
#### > npm run docker