import { SCHEMAS } from '@schema'
import z from 'zod'

import { forgeController, forgeRouter } from '@functions/routes'

const list = forgeController
  .query()
  .description({
    en: 'Get all todo tags',
    ms: 'Dapatkan semua tag tugasan',
    'zh-CN': '获取所有任务标签',
    'zh-TW': '獲取所有任務標籤'
  })
  .input({})
  .callback(({ pb }) =>
    pb.getFullList.collection('todoList__tags_aggregated').execute()
  )

const create = forgeController
  .mutation()
  .description({
    en: 'Create a new todo tag',
    ms: 'Cipta tag tugasan baharu',
    'zh-CN': '创建新任务标签',
    'zh-TW': '創建新任務標籤'
  })
  .input({
    body: SCHEMAS.todoList.tags.schema
  })
  .statusCode(201)
  .callback(({ pb, body }) =>
    pb.create.collection('todoList__tags').data(body).execute()
  )

const update = forgeController
  .mutation()
  .description({
    en: 'Update todo tag details',
    ms: 'Kemas kini butiran tag tugasan',
    'zh-CN': '更新任务标签详情',
    'zh-TW': '更新任務標籤詳情'
  })
  .input({
    query: z.object({
      id: z.string()
    }),
    body: SCHEMAS.todoList.tags.schema
  })
  .existenceCheck('query', {
    id: 'todoList__tags'
  })
  .callback(({ pb, query: { id }, body }) =>
    pb.update.collection('todoList__tags').id(id).data(body).execute()
  )

const remove = forgeController
  .mutation()
  .description({
    en: 'Delete a todo tag',
    ms: 'Padam tag tugasan',
    'zh-CN': '删除任务标签',
    'zh-TW': '刪除任務標籤'
  })
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'todoList__tags'
  })
  .statusCode(204)
  .callback(({ pb, query: { id } }) =>
    pb.delete.collection('todoList__tags').id(id).execute()
  )

export default forgeRouter({
  list,
  create,
  update,
  remove
})
