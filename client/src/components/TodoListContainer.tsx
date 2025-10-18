import {
  type TodoListEntry,
  useTodoListContext
} from '@/providers/TodoListProvider'
import forgeAPI from '@/utils/forgeAPI'
import { useDebounce } from '@uidotdev/usehooks'
import { EmptyStateScreen, FAB, SearchInput, WithQuery } from 'lifeforge-ui'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useLocation, useSearchParams } from 'shared'

import Header from './Header'
import ModifyTaskDrawer from './ModifyTaskDrawer'
import Sidebar from './Sidebar'
import TaskList from './tasks/TaskList'

function TodoListContainer() {
  const [searchParams, setSearchParams] = useSearchParams()

  const { entriesQuery, setModifyTaskWindowOpenType, setSelectedTask } =
    useTodoListContext()

  const [searchQuery, setSearchQuery] = useState('')

  const debouncedSearchQuery = useDebounce(searchQuery.trim(), 300)

  const [filteredEntries, setFilteredEntries] = useState<TodoListEntry[]>([])

  const { hash } = useLocation()

  async function fetchAndSetTask(id: string) {
    try {
      const data = await forgeAPI.todoList.entries.getById
        .input({
          id
        })
        .query()

      setSelectedTask(data)
      setModifyTaskWindowOpenType('update')
    } catch (error) {
      console.error('Error fetching entry:', error)
      toast.error('Error fetching entry')
    }
  }

  useEffect(() => {
    if (hash === '#new') {
      setSelectedTask(null)
      setModifyTaskWindowOpenType('create')
    }
  }, [hash])

  useEffect(() => {
    const id = searchParams.get('entry')

    if (id) {
      fetchAndSetTask(id)

      const newSearchParams = new URLSearchParams(searchParams)

      newSearchParams.delete('entry')
      setSearchParams(newSearchParams, { replace: true })
    }
  }, [searchParams, entriesQuery.data])

  useEffect(() => {
    if (debouncedSearchQuery.trim() === '') {
      setFilteredEntries(entriesQuery.data ?? [])

      return
    }

    const lowerCaseQuery = debouncedSearchQuery.toLowerCase()

    const filtered = (entriesQuery.data ?? []).filter(entry =>
      entry.summary.toLowerCase().includes(lowerCaseQuery)
    )

    setFilteredEntries(filtered)
  }, [debouncedSearchQuery, entriesQuery.data])

  return (
    <>
      <div className="flex size-full min-h-0 flex-1">
        <Sidebar />
        <div className="relative z-10 flex h-full flex-1 flex-col xl:ml-8">
          <Header />
          <div className="w-full px-4">
            <SearchInput
              className="mt-4"
              namespace="apps.todoList"
              searchTarget="task"
              setValue={setSearchQuery}
              value={searchQuery}
            />
          </div>
          <WithQuery query={entriesQuery}>
            {() =>
              filteredEntries.length > 0 ? (
                <TaskList entries={filteredEntries} />
              ) : (
                <EmptyStateScreen
                  CTAButtonProps={{
                    children: 'new',
                    icon: 'tabler:plus',
                    onClick: () => {
                      setSelectedTask(null)
                      setModifyTaskWindowOpenType('create')
                    }
                  }}
                  icon="tabler:article-off"
                  name="tasks"
                  namespace="apps.todoList"
                />
              )
            }
          </WithQuery>
        </div>
      </div>
      <ModifyTaskDrawer />
      {(entriesQuery.data ?? []).length > 0 && (
        <FAB
          onClick={() => {
            setSelectedTask(null)
            setModifyTaskWindowOpenType('create')
          }}
        />
      )}
    </>
  )
}

export default TodoListContainer
