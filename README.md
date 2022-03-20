# radio.co_project

The commits are from d95703as because it is my school account and I did not want to constantly change between my personal account and school one, so I just used that one to commit to this project

# How to execute?

First, run below to install dependencies

```
npm install
```

This will install express,  mocha, supertest, request, bodyparser and so on.

Then, cd into src folder, and execute the index.js such as
```
node index.js
```

To run the tests, **go to root folder** and run
```
mocha test
```

**Note:** Above method of testing returns some unexpected results sometimes. I found it more convenient to use IDE run configurations. If the tests
return unexpected results, use PostMan desktop version to test the app and see how it behaves.

You will also need a mysql server running on your local machine with a database called radioco_db. This database name can be
changed in the ```src/index.js``` file. 

# What would I do different?

Because this was a small demo application, database connection and api endpoints are not secured. There is no authorisation
or authentication to send requests to API endpoints, which is essential for a production-level software. 

Also, I used MYSQL because I have experience using it, but different database choices, document based,
such as CouchDB could be considered. We store and return jSON data, so a jSON based document style database
couchDB could be a good choice.

Database I used also consists of one single table, storing everything, but considering we may get different types
of downloads from the front-end team, we may want to do some checking on the data we get for POST requests, and store them
in different tables, to maintain a cleaner and more accessible web page.

I tried to containerise the application using docker, but since I do not have experience using Docker,
I have failed. After spending 3-4 hours on docker tutorials, I could not succeed, and decided not to do it 
because I did not want to spend more time, but I learned basics and principles of Docker, so it was not a full
failure.

