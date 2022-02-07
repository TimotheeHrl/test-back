import {
  makeSchema,
  asNexusMethod
} from 'nexus'
import { DateTimeResolver, BigIntResolver } from 'graphql-scalars'
import * as Query  from "./query";
import * as Mutation from "./mutation";
import * as Objects  from './objects';


export const DateTime = asNexusMethod(DateTimeResolver, 'date')
export const BigInt = asNexusMethod(BigIntResolver, 'bigint')

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Objects,
    DateTime,
    BigInt,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})