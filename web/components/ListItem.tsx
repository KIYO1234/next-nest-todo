import React from 'react'
import { Todos } from '../pages'

export type Props = {
  todo: Todos
}

const ListItem = (props: Props) => {
  return (
    <li key={props.todo.id}>
      {props.todo.id}: {props.todo.title}
    </li>
  )
}

export default ListItem
