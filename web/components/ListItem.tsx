import React from 'react'
import { Todos } from '../pages'
import { useRouter } from 'next/router'

export type Props = {
  todo: Todos
  key: string
  handleDelete: (id: string) => void
}

const ListItem = (props: Props) => {
  const router = useRouter()

  const handleEdit = (id: string) => {
    console.log('id', id)
    router.push(`/todo/${id}`)
  }

  return (
    <>
      <li key={props.todo.id} className="mb-4">
        {props.todo.title}
        <button
          onClick={() => handleEdit(props.todo.id)}
          className="bg-sky-100 py-0.5 px-3 ml-4 hover:bg-sky-200"
        >
          編集
        </button>
        <button
          onClick={() => props.handleDelete(props.todo.id)}
          className="bg-red-100 py-0.5 px-3 ml-4 hover:bg-red-200"
        >
          削除
        </button>
      </li>
    </>
  )
}

export default ListItem
