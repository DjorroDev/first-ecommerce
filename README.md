# Submission e commerce

## tech stack

Express, sqlite, react, redux rtk query
For UI using shadcn/ui

With ui framework I manage to make the website work on mobile version (up to around 450px width)

## Install

install to both frontend & backend

```
cd /backend
npm i
```

```
cd /frontend
npm i
```

## env

just copy paste the env.example. It's just the JWT and `BASE_URL` for image

## seeding

For the sake of easy reviewing and QoL. I put command to seed the database with dummy data

```
> npm run seed
Dropping table and reset it...
Seeding database...
User admin added with ID 1
User Djorro added with ID 2
User Birdie_Ullrich added with ID 3
User Kristian94 added with ID 4
User Breanna27 added with ID 5
User Verlie.Homenick added with ID 6
User Cristobal_Lang26 added with ID 7
```

### note:

The seed consist of manual and randomize data. Here's the manual data that can be use.

```
user {
    name: "Admin"
    email:"admin@example.com",
    username:"admin",
    password:"admin",
    isAdmin: true,
    isSeller: true,
}

user {
    name: "Djorro"
    email:"djorro@example.com",
    username:"djorro",
    password:"pass",
    isAdmin: false,
    isSeller: true,
}
```

The rest of data are randomize. You can login to random user with the password: "userpass" and the username shows in console when seeding in process. Note: Some data won't work properly like calculation total

by default the table will be wiped first before seeding process. You can edit it in `backend/database/seeder.js` on the last line.

```js
// Comment this if dont want wipe the db every run
dropAndRecreateTables();

seedDatabase();
```

## Start the web

```
> cd backend/
> npm run serve
```

```
> cd frontend/
> npm run dev
```

### Note:

it never tested in cloud environment. Already tested local.

## Last word

It's so much fun doing the bounty but I can tell there's a lot of things to improve. I just managed to do the neccesary for the criteria. Maybe I will continue this later on.
