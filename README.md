![logo](./react-app/src/assets/logo.png)
# Smartsplit

## What's this?
Smartsplit is a full-stack clone project that is originally cloned from Splitwise. It helps users to add expenses and split their bills among friends and groups. This project aims for developers to practice using different technologies and build their web application from scratch.

Live site: https://smart-split-group.onrender.com/


## Languages and technology of Development
- Frontend: React, Redux , JavaScript
- Backend: Flask, SQLALchemy, Python
- Database: SQLite(local), PostgreSQL(live site)



## How to launch the full application locally
1. Clone this repository

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This folder organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## Project Showcase
Home page
![Home page 1](./react-app/src/assets/home1.png)

Home page1
![Home page 2](./react-app/src/assets/home.png)

Login page
![Login page](./react-app/src/assets/loginpage.png)

dashboard page
![dashboard page](./react-app/src/assets/dashboard1.png)
