# gamanza_full_qa_auto_assignment
Gamanza Full QA Automation assignment info.
With docker, wordpress, mysql and playwright tests.

1. Clone repo, then:
- npm install
- docker-compose up --build --abort-on-container-exit --exit-code-from tests

2. To just view wordpress page on browser:
- docker-compose up db wordpress
# wordpress accessable on http://localhost:8080

4. To create QA post required for playwright tests (done by me, and than saved to sql, so post will be already there.)
- run -> "docker-compose up db wordpress"
- go to "http://localhost:8080" and install wordpress. Create admin user. And than add manually new post with predefined title and description.
- than execute creating mysqldump for creating wordpress.sq after manually creating post.
"""
docker exec qa-db sh -c \
  "mysqldump -u root -prootpassword wordpress" > db/wordpress.sql
"""


5. Runing whole project with docker compose up (wordpress, mysql, and playwright) did not success. Playwright tests fails.
There is error.
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://wordpress/
qa-playwright-tests  |     Call log:
qa-playwright-tests  |       - navigating to "http://wordpress/", waiting until "load"


Running with command:
"""
docker-compose up --build --abort-on-container-exit --exit-code-from tests
"""


BUT we can run tests that we first make wordpress accessable with
- docker-compose up db wordpress
and than run tests with
- npx playwright test