import TaskItem from '@/components/tasks/TaskItem'
import {
  TodoListProvider,
  useTodoListContext
} from '@/providers/TodoListProvider'
import {
  Button,
  EmptyStateScreen,
  Scrollbar,
  Widget,
  WithQuery
} from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'shared'
import type { WidgetConfig } from 'shared'

function TodoListContent() {
  const { t } = useTranslation('apps.todoList')

  const navigate = useNavigate()

  const { entriesQuery } = useTodoListContext()

  return (
    <WithQuery query={entriesQuery}>
      {entries => (
        <ul className="flex flex-1 flex-col gap-2 pr-4">
          {entries.length > 0 ? (
            entries.map(entry => (
              <TaskItem
                key={entry.id}
                isInDashboardWidget
                className="component-bg-lighter-with-hover"
                entry={entry}
              />
            ))
          ) : (
            <EmptyStateScreen
              smaller
              CTAButtonProps={{
                icon: 'tabler:plus',
                tProps: { item: t('items.task') },
                children: 'new',
                onClick: () => {
                  navigate('/todo-list#new')
                }
              }}
              icon="tabler:calendar-smile"
              message={{
                id: 'today',
                namespace: 'apps.todoList',
                tKey: 'widgets.todoList'
              }}
            />
          )}
        </ul>
      )}
    </WithQuery>
  )
}

export default function TodoList() {
  return (
    <Widget
      actionComponent={
        <Button
          as={Link}
          className="mr-3 p-2!"
          icon="tabler:chevron-right"
          to="/todo-list"
          variant="plain"
        />
      }
      className="pr-3"
      icon="tabler:clipboard-list"
      namespace="apps.todoList"
      title="Todo List"
    >
      <TodoListProvider>
        <Scrollbar>
          <TodoListContent />
        </Scrollbar>
      </TodoListProvider>
    </Widget>
  )
}

export const config: WidgetConfig = {
  namespace: 'apps.todoList',
  id: 'todoList',
  icon: 'tabler:checklist'
}
