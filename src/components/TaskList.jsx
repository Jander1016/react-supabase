/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { TaskCard } from "./TaskCard";

const TaskList = () => {
  const {task, getTask, loading } = useTasks()
  
  useEffect(() => {
    getTask(true)
  }, [])


  const renderTaskList = () =>{
    if (loading) {
      return <p>Loading...</p>
    } else if(task.length === 0) {
      return <p>Tasks not found...</p>
    }else{
      return (
        <>
          {task && task.map(task => <TaskCard task={task} key={task.id} />)}
        </>
      )
    }
  }
  
  return (
    <div className="container">
     {renderTaskList()}
    </div>
  )
}

export default TaskList