import Head from 'next/head'
import { useEffect } from 'react'
import ListItem from '../components/ListItem'

export type Todos = {
  id: number
  title: string
}

const todos: Todos[] = [
  { id: 1, title: 'プログラミングの勉強' },
  { id: 2, title: '買い物' },
  { id: 3, title: '映画鑑賞' },
]

const fetchAllTodos = () => {
  fetch('http://localhost:3001/todos').then((res) => {
    console.log('res⭐️', res)
    console.log('res.body⭐️', res.body)
  })
}

const getHello = () => {
  fetch('http://localhost:3001').then((res) => {
    console.log('res🐶', res)
    console.log('res.body🐶', res.body)
  })
}

export default function Home() {
  useEffect(() => {
    console.log('index.tsx rendered')
    fetchAllTodos()
    getHello()
  })
  return (
    <>
      <div className="text-center text-xl font-bold">Todo リスト</div>
      <ul className="mt-10 text-center">
        {todos.map((todo) => (
          <ListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  )
}
