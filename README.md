
## Steps

- Add a User table to the database with a unique id, a name, and a list of favorite movies.
- Add mutations to add and remove movies from the user's favorite list.

ADD A MOVIE TO USER'S FAVORITE LISTE :

- Operation :

mutation AddFavarite($movieId: Int!, $userId: String!) {
  addFavarite(movieId: $movieId, userId: $userId) {
    id
  }
}
- Variable :

{
  "userId": "exemple UserId (string)",
  "movieId": 58
}

REMOVE MOVIE FROM USER'S FAVORITE LIST :
 - Operation :

mutation AddFavarite($removeFavoriteId: String!) {
  RemoveFavorite(id: $removeFavoriteId) {
    id
  }
}
 - Variable :
 {
  "removeFavoriteId": "favorite'id (string)"
 }

- Add a query to get the user's favorite movies.

 - Operation :


query Query($userId: String!) {
  allUsersFavorite(userId: $userId) {
    movie {
      original_title
      release_date
      original_language
    }
  }
}

 - Variable :
{
  "userId": "id of the user (string)"
}