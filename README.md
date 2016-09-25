# WDA-Blog

##API Documentation
###Add Movie
* **URL**
```
POST /api/movie
```

* **Description**

This endpoint will write a new movie document into the movies collection in the 
mongoDB instance in mlab, this endpoint has schema validation so you will need to
input the required data


* **Parameters**

**Required**
```javascript
{
  "title":[String],
  "year":[Number]
}
```

* **Success Response**

*JSON* `{"success": true}`

* **Error Response**

*JSON* `{"success": false, "message": "Movie validation failed"}`

* **Sample Call**
```javascript
//to add a new movie
{
    "title": "Harry potter, and the man with the golden gun",
    "year": 2016
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