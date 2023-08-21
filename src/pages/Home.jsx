import { useEffect, useState } from "react"
import TaskForm from "../components/TaskForm"
import { client } from "../supabase/client"
import { useNavigate } from "react-router-dom"
import TaskList from "../components/TaskList"

export default function Home() {

  const [sessionUser, setsessionUser] = useState("")

  const navigate = useNavigate()

 useEffect(() => {
    client.auth.getSession().then(({ data: { session } }) => {
      setsessionUser(session)
     if(!session) navigate('/login')
     else navigate('/')
    })
  }, [navigate])

  return (
    <>
    <section className="row pt-4">
      <article className="col-md-4 offset-md-4">
        < TaskForm session={sessionUser}/>
        <section> <TaskList /></section>
      </article>
    </section>
    
    </>
    
  )
}

