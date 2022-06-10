import styles from './styles.module.css';
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'
const Signup = () => {
    const[data,setData] = useState({
        name:"",
        age:"",
        email:"",
        password:""
    })
    const [e, setE] = useState();

    const navigate = useNavigate()

    const handleChange = ({currentTarget:input})=>{
        setData({...data,[input.name]:input.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const url = 'http://localhost:3001/api/auth/register';
            const {data:res} = await axios.post(url,data);
            navigate("/login")
            console.log(res.message);
        }catch(e){
            if(e.response && e.response.status >= 400 && e.response.status <= 500){
                setE(e.response.data.message)
            }
        }

    }
    
    return (
        <div className={styles.signup_container}>
            <div className= {styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome</h1>
                    <Link to='/login'>
                        <button type='button' className={styles.white_btn}>
                            Singin
                        </button>

                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input
                         type="text" 
                         placeholder='Name'
                         name='name' 
                         onChange={handleChange}
                         value={data.name} 
                         required 
                         className={styles.input} />
                         <input
                         type="text" 
                         placeholder='Age'
                         name='age' 
                         onChange={handleChange}
                         value={data.age} 
                         required 
                         className={styles.input} />
                         <input
                         type="text" 
                         placeholder='Email'
                         name='email' 
                         onChange={handleChange}
                         value={data.email} 
                         required 
                         className={styles.input} />
                         <input
                         type="password" 
                         placeholder='Password'
                         name='password' 
                         onChange={handleChange}
                         value={data.password} 
                         required 
                         className={styles.input} />
                        {e && <div className={styles.error_msg}>{e}</div>}
                         <button type='submit' className={styles.green_btn}>
                             Signup
                         </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup