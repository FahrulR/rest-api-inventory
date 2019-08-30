# RESTful API Inventory
Restful API using Node js, Express and MySQL Database

----

![](https://miro.medium.com/max/365/1*d2zLEjERsrs1Rzk_95QU9A.png)

# File Structure

    - config
      - conn.js
    - controllers
      - category.js
      - controllers.js
      - products.js
    - helper
      - auth.js
    - node_modules
      - ... various modules that we install via `npm install` command ...
    - routes
      - category.js
      - products.js
      - routes.js
    - .env
    - .gitignore
    - README.md
    - app.js
    - package.json
    - package-lock.json
    - res.js

## Requirements

- Node.js
- MySQL
- Postman

## Installation
### Clone
```
$ git clone https://github.com/FahrulR/rest-api-inventory.git
```
### Install dependencies

To install dependencies enter project folder and run following command:

`npm install`

### Setting up database

Import sql file from /database/inventoryapp.sql to database


### Create Environment Variable
edit the .env.example to .env, then setup your configuration 

```
SERVER_PORT = YOUR-PORT

DB_HOST = "YOU-DB-HOST"
DB_USER = "YOUR-DB-USER"
DB_PASSWORD = "YOUR-DB-PASSWORD"
DB_NAME = "YOUR-DB-NAME"

JWT_SECRET = "YOUR-SECRET"
```

## To run server execute:

`node app.js`


## Documentation

## Products Routes

#### GET Request

 - "/products" => display all products, with default pagination {page:1, limit:10}. Query params:
    - search -> display all products with name that contains the keyword,
	- sortby -> its value is name of column you want to sort e.g -> sortBy=quantity (default id),
    - sort -> its filtering your ascending or descending (default asc),
	- page -> page to display (default 1),
	- limit -> number of products displayed in a page (default 10).

 - "/products/{id}" => display one product with the id specified by id parameter.

#### POST Request

 - "/products" => Inserting a product to database. data required = name, description, image, id_category, quantity, date_added, and date updated.
	- note = image is the url to the image, not the actual image.

#### PUT Request

 - "/products/{id}" => Updating a products in database. with the same data required as POST request.

#### PATCH Request

 - "/products/{id}/add={number}" => Adding a quantity data products. data required = id, and params number
 - "/products/{id}/reduce={number}" => Reducing a quantity data products. data required = id params number
 - note = can't reduce a quantity to less than 0 like -5, -10, etc

#### DELETE Request

 - "/products/{id}" => Deleting a products in database. data required = id.
 


## Category Routes

#### GET Request

 - "/category" => display all category.
 - "/category/{id}" => display one category with the id specified by id parameter.


#### POST Request

 - "/category" => Inserting a category to database. data required = name.


#### PUT Request

 - "/category/{id}" => Updating a category in database. data required = name.


#### DELETE Request

 - "/category/{id}" => Deleting a category in database. data required = id.


## Authorization
Before accessing POST, PUT, PATCH, and DELETE methods, you need to authorize token with JWT by login, after you got the token by login
go to headers then input the key = "Authorization" with value "Bearer -your token-" in postman
- "/login" => Login with your credientials to get the token. data required = email, password.
  
If you want to sign up or register
- "/register" => Register your credientials. data required = first_name, last_name, email, password

## The rest Routes

 - "/" => Displaying welcome home response
 - Exception like 403 forbidden, 404 not found, etc 
