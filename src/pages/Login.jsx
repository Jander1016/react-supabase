import {useState, useEffect} from "react"
import { client } from "../supabase/client"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    const { data, error} = await client.auth.signInWithOtp({ email })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
    return data
  }

  useEffect(() => {
    client.auth.getSession().then(({ data: { session } }) => {
      !session ? navigate('/login') :  navigate('/')
    })
  }, [navigate])


  const handleChange = (e) =>  setEmail(e.target.value)

  return (
    <section className="row pt-4">
      <article className="col-md-4 offset-md-4">
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            name="email"
            value={email}
            onChange={handleChange}
            className="form-control mb-2"/>
          <button className="btn bt-primary" disabled={loading}>
            {loading ? <span>Loading</span> : <span>Send magic link</span>}
         </button>
        </form>
      </article>
    </section>
  )
}

export default Login
