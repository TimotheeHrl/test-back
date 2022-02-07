import { Prisma } from "@prisma/client";
import { objectType, nonNull, intArg, stringArg ,extendType,list} from "nexus"
import { Context } from "./context";

import {  Movie } from 'nexus-prisma'


interface IgetUserFavorite {
  movie: {
      id: number;
      budget: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      revenue: number;
      runtime: number;
      status: string;
  };
}
export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('allMovies', {
      type: 'Movie',
      resolve: (_parent, _args, { prisma }) => {
        return prisma.movie.findMany()
      },
    })

    t.nullable.field('singleMovie', {
      type: 'Movie',
      args: {
        id: nonNull(intArg({ description: 'The id of the Movie' })),
      },
      resolve: (_, { id }, { prisma }) => {
        return prisma.movie.findUnique({
          where: { id },
        })
      },
    })
  }
})
export const AllUsersFavorite = objectType({
  name: 'AllUsersFavorite',
  definition(t) {
    t.nonNull.list.nonNull.field('allUsersFavorite', {
      type: 'Favorite',
      args: {
        userId: nonNull(stringArg({ description: 'User s id' })),
      },
      resolve: (_, {userId}, { prisma }) => {
        return   prisma.favorite.findMany({
          where: {userId:{equals:userId}},
          select:{movie:{select:{id:true,budget:true,status:true,overview:true,
            original_language:true,release_date:true,original_title:true
          ,popularity:true, poster_path:true,revenue:true,runtime:true}}}
           })  as any
      },
    })

  }
})

export const filterFavoriteMoviesByUser =  extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field('allUsersFavorite', {
      type: 'Favorite', 
  args: {
    userId: nonNull(stringArg()),
  },
  resolve: async   (_, {userId}, ctx:Context) => {
    const getUserFavorite = await ctx.prisma.favorite.findMany({
      where: {userId:{equals:userId}},
      select:{movie:{select:{id:true,budget:true,status:true,overview:true,
        original_language:true,release_date:true,original_title:true
      ,popularity:true, poster_path:true,revenue:true,runtime:true}}}
       }) 
    

    return   getUserFavorite as IgetUserFavorite[] | any
    
    
  },
});
},
}); 