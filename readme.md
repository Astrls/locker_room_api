# Locker Room Api

### Context
This api was a project for a dev bootcamp at BeCode. The goal was to create the backend of a discussion platform with user authentication and authorization, and restrict route access to different profiles.

### Purpose of the app
Discussion platform to mimic locker room talk 

### Notes
This app uses JSON Web Token for auth, the token secret is stored in a .env file absent from this repo. You will need to create your own secret and .env file to recreate the API.

The PostgreSQL db is hosted locally, and the credentials are not secured at the moment.

### Next steps
- Refactor code
- Host DB online and secure access
- Deploy API online
- reorganise backend routes with controllers and routers


---

## Tech stack
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
