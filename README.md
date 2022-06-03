# Site Wide Warning

All web applications experience catastrophic failures at some point or another. For example, if the "Post" feature suddenly stopped working on Facebook, that's considered a catastrophic failure, and users should get some kind of a warning or notification that their posts might not get successfully created. This could either happen automatically, or administrators of Facebook should have access to an admin console where they can choose to broadcast a warning to all users of Facebook that are being affected.

## Stack
**Database**: MongoDB

**Web Server**: Node.js, Express.js, Apollo Server, Mongoose.js

**Web App Client**: React.js, Recoil.js, Apollo Client

## Set up for local development

To begin setting up this app, you'll need to have docker compose installed locally 
- [Docker Compose](https://docs.docker.com/compose/install/)

After you've cloned this project repo, run 
```
docker-compose up --build
```

This spins up a GraphQL playground at [http://localhost:8000/](http://localhost:8000/), and the app at [http://localhost:3000/](http://localhost:3000/).  
From the GraphQL playground, seed some users (follow the instructions below).  
Your dev environment is now ready! 🚀 


## Seed Users Data
You'll need to create a couple (at least 2) users in your database first.
The User schema, Query, and Mutation endpoints have already been given to you.
To run a user creation mutation call, include this in the main query window in [http://localhost:8000](http://localhost:8000):
```
mutation CreateUser($user: CreateOneUserInput!){
  userCreateOne(record: $user) {
    record {
      firstName
      lastName
      email
    }
  }
}
```

Then, add user details in the Query Variables window (you can use whatever name and email you want):
```
{
  "user": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@smith.com"
  }
}
```

The response should look something like: 
```
{
  "data": {
    "userCreateOne": {
      "record": {
        "firstName": "John",
        "lastName": "Smith",
        "email": "john@smith.com"
      }
    }
  }
}
```

Now, when you run a query to get users:
```
query {
  userCount
  userMany(limit: 10) {
    firstName
    lastName
    email
  }
}
```
you should see a response that looks like:
```
{
  "data": {
    "userCount": 1,
    "userMany": [
      {
        "firstName": "John",
        "lastName": "Smith",
        "email": "john@smith.com"
      }
    ]
  }
}
```
Now, when you open the app on the browser, click on the "Change Users" menu item in the top right, you should see the users you created in that list.

## Resources

Node.js: https://nodejs.org/en/

Express.js: https://expressjs.com/

Apollo Server: https://www.apollographql.com/docs/apollo-server/

MongoDB: https://docs.mongodb.com/manual/introduction/

Mongoose: https://mongoosejs.com/docs/

React Hooks: https://reactjs.org/docs/hooks-intro.html

Recoil.js: https://recoiljs.org/

Apollo Client: https://www.apollographql.com/docs/react/
