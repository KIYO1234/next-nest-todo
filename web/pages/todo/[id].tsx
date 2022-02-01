import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Edit = (props: any) => {
  const router = useRouter()
  const [title, setTitle] = useState<string>()
  const { id } = router.query
  console.log('id⭐️', id)
  const findOne = async () => {
    const result = await fetch(`http://localhost:3001/todos/${id}`).then(
      (res) => res.json()
    )
    console.log('result: ', result)
    setTitle(result.title)
  }

  const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  useEffect(() => {
    console.log('edit page rendered')
    findOne()
  }, [])

  const handleSubmit = async () => {
    try {
      const data = {
        title,
      }
      console.log('JSON.stringify(data)', JSON.stringify(data))

      const res = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
      })
        .then((res) => console.log(res))
        .then((result) => console.log(result))

      alert('変更を保存しました')
      router.push('/')
    } catch (err) {
      console.log('error❗️', err)
    }
  }

  return (
    <>
      <div>edit page</div>
      <input
        className="border-2 border-sky-500 mt-10"
        type="text"
        value={title}
        onChange={handleEdit}
      />
      <button
        className="bg-sky-100 py-0.5 px-3 ml-4 hover:bg-sky-200"
        onClick={handleSubmit}
      >
        変更を保存
      </button>
    </>
  )
}

export default Edit
