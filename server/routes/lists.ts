import { SCHEMAS } from '@schema'
import z from 'zod'

import { forgeController, forgeRouter } from '@functions/routes'

const list = forgeController
  .query()
  .description({
    en: 'Get all todo lists',
    ms: 'Dapatkan semua senarai tugasan',
    'zh-CN': '获取所有任务列表',
    'zh-TW': '獲取所有任務清單'
  })
  .input({})
  .callback(({ pb }) =>
    pb.getFullList
      .collection('todoList__lists_aggregated')
      .sort(['name'])
      .execute()
  )

const create = forgeController
  .mutation()
  .description({
    en: 'Create a new todo list',
    ms: 'Cipta senarai tugasan baharu',
    'zh-CN': '创建新任务列表',
    'zh-TW': '創建新任務清單'
  })
  .input({
    body: SCHEMAS.todoList.lists.schema
  })
  .statusCode(201)
  .callback(({ pb, body }) =>
    pb.create.collection('todoList__lists').data(body).execute()
  )

const update = forgeController
  .mutation()
  .description({
    en: 'Update todo list details',
    ms: 'Kemas kini butiran senarai tugasan',
    'zh-CN': '更新任务列表详情',
    'zh-TW': '更新任務清單詳情'
  })
  .input({
    query: z.object({
      id: z.string()
    }),
    body: SCHEMAS.todoList.lists.schema
  })
  .existenceCheck('query', {
    id: 'todoList__lists'
  })
  .callback(({ pb, query: { id }, body }) =>
    pb.update.collection('todoList__lists').id(id).data(body).execute()
  )

const remove = forgeController
  .mutation()
  .description({
    en: 'Delete a todo list',
    ms: 'Padam senarai tugasan',
    'zh-CN': '删除任务列表',
    'zh-TW': '刪除任務清單'
  })
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'todoList__lists'
  })
  .statusCode(204)
  .callback(({ pb, query: { id } }) =>
    pb.delete.collection('todoList__lists').id(id).execute()
  )

export default forgeRouter({
  list,
  create,
  update,
  remove
})
