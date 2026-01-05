import { SCHEMAS } from '@schema'
import z from 'zod'

import { forgeController, forgeRouter } from '@functions/routes'

const list = forgeController
  .query()
  .description({
    en: 'Get all todo priorities',
    ms: 'Dapatkan semua keutamaan tugasan',
    'zh-CN': '获取所有任务优先级',
    'zh-TW': '獲取所有任務優先級'
  })
  .input({})
  .callback(({ pb }) =>
    pb.getFullList.collection('todoList__priorities_aggregated').execute()
  )

const create = forgeController
  .mutation()
  .description({
    en: 'Create a new priority level',
    ms: 'Cipta tahap keutamaan baharu',
    'zh-CN': '创建新优先级',
    'zh-TW': '創建新優先級'
  })
  .input({
    body: SCHEMAS.todoList.priorities.schema
  })
  .statusCode(201)
  .callback(({ pb, body }) =>
    pb.create.collection('todoList__priorities').data(body).execute()
  )

const update = forgeController
  .mutation()
  .description({
    en: 'Update priority details',
    ms: 'Kemas kini butiran keutamaan',
    'zh-CN': '更新优先级详情',
    'zh-TW': '更新優先級詳情'
  })
  .input({
    query: z.object({
      id: z.string()
    }),
    body: SCHEMAS.todoList.priorities.schema
  })
  .existenceCheck('query', {
    id: 'todoList__priorities'
  })
  .callback(({ pb, query: { id }, body }) =>
    pb.update.collection('todoList__priorities').id(id).data(body).execute()
  )

const remove = forgeController
  .mutation()
  .description({
    en: 'Delete a priority level',
    ms: 'Padam tahap keutamaan',
    'zh-CN': '删除优先级',
    'zh-TW': '刪除優先級'
  })
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'todoList__priorities'
  })
  .statusCode(204)
  .callback(({ pb, query: { id } }) =>
    pb.delete.collection('todoList__priorities').id(id).execute()
  )

export default forgeRouter({
  list,
  create,
  update,
  remove
})
