import Image from "next/image"
import { AuthContext } from '@/src/contexts/AuthContext';
import styles from './styles.module.scss'
import logo from '../../../public/eh.png'
import { TbLogout } from 'react-icons/tb'
import { useContext } from 'react'



export function Header(){
    
    const {signOut, user} = useContext(AuthContext)
    
    
    
    
    return(
      
      <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                
            
                    <Image src={logo} alt={"Elanto logo"} className={styles.logo}/>
                    <h1 className={styles.welcome}>Bem vindo, {user.name}!</h1>

                <nav className={styles.menu}>
                   
                    <button onClick={signOut}>
                    <TbLogout size={30} style={{backgroundColor: "#18284c"}} />
                    </button>

                </nav>
           
           
            </div>
        </header>
    )
}