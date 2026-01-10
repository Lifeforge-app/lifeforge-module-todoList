import { SidebarTitle, WithQuery } from 'lifeforge-ui'
import { useModalStore } from 'lifeforge-ui'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import ModifyPriorityModal from '@/modals/ModifyPriorityModal'
import { useTodoListContext } from '@/providers/TodoListProvider'

import TaskPriorityListItem from './TaskPriorityListItem'

function TaskPriorityList() {
  const { open } = useModalStore()

  const { t } = useTranslation('apps.todoList')

  const { prioritiesQuery } = useTodoListContext()

  const handleCreatePriority = useCallback(() => {
    open(ModifyPriorityModal, {
      type: 'create'
    })
  }, [])

  return (
    <>
      <SidebarTitle
        actionButton={{
          icon: 'tabler:plus',
          onClick: handleCreatePriority
        }}
        label="priorities"
        namespace="apps.todoList"
      />
      <WithQuery query={prioritiesQuery}>
        {priorities =>
          priorities.length > 0 ? (
            <>
              {priorities.map(item => (
                <TaskPriorityListItem key={item.id} item={item} />
              ))}
            </>
          ) : (
            <p className="text-bg-500 text-center">{t('empty.priorities')}</p>
          )
        }
      </WithQuery>
    </>
  )
}

export default TaskPriorityList
