import { useTasks } from "../context/TaskContext"

/* eslint-disable react/prop-types */
export const TaskCard = ({task}) => {

  const { upDateTask ,deleteTask } = useTasks()

  const handleDelete = () => {
    deleteTask(task.id)
  }

  const handleDone = () => {
    upDateTask(task.id,!task.done)
  }

  return (
    <article className="card card-body mb-2">
      <h5>{task.name}</h5>
      <p>{ task.done ? 'Task performed ✅' : 'Task pending ❌'}</p>
      <div className="ms-auto">
        <button className="btn btn-secondary btn-sm me-3" onClick={handleDone}>{ task.done ? 'Pending ❌' : 'Done ✅'}</button>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
      </div>

    </article>
  )
}
