import { forgeController, forgeRouter } from '@functions/routes'
import { SCHEMAS } from '@schema'
import z from 'zod'

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
    pb.getFullList.collection('todo_list__priorities_aggregated').execute()
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
    body: SCHEMAS.todo_list.priorities.schema
  })
  .statusCode(201)
  .callback(({ pb, body }) =>
    pb.create.collection('todo_list__priorities').data(body).execute()
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
    body: SCHEMAS.todo_list.priorities.schema
  })
  .existenceCheck('query', {
    id: 'todo_list__priorities'
  })
  .callback(({ pb, query: { id }, body }) =>
    pb.update.collection('todo_list__priorities').id(id).data(body).execute()
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
    id: 'todo_list__priorities'
  })
  .statusCode(204)
  .callback(({ pb, query: { id } }) =>
    pb.delete.collection('todo_list__priorities').id(id).execute()
  )

export default forgeRouter({
  list,
  create,
  update,
  remove
})
