import z from 'zod'

import forge from '../forge'
import todoListSchemas from '../schema'

export const list = forge
  .query()
  .description('Get all todo tags')
  .input({})
  .callback(({ pb }) => pb.getFullList.collection('tags_aggregated').execute())

export const create = forge
  .mutation()
  .description('Create a new todo tag')
  .input({
    body: todoListSchemas.tags
  })
  .statusCode(201)
  .callback(({ pb, body }) => pb.create.collection('tags').data(body).execute())

export const update = forge
  .mutation()
  .description('Update todo tag details')
  .input({
    query: z.object({
      id: z.string()
    }),
    body: todoListSchemas.tags
  })
  .existenceCheck('query', {
    id: 'tags'
  })
  .callback(({ pb, query: { id }, body }) =>
    pb.update.collection('tags').id(id).data(body).execute()
  )

export const remove = forge
  .mutation()
  .description('Delete a todo tag')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'tags'
  })
  .statusCode(204)
  .callback(({ pb, query: { id } }) =>
    pb.delete.collection('tags').id(id).execute()
  )
