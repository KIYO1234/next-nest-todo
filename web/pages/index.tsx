import Head from 'next/head'
import { useEffect, useState } from 'react'
import ListItem from '../components/ListItem'

export type Todos = {
  id: string
  title: string
}

export type Title = {
  title: string
}

// const todos: Todos[] = [
//   { id: 1, title: 'プログラミングの勉強' },
//   { id: 2, title: '買い物' },
//   { id: 3, title: '映画鑑賞' },
// ]

export default function Home() {
  const [todos, setTodos] = useState<Todos[]>([])
  const [keyword, setKeyword] = useState<string>()
  const fetchAllTodos = async () => {
    console.log('fetchAllTodos')
    const res: Todos[] = await fetch('http://localhost:3001/todos').then(
      (res) => res.json()
    )
    // console.log('res', res)
    const todos: Todos[] = []
    res.forEach((el) => {
      console.log('res⭐️', res)
      todos.push(el)
    })
    console.log('todos', todos)

    setTodos(todos)
  }

  // 第二引数を [] としないと、レンダリングごとに関数が別物と評価・実行され無限レンダリングが起こる
  useEffect(() => {
    // console.log('index.tsx rendered⭐️')
    fetchAllTodos()
  }, [])

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('入力値：', event.target.value)
    setKeyword(event.target.value)
  }

  const handleSubmit = async () => {
    console.log('handleSubmit')
    const data = {
      title: keyword,
    }
    console.log('JSON.stringify(data)', JSON.stringify(data))

    const res = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    })
      .then((res) => console.log(res))
      .then((result) => console.log(result))
    // console.log('res❗️', res)
    // console.log('res.json()❗️', res.json())

    // setTodos(res.json())
  }

  return (
    <div className="text-center">
      <div className="text-xl font-bold">Todo リスト</div>
      <input
        onChange={handleInput}
        className="border-2 border-sky-500 mt-10"
        type="text"
      />
      <button
        className="bg-sky-100 py-0.5 px-3 ml-4 hover:bg-sky-200"
        onClick={handleSubmit}
      >
        追加
      </button>
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
