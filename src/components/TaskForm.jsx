/* eslint-disable react/prop-types */
import {useState} from 'react'
import { useTasks } from '../context/TaskContext'
function TaskForm() {

  const [taskName, setTaskName] = useState("")
  const { createTask, getTask } = useTasks()
  const [done, setDone] = useState(false)

  const handleSubmit = async(e) => {
    e.preventDefault()
    !taskName     
      ? alert("Ingresar datos")
      :createTask(taskName)   
    setTaskName('')
  }

  const handleToggle = (e) => {
    e.preventDefault()
    setDone(!done)
    getTask(done)
  }

  return (
    <>
     <form onSubmit={handleSubmit} className='card card-body'>
      <input 
        type='text' 
        name='taskName' 
        value={taskName}
        placeholder='Write a task'
        onChange={(e)=>setTaskName(e.target.value)}
        disabled={!done ? true : false} 
        className="form-control mb-2"/>
        <button 
          type='submit' 
          disabled={!done ? true : false}>
            Add
          </button>
        <h3 className='my-3'>List of {!done ? 'Performed': 'Pending'} Tasks</h3>
        <button onClick={handleToggle}>Show {done ? 'Performed': 'Pending'} Tasks</button>
    </form>
    </>
   
  )
}

export default TaskForm