import {list, objectType } from "nexus";
import {Movie  as NexusMovie, User as NexusUser, Favorite as NexusFavorite } from 'nexus-prisma'


export const Movie = objectType({
  name: NexusMovie.$name,
  description: NexusMovie.$description, 
  definition(t) {
    t.field(NexusMovie.id);
    t.field(NexusMovie.budget);
    t.field(NexusMovie.original_language);
    t.field(NexusMovie.original_title);
    t.field(NexusMovie.overview);
    t.field(NexusMovie.popularity);
    t.field(NexusMovie.poster_path);
    t.field(NexusMovie.release_date);
    t.field(NexusMovie.revenue);
    t.field(NexusMovie.runtime);
    t.field(NexusMovie.status);
    t.field("favorites", {type: list(Favorite)});

  },
})
export const User = objectType({
  name: NexusUser.$name,
  description: NexusUser.$description, 
  definition(t) {
    t.field(NexusUser.id);
    t.field(NexusUser.name);
    t.field("favoriteMovies", {type: list(Favorite)});


  },
})
export const Favorite = objectType({
  name: NexusFavorite.$name,
  description: NexusFavorite.$description, 
  definition(t) {
    t.field(NexusFavorite.id);
    t.field(NexusFavorite.movieId);
    t.field(NexusFavorite.userId);
    t.field("movie", {type: Movie});
  },
})
