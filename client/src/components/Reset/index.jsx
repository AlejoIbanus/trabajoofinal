import styles from './styles.modules.css'
import { useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'

const Reset = () => {
    const[data,setData] = useState({
        email:""
    })
    const navigate = useNavigate()

    const handleChange = ({currentTarget:input})=>{
        setData({...data,[input.name]:input.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const url = 'http://localhost:3001/api/auth/forgotPassword';
            const {data:res} = await axios.post(url,data);
            localStorage.setItem('tokenRegister', res.data)
          
           
            navigate('/login')
            
        }catch(e){
            if(e.response && e.response.status >= 400 && e.response.status <= 500){
                setE(e.response.data.message)
            }
        }

    }

    const [e, setE] = useState();
    return(
        <div className={styles.reset_container}>
        <div className= {styles.reset_form_container}>
            <div className={styles.right}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h1>Inserte su email para verificar que es usted</h1>
                     <input
                     type="text" 
                     placeholder='Email de el usuario al cual le va a cambiar la clave'
                     name='email' 
                     onChange={handleChange}
                     value={data.email} 
                     required 
                     className={styles.input} />
                    {e && <div className={styles.e_msg}>{e}</div>}
                     <button type='submit' className={styles.green_btn}>
                         Enviar mail de confirmacion a esa cuenta de correo
                     </button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Reset