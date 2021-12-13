# Plant Grub
[plantgrub.herokuapp.com](https://plantgrub.herokuapp.com/)
___
![homepage](public/images/home.png)
#### Requirements
___

* Have at least 2 models.
* Incorporate at least one API.
* Have complete RESTful routes for at least one of your resources with `GET`, `POST`, `PUT`, and `DELETE`.
* Utilize an ORM to create a database table structure and interact with your relationally-stored data.
* Include a readme file that explains how to use your app.
* Have semantically clean HTML, CSS, and back-end code.
* Be deployed online and accessible to the public.

#### Technologies Used
___
* HTML5
* CSS3
* Node
* PostgreSQL
* Sequelize

#### User Stories
___
Search for plant-based dining at its finest. No matter where you live or visit, you'll find places well worth checking out with this app.
* As a user, I want to...
    * be able to search local vegetarian or vegan restaurants
    * be able to save a restaurant to my profile
    * be able to delete a restaurant from my profile
    * be able to leave a comment or rating

#### Routes and Models
___

| Method | Path | Purpose |
| ------ | -------------- | -------------------------------- |
| GET | `/search` | search for restaurants |
| GET | `/search/results` | display a list of searched restaurants |
| POST | `/profile/:name` | save a restaurant to profile |
| GET | `/profile` | display saved restaurants |
| POST | `/review` | add a review |
| DELETE | `/:name` | delete a restaurant |
| PUT | `/review/:id` | update a review |

#### Entity Relationship Diagram<br>
___
![ERD](public/images/erd.png)
<br>

| Model | Schema | Associations |
| ------| -------| ----------------------------------------- |
| User| name, email, password | belongs to many restaurants and reviews|
| Restaurant | name, priceRange, phoneNumber, hours, address | belongs to many users and has many reviews|
| Review | rating, comments | belongs to users and restaurants |

#### API
____
Documenu is an API providing access to a database of over US 600,000 restaurants and their menus

API call
```
https://api.documenu.com/v2/restaurants/search/fields?cuisine=vegan, vegetarian&zip_code=80246
```
JSON response looks like this:
```
3:{12 items
"restaurant_name":"Garbanzo Mediterranean Fresh"
"restaurant_phone":"(303) 757-5900"
"restaurant_website":"http:///co/glendale/614531-garbanzo-mediterranean-fresh/"
"hours":""
"price_range":""
"price_range_num":0
"restaurant_id":39705341104940230
"cuisines":[1 item
0:""
]
"address":{...}5 items
"geo":{...}2 items
"menus":[]0 items
"last_updated":"2021-01-05T07:20:54.515Z"
}
```
#### Local Setup
If you'd like to run this application on your own local server:

1. Fork and clone this repository
2. Run `npm install` to install dependencies
3. Create a `.env` file and in that file
    * Set `SUPER_SECRET_SECRET` to a string
    * Obtain an API key from [Documenu](https://documenu.com/)
4. Run `sequelize db:migrate` to run migrations
5. Run `nodemon` to start this application
6. Go to localhost:3000 on your browser and create an account
7. Search for restaurants by zip code and selecting vegan or vegetarian
8. Click <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16">
  <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
</svg>  to save a restaurant to your profile

9. Saved restaurants will be noted with <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save-fill" viewBox="0 0 16 16">
  <path d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v7.793L4.854 6.646a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0-.708-.708L8.5 9.293V1.5z"/>
</svg>

10. Click <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg> to remove a restaurant from your profile

11. Click <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
</svg> to leave a review on a restaurant