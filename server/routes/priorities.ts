import z from 'zod'

import forge from '../forge'
import todoListSchemas from '../schema'

export const list = forge
  .query()
  .description('Get all todo priorities')
  .input({})
  .callback(({ pb }) =>
    pb.getFullList.collection('priorities_aggregated').execute()
  )

export const create = forge
  .mutation()
  .description('Create a new priority level')
  .input({
    body: todoListSchemas.priorities
  })
  .statusCode(201)
  .callback(({ pb, body }) =>
    pb.create.collection('priorities').data(body).execute()
  )

export const update = forge
  .mutation()
  .description('Update priority details')
  .input({
    query: z.object({
      id: z.string()
    }),
    body: todoListSchemas.priorities
  })
  .existenceCheck('query', {
    id: 'priorities'
  })
  .callback(({ pb, query: { id }, body }) =>
    pb.update.collection('priorities').id(id).data(body).execute()
  )

export const remove = forge
  .mutation()
  .description('Delete a priority level')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'priorities'
  })
  .statusCode(204)
  .callback(({ pb, query: { id } }) =>
    pb.delete.collection('priorities').id(id).execute()
  )
