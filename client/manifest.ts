import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  name: 'Todo List',
  icon: 'tabler:list-check',
  routes: {
    '/': lazy(() => import('@'))
  },
  hasAI: true,
  requiredAPIKeys: ['groq'],
  category: 'Productivity'
} satisfies ModuleConfig
