import Head from 'next/head'
import { useEffect, useState } from 'react'
import ListItem from '../components/ListItem'

export type Todos = {
  id: number
  title: string
}

// const todos: Todos[] = [
//   { id: 1, title: 'プログラミングの勉強' },
//   { id: 2, title: '買い物' },
//   { id: 3, title: '映画鑑賞' },
// ]

export default function Home() {
  const [todos, setTodos] = useState<Todos[]>([])
  const fetchAllTodos = async () => {
    console.log('fetchAllTodos')
    const res: Todos[] = await fetch('http://localhost:3001/todos').then(
      (res) => res.json()
    )
    // console.log('res', res)
    setTodos(res)
  }

  // 第二引数を [] としないと、レンダリングごとに関数が別物と評価・実行され無限レンダリングが起こる
  useEffect(() => {
    // console.log('index.tsx rendered⭐️')
    fetchAllTodos()
  }, [])

  return (
    <div className="text-center">
      <div className="text-xl font-bold">Todo リスト</div>
      <input className="border-2 border-sky-500 mt-10" type="text" />
      <button className="bg-sky-100 py-0.5 px-3 ml-4">追加</button>
      {todos && (
        <ul className="mt-10">
          {todos.map((todo) => (
            <ListItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  )
}
