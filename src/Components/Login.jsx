import React, { useState } from 'react'
import './Login.css';
import {app} from '../firebase'
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import { Link } from 'react-router-dom';


const Login = ({history}) => {
  const auth = getAuth(app);
  const onSubmit = (e) =>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
    .then((success)=>{
      alert("로그인 성공!");
      sessionStorage.setItem('email',email);
      history.go(-1);
    })
    .catch((error)=>{
      alert("로그인 실패!"+error.message)
    })
  }

  const[form,setForm] = useState({
    email:'user01@email.com',
    pass:'12341234'
  })

  const{email,pass} = form;

  const onChange = (e) =>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  return (
    <div>
        <form onSubmit={onSubmit}>
          <div className='login'>
            <h1>Login🔒</h1>
            <input type="text" placeholder='이메일' name='email' value={email} onChange={onChange}/>
            <input type="password" name='pass' value={pass} onChange={onChange}/>
            <button>로그인</button>
            <Link to='/join'><button>회원가입</button></Link>
          </div>
        </form>
    </div>
  )
}

export default Login