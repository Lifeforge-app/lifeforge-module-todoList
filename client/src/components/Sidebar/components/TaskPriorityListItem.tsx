import ModifyPriorityModal from '@/modals/ModifyPriorityModal'
import {
  type TodoListPriority,
  useTodoListContext
} from '@/providers/TodoListProvider'
import forgeAPI from '@/utils/forgeAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ConfirmationModal,
  ContextMenuItem,
  SidebarItem,
  useModalStore
} from 'lifeforge-ui'
import { useCallback } from 'react'
import { toast } from 'react-toastify'

function TaskPriorityListItem({ item }: { item: TodoListPriority }) {
  const queryClient = useQueryClient()

  const open = useModalStore(state => state.open)

  const { filter, setFilter } = useTodoListContext()

  const handleUpdatePriority = useCallback(() => {
    open(ModifyPriorityModal, {
      type: 'update',
      initialData: item
    })
  }, [item])

  const deleteMutation = useMutation(
    forgeAPI.todoList.priorities.remove
      .input({
        id: item.id
      })
      .mutationOptions({
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todoList'] })

          if (item.id === filter.priority) {
            setFilter('priority', null)
          }
        },
        onError: () => {
          toast.error(
            'An error occurred while deleting the priority. Please try again later.'
          )
        }
      })
  )

  const handleDeletePriority = useCallback(() => {
    open(ConfirmationModal, {
      title: 'Delete Priority',
      description: 'Are you sure you want to delete this priority?',
      confirmationButton: 'delete',
      onConfirm: async () => {
        await deleteMutation.mutateAsync({})
      }
    })
  }, [item])

  return (
    <SidebarItem
      active={filter.priority === item.id}
      contextMenuItems={
        <>
          <ContextMenuItem
            icon="tabler:pencil"
            label="Edit"
            onClick={handleUpdatePriority}
          />
          <ContextMenuItem
            dangerous
            icon="tabler:trash"
            label="Delete"
            onClick={handleDeletePriority}
          />
        </>
      }
      label={item.name}
      number={item.amount}
      sideStripColor={item.color}
      onCancelButtonClick={() => {
        setFilter('priority', null)
      }}
      onClick={() => {
        setFilter('priority', item.id)
      }}
    />
  )
}

export default TaskPriorityListItem
