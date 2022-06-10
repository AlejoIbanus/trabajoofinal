import styles from './styles.modules.css'
import { useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'


const ResetPosta = () => {
    const[data,setData] = useState({
        password:""
    })
    const navigate = useNavigate()

    const handleChange = ({currentTarget:input})=>{
        setData({...data,[input.name]:input.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem('tokenRegister')
            const url = `http://localhost:3001/api/auth/reset/${token}`;
            const {data:res} = await axios.post(url,data);
            navigate('/login')
            console.log(res.message);
        }catch(e){
            if(e.response && e.response.status >= 400 && e.response.status <= 500){
                setE(er.response.data.message)
            }
        }

    }

    const [e, setE] = useState();
    return(
        <div className={styles.reset_container}>
        <div className= {styles.reset_form_container}>
            <div className={styles.right}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h1>Inserte su nueva clave</h1>
                     <input
                     type="password" 
                     placeholder='clave'
                     name='password' 
                     onChange={handleChange}
                     value={data.password} 
                     required 
                     className={styles.input} />
                    {e && <div className={styles.e_msg}>{e}</div>}
                     <button type='submit' className={styles.green_btn}>
                         Cambiar clave
                     </button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default ResetPosta