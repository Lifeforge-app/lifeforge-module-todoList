import { SCHEMAS } from '@schema'
import moment from 'moment'
import z from 'zod'

import { FilterType } from '@functions/database/PBService/typescript/pb_service'
import { forgeController, forgeRouter } from '@functions/routes'

const FILTERS: Record<string, FilterType<'todoList__entries'>> = {
  all: [
    {
      field: 'done',
      operator: '=',
      value: false
    }
  ],
  today: [
    {
      field: 'done',
      operator: '=',
      value: false
    },
    {
      field: 'due_date',
      operator: '>=',
      value: moment().startOf('day').utc().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      field: 'due_date',
      operator: '<=',
      value: moment()
        .endOf('day')
        .utc()
        .add(1, 'second')
        .format('YYYY-MM-DD HH:mm:ss')
    }
  ],
  scheduled: [
    {
      field: 'done',
      operator: '=',
      value: false
    },
    {
      field: 'due_date',
      operator: '!=',
      value: ''
    },
    {
      field: 'due_date',
      operator: '>=',
      value: moment().utc().format('YYYY-MM-DD HH:mm:ss')
    }
  ],
  overdue: [
    {
      field: 'done',
      operator: '=',
      value: false
    },
    {
      field: 'due_date',
      operator: '!=',
      value: ''
    },
    {
      field: 'due_date',
      operator: '<',
      value: moment().utc().format('YYYY-MM-DD HH:mm:ss')
    }
  ],
  completed: [
    {
      field: 'done',
      operator: '=',
      value: true
    }
  ]
}

const getStatusCounter = forgeController
  .query()
  .description({
    en: 'Get todo counts by status',
    ms: 'Dapatkan kiraan tugasan mengikut status',
    'zh-CN': '按状态获取任务数量',
    'zh-TW': '按狀態獲取任務數量'
  })
  .input({})
  .callback(async ({ pb }) => {
    const counters = {
      all: 0,
      today: 0,
      scheduled: 0,
      overdue: 0,
      completed: 0
    }

    for (const type of Object.keys(FILTERS) as (keyof typeof FILTERS)[]) {
      const { totalItems } = await pb.getList
        .collection('todoList__entries')
        .page(1)
        .perPage(1)
        .filter(FILTERS[type])
        .execute()

      counters[type as keyof typeof counters] = totalItems
    }

    return counters
  })

const getById = forgeController
  .query()
  .description({
    en: 'Get a specific todo by ID',
    ms: 'Dapatkan tugasan tertentu mengikut ID',
    'zh-CN': '根据 ID 获取特定任务',
    'zh-TW': '根據 ID 獲取特定任務'
  })
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'todoList__entries'
  })
  .callback(({ pb, query: { id } }) =>
    pb.getOne.collection('todoList__entries').id(id).execute()
  )

const list = forgeController
  .query()
  .description({
    en: 'Get todos with filters',
    ms: 'Dapatkan tugasan dengan penapis',
    'zh-CN': '获取带筛选的任务',
    'zh-TW': '獲取帶篩選的任務'
  })
  .input({
    query: z.object({
      list: z.string().optional(),
      status: z.string().optional().default('all'),
      priority: z.string().optional(),
      tag: z.string().optional(),
      query: z.string().optional()
    })
  })
  .existenceCheck('query', {
    tag: '[todoList__tags]',
    list: '[todoList__lists]',
    priority: '[todoList__priorities]'
  })
  .callback(async ({ pb, query: { status, tag, list, priority } }) => {
    const finalFilter = [
      ...(FILTERS[status as keyof typeof FILTERS] || FILTERS.all),
      ...(tag ? ([{ field: 'tags', operator: '~', value: tag }] as const) : []),
      ...(list
        ? ([{ field: 'list', operator: '=', value: list }] as const)
        : []),
      ...(priority
        ? ([{ field: 'priority', operator: '=', value: priority }] as const)
        : [])
    ]

    return await pb.getFullList
      .collection('todoList__entries')
      .filter(finalFilter)
      .sort(['-created'])
      .execute()
  })

const create = forgeController
  .mutation()
  .description({
    en: 'Create a new todo',
    ms: 'Cipta tugasan baharu',
    'zh-CN': '创建新任务',
    'zh-TW': '創建新任務'
  })
  .input({
    body: SCHEMAS.todoList.entries.schema.omit({
      completed_at: true,
      done: true,
      created: true,
      updated: true
    })
  })
  .existenceCheck('body', {
    list: '[todoList__lists]',
    priority: '[todoList__priorities]',
    tags: '[todoList__tags]'
  })
  .statusCode(201)
  .callback(({ pb, body }) =>
    pb.create
      .collection('todoList__entries')
      .data({
        ...body,
        due_date:
          (body.due_date && !body.due_date_has_time
            ? moment(body.due_date).endOf('day').toISOString()
            : body.due_date) || ''
      })
      .execute()
  )

const update = forgeController
  .mutation()
  .description({
    en: 'Update todo details',
    ms: 'Kemas kini butiran tugasan',
    'zh-CN': '更新任务详情',
    'zh-TW': '更新任務詳情'
  })
  .input({
    query: z.object({
      id: z.string()
    }),
    body: SCHEMAS.todoList.entries.schema.omit({
      completed_at: true,
      done: true,
      created: true,
      updated: true
    })
  })
  .existenceCheck('query', {
    id: 'todoList__entries'
  })
  .existenceCheck('body', {
    list: '[todoList__lists]',
    priority: '[todoList__priorities]',
    tags: '[todoList__tags]'
  })
  .callback(({ pb, query: { id }, body }) =>
    pb.update
      .collection('todoList__entries')
      .id(id)
      .data({
        ...body,
        due_date:
          (body.due_date && !body.due_date_has_time
            ? moment(body.due_date).endOf('day').toISOString()
            : body.due_date) || ''
      })
      .execute()
  )

const remove = forgeController
  .mutation()
  .description({
    en: 'Delete a todo',
    ms: 'Padam tugasan',
    'zh-CN': '删除任务',
    'zh-TW': '刪除任務'
  })
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'todoList__entries'
  })
  .statusCode(204)
  .callback(({ pb, query: { id } }) =>
    pb.delete.collection('todoList__entries').id(id).execute()
  )

const toggleEntry = forgeController
  .mutation()
  .description({
    en: 'Toggle todo completion status',
    ms: 'Togol status penyiapan tugasan',
    'zh-CN': '切换任务完成状态',
    'zh-TW': '切換任務完成狀態'
  })
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'todoList__entries'
  })
  .callback(async ({ pb, query: { id } }) => {
    const entry = await pb.getOne
      .collection('todoList__entries')
      .id(id)
      .execute()

    return await pb.update
      .collection('todoList__entries')
      .id(id)
      .data({
        done: !entry.done,
        completed_at: entry.done
          ? null
          : moment().utc().format('YYYY-MM-DD HH:mm:ss')
      })
      .execute()
  })

export default forgeRouter({
  getById,
  list,
  getStatusCounter,
  create,
  update,
  remove,
  toggleEntry
})
