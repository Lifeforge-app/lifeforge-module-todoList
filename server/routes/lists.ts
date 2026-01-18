import z from 'zod'

import forge from '../forge'
import todoListSchemas from '../schema'

export const list = forge
  .query()
  .description('Get all todo lists')
  .input({})
  .callback(({ pb }) =>
    pb.getFullList.collection('lists_aggregated').sort(['name']).execute()
  )

export const create = forge
  .mutation()
  .description('Create a new todo list')
  .input({
    body: todoListSchemas.lists
  })
  .statusCode(201)
  .callback(({ pb, body }) =>
    pb.create.collection('lists').data(body).execute()
  )

export const update = forge
  .mutation()
  .description('Update todo list details')
  .input({
    query: z.object({
      id: z.string()
    }),
    body: todoListSchemas.lists
  })
  .existenceCheck('query', {
    id: 'lists'
  })
  .callback(({ pb, query: { id }, body }) =>
    pb.update.collection('lists').id(id).data(body).execute()
  )

export const remove = forge
  .mutation()
  .description('Delete a todo list')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'lists'
  })
  .statusCode(204)
  .callback(({ pb, query: { id } }) =>
    pb.delete.collection('lists').id(id).execute()
  )
