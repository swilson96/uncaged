# uncaged

## Dev Environment

Install node

Install dependencies:
```
$ npm install
```

Install and run a local mongoDB: https://docs.mongodb.org/manual/tutorial/install-mongodb-enterprise-on-windows/

Start the DB
```
$ gulp start-db
```

Run the app (server and webapps):
```
$ gulp
```

## Deploy

Currently deployed to heroku: https://uncaged.herokuapp.com/

To deploy to anohter heroku account for free, just create a new app, add mongolab (and any other apps of your choice e.g. papertrail), and push the code to heroku as usual.