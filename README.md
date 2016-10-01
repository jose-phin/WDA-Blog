# WDA-Blog

##API Documentation

###List of URLs
```
\
```
Will show all the movies and all the movie information are accessible

```
\<movie-title>
```
The blog section which contains a single movie's information
and a commenting system.

Sending the form will create a POST request and will redirect you back to the page and the newly added comment will be shown.

###Add Movie
* **URL**
```
POST /api/movie
```

* **Description**

This endpoint needs an OMDB ID of the movie. Since we are not going to be getting data from OMDB again and again, I hardcoded the ID's as an example.

To add, make a post request with `omdbId` variable

* **example**
```
{omdbId : "tt0435761"}
```
###DB Schema
The data that can be accessed in the front end (p.s. I spelled writer wrong and I will never change it)

```
{
    title: String,
    year: Number,
    rating: String,
    releaseDate: String,
    runtTime: String,
    genre: String,
    director: String,
    writter: String,
    actors: String,
    plot: String,
    poster: String,
    imdbID: String,
    imdbRating: Number,
    comments :
        [{
            username: String,
            comment: String
            date: Date
            }]
}
```


###Search for movie by title
* **URL**
```
GET /api/movie/<title name>
```

* **Description**

This endpoint will search the movies collection in the mongoDb instance in mLabs
for the title of the movie that the user requests.

**important - You will need to run encodeUriComponent on the title so that
the title can be read by the endpoint**

```javascript
//The title name
var title = "Harry potter, and the man with the golden gun";

//run it through encodeUriComponent
var encodedTitle = encodeURIComponent("Harry potter, and the man with the golden gun");

console.log(encodedTitle);
//Will output "Harry%20potter%2C%20and%20the%20man%20with%20the%20golden%20gun"

```

* **Success Response**

*JSON* `{"success": true, movies: [Array]}`

* **Error Response**

*JSON* `{"success": false, "message": "Connection to Database Lost"}`

* **Sample Call**
```javascript
//to get "Harry potter, and the man with the golden gun"
GET http://localhost:3000/api/movie/Harry%20potter%2C%20and%20the%20man%20with%20the%20golden%20gun
```
