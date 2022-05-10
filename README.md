# Very Simple REST API 

Just trying to learn a bit more about how rest api works with node.js.

# How to execute?

If for some reason you want to clone and run this, first, run below to install dependencies

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

