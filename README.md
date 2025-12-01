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

ISSUES:
While running the tests inside Docker, I encountered the more following issue:
1. Issue -> Error: page.goto: net::ERR_CONNECTION_REFUSED at http://wordpress/
Resolution for this was that i changed BASE_URL from "http://wordpress/" to "http://host.docker.internal:8080/" inside "docker-compose.yml" for tests service.

2. But after that when test on home page clicks on post to open it, i get error that elements are not visible. With investigating i found out its because it does not open proper URL. It lands on "chrome-error://chromewebdata/" url, which is not correct. Attribute "href" of that post element on home page is "http://localhost:8080/?p=6", and it should be as "http://host.docker.internal:8080/?p=6". I tried to resolve this problem, but I wasn’t able to fix it.
I attached image of failing when running tests inside docker (docker_fail.png), and image when it passes running locally when db and wordpress are up (locally.png)​
(just to see if url "http://host.docker.internal:8080/?p=6" should work, for debugging i modified tests that instead of clicking on post, we just navigate to "http://host.docker.internal:8080/?p=6", and than tests passed. I was not able to find proper solution for this href attribute.
​

However, the tests can still be executed successfully if you run them locally when db and wordpress are up with docker. Run:
- docker-compose up db wordpress
  
and then execute the tests with:
- npx playwright test
