import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import './Login.css';
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import {app} from '../firebase'

const Join = ({history}) => {
    const auth = getAuth(app);

    const [form,setForm] = useState({
        email:'user03@email.com',
        password:'12341234'
    })

    const {email,password} = form;
    const onSubmit = (e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password)
        .then((success)=>{
            alert("회원가입 성공!");
            history.push('/login')           
        })
        .catch((error)=>{
            alert("회원가입 실패!" + error.message)
        })

    }


    const onChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
  return (
    <div>
        <form onSubmit={onSubmit}>
          <div className='login'>
            <h1>회원가입🙍‍♀️</h1>
            <input type="text" placeholder='이메일' name='email' value={email} onChange={onChange}/>
            <input type="password" name='password' value={password} onChange={onChange}/>
            <button>회원가입</button>
          </div>
        </form>
    </div>
  )
}

export default withRouter(Join) 