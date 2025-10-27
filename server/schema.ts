import z from 'zod'

const todoListSchemas = {
  lists: {
    schema: z.object({
      name: z.string(),
      icon: z.string(),
      color: z.string()
    }),
    raw: {
      id: '327ciwg4kdb3eih',
      listRule: '@request.auth.id != ""',
      viewRule: '@request.auth.id != ""',
      createRule: '@request.auth.id != ""',
      updateRule: '@request.auth.id != ""',
      deleteRule: '@request.auth.id != ""',
      name: 'todo_list__lists',
      type: 'base',
      fields: [
        {
          autogeneratePattern: '[a-z0-9]{15}',
          hidden: false,
          id: 'text3208210256',
          max: 15,
          min: 15,
          name: 'id',
          pattern: '^[a-z0-9]+$',
          presentable: false,
          primaryKey: true,
          required: true,
          system: true,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: 'y8zommga',
          max: 0,
          min: 0,
          name: 'name',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: true,
          system: false,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: '8cakr2ge',
          max: 0,
          min: 0,
          name: 'icon',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: true,
          system: false,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: 'fc3qdmd7',
          max: 0,
          min: 0,
          name: 'color',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: true,
          system: false,
          type: 'text'
        }
      ],
      indexes: [
        'CREATE UNIQUE INDEX `idx_T3w3dLGNcW` ON `todo_list__lists` (`name`)'
      ],
      system: false
    }
  },
  tags: {
    schema: z.object({
      name: z.string()
    }),
    raw: {
      id: 'x117ii0br9fqehr',
      listRule: '@request.auth.id != ""',
      viewRule: '@request.auth.id != ""',
      createRule: '@request.auth.id != ""',
      updateRule: '@request.auth.id != ""',
      deleteRule: '@request.auth.id != ""',
      name: 'todo_list__tags',
      type: 'base',
      fields: [
        {
          autogeneratePattern: '[a-z0-9]{15}',
          hidden: false,
          id: 'text3208210256',
          max: 15,
          min: 15,
          name: 'id',
          pattern: '^[a-z0-9]+$',
          presentable: false,
          primaryKey: true,
          required: true,
          system: true,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: 'stfzdnfd',
          max: 0,
          min: 0,
          name: 'name',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: true,
          system: false,
          type: 'text'
        }
      ],
      indexes: [
        'CREATE UNIQUE INDEX `idx_scwXEaym2g` ON `todo_list__tags` (`name`)'
      ],
      system: false
    }
  },
  entries: {
    schema: z.object({
      summary: z.string(),
      notes: z.string(),
      due_date: z.string(),
      due_date_has_time: z.boolean(),
      list: z.string(),
      tags: z.array(z.string()),
      priority: z.string(),
      done: z.boolean(),
      completed_at: z.string(),
      created: z.string(),
      updated: z.string()
    }),
    raw: {
      id: 'w35txwos02cf2nm',
      listRule: '@request.auth.id != ""',
      viewRule: '@request.auth.id != ""',
      createRule: '@request.auth.id != ""',
      updateRule: '@request.auth.id != ""',
      deleteRule: '@request.auth.id != ""',
      name: 'todo_list__entries',
      type: 'base',
      fields: [
        {
          autogeneratePattern: '[a-z0-9]{15}',
          hidden: false,
          id: 'text3208210256',
          max: 15,
          min: 15,
          name: 'id',
          pattern: '^[a-z0-9]+$',
          presentable: false,
          primaryKey: true,
          required: true,
          system: true,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: 'dfvcxey7',
          max: 0,
          min: 0,
          name: 'summary',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: true,
          system: false,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: 'gcll6ukh',
          max: 0,
          min: 0,
          name: 'notes',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: false,
          system: false,
          type: 'text'
        },
        {
          hidden: false,
          id: 'f8gi2ylo',
          max: '',
          min: '',
          name: 'due_date',
          presentable: false,
          required: false,
          system: false,
          type: 'date'
        },
        {
          hidden: false,
          id: 'bool2459043662',
          name: 'due_date_has_time',
          presentable: false,
          required: false,
          system: false,
          type: 'bool'
        },
        {
          cascadeDelete: false,
          collectionId: '327ciwg4kdb3eih',
          hidden: false,
          id: '5fdwchzj',
          maxSelect: 1,
          minSelect: 0,
          name: 'list',
          presentable: false,
          required: false,
          system: false,
          type: 'relation'
        },
        {
          cascadeDelete: false,
          collectionId: 'x117ii0br9fqehr',
          hidden: false,
          id: 'df4ncdna',
          maxSelect: 2147483647,
          minSelect: 0,
          name: 'tags',
          presentable: false,
          required: false,
          system: false,
          type: 'relation'
        },
        {
          cascadeDelete: false,
          collectionId: 'zwgj5r0vi6xo5ma',
          hidden: false,
          id: 'tonpixw6',
          maxSelect: 1,
          minSelect: 0,
          name: 'priority',
          presentable: false,
          required: false,
          system: false,
          type: 'relation'
        },
        {
          hidden: false,
          id: 'jkco5dii',
          name: 'done',
          presentable: false,
          required: false,
          system: false,
          type: 'bool'
        },
        {
          hidden: false,
          id: 'jqooidhl',
          max: '',
          min: '',
          name: 'completed_at',
          presentable: false,
          required: false,
          system: false,
          type: 'date'
        },
        {
          hidden: false,
          id: 'autodate2990389176',
          name: 'created',
          onCreate: true,
          onUpdate: false,
          presentable: false,
          system: false,
          type: 'autodate'
        },
        {
          hidden: false,
          id: 'autodate3332085495',
          name: 'updated',
          onCreate: true,
          onUpdate: true,
          presentable: false,
          system: false,
          type: 'autodate'
        }
      ],
      indexes: [],
      system: false
    }
  },
  priorities: {
    schema: z.object({
      name: z.string(),
      color: z.string()
    }),
    raw: {
      id: 'zwgj5r0vi6xo5ma',
      listRule: '@request.auth.id != ""',
      viewRule: '@request.auth.id != ""',
      createRule: '@request.auth.id != ""',
      updateRule: '@request.auth.id != ""',
      deleteRule: '@request.auth.id != ""',
      name: 'todo_list__priorities',
      type: 'base',
      fields: [
        {
          autogeneratePattern: '[a-z0-9]{15}',
          hidden: false,
          id: 'text3208210256',
          max: 15,
          min: 15,
          name: 'id',
          pattern: '^[a-z0-9]+$',
          presentable: false,
          primaryKey: true,
          required: true,
          system: true,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: 's5kc4goc',
          max: 0,
          min: 0,
          name: 'name',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: false,
          system: false,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: 'i178pi1i',
          max: 0,
          min: 0,
          name: 'color',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: false,
          system: false,
          type: 'text'
        }
      ],
      indexes: [
        'CREATE UNIQUE INDEX `idx_IbjNIIyb5l` ON `todo_list__priorities` (`name`)'
      ],
      system: false
    }
  },
  lists_aggregated: {
    schema: z.object({
      name: z.string(),
      color: z.string(),
      icon: z.string(),
      amount: z.number()
    }),
    raw: {
      id: 'pbc_294728180',
      listRule: '@request.auth.id != ""',
      viewRule: '@request.auth.id != ""',
      createRule: null,
      updateRule: null,
      deleteRule: null,
      name: 'todo_list__lists_aggregated',
      type: 'view',
      fields: [
        {
          autogeneratePattern: '',
          hidden: false,
          id: 'text3208210256',
          max: 0,
          min: 0,
          name: 'id',
          pattern: '^[a-z0-9]+$',
          presentable: false,
          primaryKey: true,
          required: true,
          system: true,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: '_clone_1NJl',
          max: 0,
          min: 0,
          name: 'name',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: true,
          system: false,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: '_clone_ROLd',
          max: 0,
          min: 0,
          name: 'color',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: true,
          system: false,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: '_clone_WwBG',
          max: 0,
          min: 0,
          name: 'icon',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: true,
          system: false,
          type: 'text'
        },
        {
          hidden: false,
          id: 'number2392944706',
          max: null,
          min: null,
          name: 'amount',
          onlyInt: false,
          presentable: false,
          required: false,
          system: false,
          type: 'number'
        }
      ],
      indexes: [],
      system: false,
      viewQuery:
        'SELECT \n  todo_list__lists.id, \n  todo_list__lists.name,\n  todo_list__lists.color, \n  todo_list__lists.icon, \n  count(todo_list__lists.id) as amount \nFROM "todo_list__lists" \n  LEFT JOIN todo_list__entries ON todo_list__entries.list = todo_list__lists.id\nGROUP BY todo_list__lists.id'
    }
  },
  tags_aggregated: {
    schema: z.object({
      name: z.string(),
      amount: z.number()
    }),
    raw: {
      id: 'pbc_3656224340',
      listRule: '@request.auth.id != ""',
      viewRule: '@request.auth.id != ""',
      createRule: null,
      updateRule: null,
      deleteRule: null,
      name: 'todo_list__tags_aggregated',
      type: 'view',
      fields: [
        {
          autogeneratePattern: '',
          hidden: false,
          id: 'text3208210256',
          max: 0,
          min: 0,
          name: 'id',
          pattern: '^[a-z0-9]+$',
          presentable: false,
          primaryKey: true,
          required: true,
          system: true,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: '_clone_yS0c',
          max: 0,
          min: 0,
          name: 'name',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: true,
          system: false,
          type: 'text'
        },
        {
          hidden: false,
          id: 'number2392944706',
          max: null,
          min: null,
          name: 'amount',
          onlyInt: false,
          presentable: false,
          required: false,
          system: false,
          type: 'number'
        }
      ],
      indexes: [],
      system: false,
      viewQuery:
        'WITH entry_tag_map AS (\n  SELECT\n    todo_list__entries.id AS entry_id,\n    json_each.value AS tag_id\n  FROM\n    todo_list__entries,\n    json_each(todo_list__entries.tags)\n)\nSELECT\n  todo_list__tags.id,\n  todo_list__tags.name,\n  COUNT(entry_tag_map.entry_id) AS amount\nFROM\n  todo_list__tags\nLEFT JOIN entry_tag_map\n  ON entry_tag_map.tag_id = todo_list__tags.id\nGROUP BY\n  todo_list__tags.id;'
    }
  },
  priorities_aggregated: {
    schema: z.object({
      name: z.string(),
      color: z.string(),
      amount: z.number()
    }),
    raw: {
      id: 'pbc_13199116',
      listRule: '@request.auth.id != ""',
      viewRule: '@request.auth.id != ""',
      createRule: null,
      updateRule: null,
      deleteRule: null,
      name: 'todo_list__priorities_aggregated',
      type: 'view',
      fields: [
        {
          autogeneratePattern: '',
          hidden: false,
          id: 'text3208210256',
          max: 0,
          min: 0,
          name: 'id',
          pattern: '^[a-z0-9]+$',
          presentable: false,
          primaryKey: true,
          required: true,
          system: true,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: '_clone_zERu',
          max: 0,
          min: 0,
          name: 'name',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: false,
          system: false,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: '_clone_36To',
          max: 0,
          min: 0,
          name: 'color',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: false,
          system: false,
          type: 'text'
        },
        {
          hidden: false,
          id: 'number2392944706',
          max: null,
          min: null,
          name: 'amount',
          onlyInt: false,
          presentable: false,
          required: false,
          system: false,
          type: 'number'
        }
      ],
      indexes: [],
      system: false,
      viewQuery:
        'SELECT \n  todo_list__priorities.id, \n  todo_list__priorities.name,\n  todo_list__priorities.color,\n  COUNT(todo_list__entries.id) as amount\nFROM todo_list__priorities\n  LEFT JOIN todo_list__entries ON todo_list__entries.priority = todo_list__priorities.id\nGROUP BY todo_list__priorities.id'
    }
  }
}

export default todoListSchemas
