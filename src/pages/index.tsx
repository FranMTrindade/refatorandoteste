import Head from "next/head"
import Image from "next/image"
import { FormEvent, useContext, useState } from "react"
import logo from '../../public/logo.png'
import styles from '../styles/home.module.scss'

import { AuthContext } from "../contexts/AuthContext"

export default function Home() {
  
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event:  FormEvent) {
    event.preventDefault();

    let data = {
      email,
      password
    }
    
    await signIn(data)
  }
  
  return (

   <>
    
    <Head>
      <title>Elando - Login</title>
    </Head>
    
    <div className={styles.container}>
    
      <Image className={styles.logo} src={logo} alt="Logo elanto"/>
        
      
      <form onSubmit={handleLogin}>
            <input type='email' placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type='password' placeholder="Senha*" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type='submit'>Entrar</button>
      </form>
    
    </div>
   
    </>
  )
}
