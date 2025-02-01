# Quizzes
### A website featuring quizzes on various topics

## For a local development you need:

- Install git on your working machine (WM)
- Install docker on you WM
- Go to the directory where you need to install the project
- copy project from repository by command: 
  * `git clone https://github.com/Diablomania/QuizzesV2.git`
- Then go to the project directory and copy .env.example to .env
- In .env add variables:
  * `ADMIN_EMAIL=`
  *  `ADMIN_PASSWORD=`
- Then run command:
  * `docker-compose up -d --build`
- After building a images is done run command:
  * `docker exec -it quizzes_app php artisan key:generate`
- Restart docker:
  * `docker-compose down`
  * `docker-compose up -d`
- Congrats! Now you can locally get access to project from browser by `localhost:8080`. Use your `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env` for login to the site.
