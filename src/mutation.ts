import { Context } from "./context";
import {floatArg, intArg, extendType, nonNull, stringArg, mutationField} from 'nexus';
import { objectType } from "nexus"
export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.boolean("test", {
      resolve: () => true
    })
  },
})


export const createMovie =  extendType({
  type: "Mutation",
  definition(t) {
    t.field("createMovie", {
      type: "Movie",
      description: "Creates a new Movie",
      args: {
    budget: nonNull(intArg()),
    original_language: nonNull(stringArg()),
    original_title: nonNull(stringArg()),
    overview: nonNull(stringArg()),
    popularity:nonNull(floatArg()),
    poster_path:nonNull(stringArg()),
    release_date:nonNull(stringArg()),
    revenue: nonNull(intArg()),
    runtime: nonNull(intArg()),
    status:nonNull(stringArg()),
  },
  resolve: async (_, args, ctx: Context) => {
            // the title and the poster path those have to be unique

    const newMovie =  await ctx.prisma.movie
   .create({
      data: {
        ...args
      }   });
    
    return newMovie
  },
});
},
});
export const addFavarite = mutationField('addFavarite', {
  type: 'Favorite',
  args: {
    movieId: nonNull(intArg()),
    userId: nonNull(stringArg()),
  },
  resolve: (_, {userId, movieId}, {prisma}) => {
return prisma.favorite.create({
    data:{
    movie:{connect:{id:movieId as number}},
    user:{connect:{id:userId as string}},
    refUserMovie:`${movieId}${userId}`
    },
    });
  }
});


export  const removeFavorite = extendType({
  type: "Mutation",
   definition(t) {
 t.field("RemoveFavorite", {
   type: "Favorite",
   description: "User removes a favorite",
  args: {
    id: nonNull(stringArg()),
  },
  resolve: (_, {id},  ctx: Context) => {
  return  ctx.prisma.favorite.delete({
      where:{id},
});
},
});
   }
});

