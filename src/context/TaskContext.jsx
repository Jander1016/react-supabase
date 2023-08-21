/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {useContext, createContext, useState} from 'react'
import {client} from '../supabase/client'

export const TaskContext = createContext()

export const useTasks = () => useContext(TaskContext)

export const TaskContextProvider = ({children}) => {

  const [task, setTask] = useState([])
  const [loading, setLoading] = useState(false)
  const userId = JSON.parse(localStorage.getItem('sb-bnnchksejdnkyawzemdj-auth-token'))?.user?.id

  const getTask = async (done = false) => {
    setLoading(true);
    ! userId ? '' : userId;
    const {data, error} = await client.from('task').select("*").eq("userId", userId).eq("done", done).order("id", {ascending: true})
    if (error) 
      throw new Error(" Error: " + error.message)
    
    setTask(data)
    setLoading(false)
  }

  const createTask = async (name) => {
    const {data, error} = await client.from('task').insert({name, userId}).select()
    if (error) 
      throw new Error("Error inserting: " + error.message)
    
    setTask([
      ...task,
      ...data
    ])
    // getTask(false) 
  }

  const upDateTask = async (id,done) => {
    const {error} = await client.from('task').update({done}).eq('userId', userId).eq("id", id).select()
    if (error) 
      throw new Error("Error updating: " + error.message)
   
    setTask(task.filter(task => task.id !== id))

  }

  const deleteTask = async (id) => {
    const {error} = await client.from('task').delete().eq('userId', userId).eq('id', id).select()
    if (error) 
      throw new Error("Error deleting: " + error.message)
    
    setTask(task.filter(task => task.id !== id))
  }

  return <TaskContext.Provider value={
    {
      task,
      getTask,
      createTask,
      upDateTask,
      deleteTask,
      loading
    }
  }>
    {children} </TaskContext.Provider>
}
