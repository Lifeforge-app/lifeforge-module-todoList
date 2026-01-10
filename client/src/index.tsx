import { ModuleHeader } from 'lifeforge-ui'

import { TodoListProvider } from '@/providers/TodoListProvider'

import TodoListContainer from './components/TodoListContainer'
import './index.css'

function TodoList() {
  return (
    <>
      <ModuleHeader />
      <TodoListProvider>
        <TodoListContainer />
      </TodoListProvider>
    </>
  )
}

export default TodoList
