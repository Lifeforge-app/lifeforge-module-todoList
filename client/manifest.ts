import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  name: 'Todo List',
  icon: 'tabler:list-check',
  routes: {
    'todo-list': lazy(() => import('@'))
  },
  hasAI: true,
  category: '01.Productivity'
} satisfies ModuleConfig
