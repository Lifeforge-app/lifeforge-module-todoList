import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  routes: {
    '/': lazy(() => import('@'))
  },
  hasAI: true,
} satisfies ModuleConfig
