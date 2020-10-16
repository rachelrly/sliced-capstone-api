# Sliced API

Sliced allows you to save your recipes and scale the ingredients up or down by 1/4 increments.

This repository is for the back-end API.

Live version: https://sliced.rachanastasia.vercel.app/

client repo: https://github.com/Rachanastasia/sliced-client

## Images

![](sliced-home.png)

![](sliced-login.png)

![](recipe-scale-up.png)

![](recipe-scale-down.png)

![](recipe-list.png)

![](add-recipe.png)

## Tech Stack

### Back End

- Node with Express
- PostgreSQL database

### Testing

- Mocha
- Chai
- Supertest

### Production

- Deployed with Heroku

## Codebase Structure

### /migrations

SQL files that build three tables in the database--'users', 'user_recipes', 'recipe_ingredients'

### /src/app.js

Establishes /api/recipes, /api/auth, and /api/user routes.

### /src/auth

Contains router and service file for /api/auth endpoint.

### /src/users

Contains router and service file for /api/users endpoint.

### /src/recipes

Contains a router, a recipe service file, and an ingredients service file for /api/recipes endpoint.

### /src/middleware

Validates JWT, working with auth-service.js

### /test

Contains a file for each endpoint with tests for each method written for that endpoint
