# Spaced repetition API!

Here's the backend which serves my [Spaced Repetition Application](https://langly.vercel.app)! The backend manages endpoints that use GET, POST and DELETE CRUD methods. You can learn more about the Front End code [here](https://github.com/cabejackson/spaced-repetition)

<!-- ## Table of Contents -->

<!-- - [Demo Account](#Demo-Account)
- [Storytime](#Storytime)
- [Quick App Demo](#Quick-App-Demo) -->
<!-- - [Endpoints](#A-More-Detailed-Look)
- [Tech Stack](#Tech-Stack)
  - [Front End](#Front-End)
  - [Testing](#Testing)
  - [Production](#Production)
- [Getting Started](#Getting-Started)
  - [Server Setup](#Server-Setup)
- [Upcoming Features](#Upcoming-Features)
- [About Me](#About-Me)
  - [GitHub Profile](https://github.com/cabejackson)
  - [LinkedIn](https://www.linkedin.com/in/caleb-jackson-cabe/)
- [Special Thanks](#Special-Thanks) -->

## API Documentation

### All Endpoints

-- /api/auth/token
-- /api/language/head
-- /api/language/guess
-- /api/user

### JWT Auth

- `POST` request made to `/api/auth/token`
  (responsible for logging in users)

* The body of the request consists of:

```
{
  username: '',
  password: ''
}
```

### Additional Endpoints

(e.g. registering, guessing translations, viewing saved stats)

- `POST` request made to `/api/user`

* The body of the request consists of:

```
{
    "name": " ",
    "username": " ", // requires a unique username, so other users cannot already have that username
    "password": " " // requires 1 uppercase, 1 lowercase, 1 special character and a number
}
```

<!-- - `POST` request made to `/api/language/guess`

* The body of the request consists of:

````
{
    "tbr_number": " ",
    "timeframe": " ",
    "reading_goals": " ",
    "bnb_users_id": " ", // required
}
``` -->

<!-- - - `POST` request made to `/api/language`

* The headers of the request consists of:

````

         headers: {
                    "content-type": "application/json",
                    'Authorization': `bearer ${TokenService.getCredentials().tokenKey}`, //clientside code used to retrieve the userId

                }

````-->

## Tech Stack

### Back End

- Node and Express
  - Authentication using JWT
  - RESTful Api
- HTML5
- CSS3

### Testing

- Supertest (integration)
- Mocha and Chai (unit)

### Database

- Postgres
- Knex.js - SQL wrapper

### Production

- Deployed via Heroku

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

<!--

## Local dev setup

If using user `dunder-mifflin`:

```bash
mv example.env .env
createdb -U dunder_mifflin spaced-repetition
createdb -U dunder_mifflin spaced-repetition-test
````

If your `dunder-mifflin` user has a password be sure to set it in `.env` for all appropriate fields. Or if using a different user, update appropriately.

```bash
npm install
npm run migrate
env MIGRATION_DB_NAME=spaced-repetition-test npm run migrate
```

And `npm test` should work at this point

## Configuring Postgres

For tests involving time to run properly, configure your Postgres database to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   1. E.g. for an OS X, Homebrew install: `/usr/local/var/postgres/postgresql.conf`
   2. E.g. on Windows, _maybe_: `C:\Program Files\PostgreSQL\11.2\data\postgresql.conf`
   3. E.g on Ubuntu 18.04 probably: '/etc/postgresql/10/main/postgresql.conf'
2. Find the `timezone` line and set it to `UTC`:

```conf
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests mode `npm test`

Run the migrations up `npm run migrate`

Run the migrations down `npm run migrate -- 0` -->
