import styles from './styles.modules.css'
import { useState, useEffect } from 'react';
const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    const[data,setData] = useState()

    const getTracks = async (e) => {
        
        try{
            
            
            axios.get('htpp://localhost:3001/api/tracks')
            .then(response => {
                console.log(response.data)
            })
            .catch(e => {
                // Podemos mostrar los errores en la consola
                console.log(e);
            })
           
            
           
            
            
        }catch(e){
            if(e.response && e.response.status >= 400 && e.response.status <= 500){
                setE(e.response.data.message)
            }
        }

    }

    useEffect(() => {
        getTracks()
       
        
      },[]);

    return(
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>App</h1>
                <button className= {styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>
           
            

        </div>
    )
}

export default Main