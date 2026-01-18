import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import z from 'zod'

import forge from '../forge'
import todoListSchemas from '../schema'

dayjs.extend(utc)

const FILTERS: Record<string, any> = {
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
      value: dayjs().startOf('day').utc().format('YYYY-MM-DD HH:mm:ss')
    },
    {
      field: 'due_date',
      operator: '<=',
      value: dayjs()
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
      value: dayjs().utc().format('YYYY-MM-DD HH:mm:ss')
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
      value: dayjs().utc().format('YYYY-MM-DD HH:mm:ss')
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

export const getStatusCounter = forge
  .query()
  .description('Get todo counts by status')
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
        .collection('entries')
        .page(1)
        .perPage(1)
        .filter(FILTERS[type])
        .execute()

      counters[type as keyof typeof counters] = totalItems
    }

    return counters
  })

export const getById = forge
  .query()
  .description('Get a specific todo by ID')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'entries'
  })
  .callback(({ pb, query: { id } }) =>
    pb.getOne.collection('entries').id(id).execute()
  )

export const list = forge
  .query()
  .description('Get todos with filters')
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
    tag: '[tags]',
    list: '[lists]',
    priority: '[priorities]'
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
      .collection('entries')
      .filter(finalFilter)
      .sort(['-created'])
      .execute()
  })

export const create = forge
  .mutation()
  .description('Create a new todo')
  .input({
    body: todoListSchemas.entries.omit({
      completed_at: true,
      done: true,
      created: true,
      updated: true
    })
  })
  .existenceCheck('body', {
    list: '[lists]',
    priority: '[priorities]',
    tags: '[tags]'
  })
  .statusCode(201)
  .callback(({ pb, body }) =>
    pb.create
      .collection('entries')
      .data({
        ...body,
        due_date:
          (body.due_date && !body.due_date_has_time
            ? dayjs(body.due_date).endOf('day').toISOString()
            : body.due_date) || ''
      })
      .execute()
  )

export const update = forge
  .mutation()
  .description('Update todo details')
  .input({
    query: z.object({
      id: z.string()
    }),
    body: todoListSchemas.entries.omit({
      completed_at: true,
      done: true,
      created: true,
      updated: true
    })
  })
  .existenceCheck('query', {
    id: 'entries'
  })
  .existenceCheck('body', {
    list: '[lists]',
    priority: '[priorities]',
    tags: '[tags]'
  })
  .callback(({ pb, query: { id }, body }) =>
    pb.update
      .collection('entries')
      .id(id)
      .data({
        ...body,
        due_date:
          (body.due_date && !body.due_date_has_time
            ? dayjs(body.due_date).endOf('day').toISOString()
            : body.due_date) || ''
      })
      .execute()
  )

export const remove = forge
  .mutation()
  .description('Delete a todo')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'entries'
  })
  .statusCode(204)
  .callback(({ pb, query: { id } }) =>
    pb.delete.collection('entries').id(id).execute()
  )

export const toggleEntry = forge
  .mutation()
  .description('Toggle todo completion status')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'entries'
  })
  .callback(async ({ pb, query: { id } }) => {
    const entry = await pb.getOne.collection('entries').id(id).execute()

    return await pb.update
      .collection('entries')
      .id(id)
      .data({
        done: !entry.done,
        completed_at: entry.done
          ? null
          : dayjs().utc().format('YYYY-MM-DD HH:mm:ss')
      })
      .execute()
  })
