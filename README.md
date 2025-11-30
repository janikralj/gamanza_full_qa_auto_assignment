# Gamanza Full QA Automation assignment info.
With docker, wordpress, mysql and playwright tests.

Steps to check:

1. Clone repo and install dependencies:
- npm install

2. To view wordpress page on browser:
- run -> "docker-compose up db wordpress"      # wordpress accessable on http://localhost:8080

3. To create QA post required for playwright tests (done by me, and than saved to sql, so post will be already there when using docker compose.)
- run -> "docker-compose up db wordpress"
- go to **http://localhost:8080** and setup wordpress, create admin user.
- login with created admin user and manually add new post with predefined title and description.
- after post is published execute creating mysqldump for creating wordpress.sql (which will be used for build) after manually creating post.

docker exec qa-db sh -c \
  "mysqldump -u root -prootpassword wordpress" > db/wordpress.sql

4. Running whole project with docker compose up (wordpress, mysql, and playwright)
- docker-compose up --build --abort-on-container-exit --exit-code-from tests
  
This does not pass, getting error:
'''
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://wordpress/
qa-playwright-tests  |     Call log:
qa-playwright-tests  |       - navigating to "http://wordpress/", waiting until "load"
'''



BUT we can run tests that we first make wordpress accessable with
- docker-compose up db wordpress
and than run tests with
- npx playwright test
