
## Bus Stop Locator Web

**Dependencies**
You need clone and install [bus-stop-locator-api](https://github.com/vondich/bus-stop-locator-api)

**Installation**
1. Clone repository
2. Update `src/services/Api/apiConstants.js` and set `API_BASE_URL` 
3. Run the following in your terminal
    ```
    $ cd bus-stop-locator-web
    $ npm install
    $ npm start
    ```

**TODO**
 1. Use a time picker for Register Bus Form instead of a plain text field
 2. It'd be better to add a map for the nearest bus stop
 3. There must be a better way to store auth tokens in a React.js app
 4. Add tests

**Usage**
1. Login using the following credentials:
    > Email: jdoe@gmail.com
    > Password: password

**Screenshots**
![Login Page](https://vondich-github.s3-ap-southeast-1.amazonaws.com/bus-stop-locator-web-login.png)
![Bus Stop Locator Page](https://vondich-github.s3-ap-southeast-1.amazonaws.com/bus-stop-locator-web-nearest.png)