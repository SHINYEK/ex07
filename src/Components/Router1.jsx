import React from 'react'
import { Link, NavLink, Route, Switch, withRouter } from 'react-router-dom'
import Cart from './Cart'
import Home from './Home'
import Join from './Join'
import Login from './Login'
import Products from './Products'

const Router1 = ({history}) => {
    const style = {
        color:'skyblue'
    }
    const onClickLogout = (e)=>{
        e.preventDefault();
        sessionStorage.removeItem('email');
        history.push('/');
      }

  return (
    <div>
        <div className='menu'>
            <NavLink to="/" activeStyle={style} exact={true}>Home</NavLink>
            <NavLink to="/products" activeStyle={style}>상품검색</NavLink>
            {sessionStorage.getItem('email') ? 
              <NavLink to='#' onClick={onClickLogout}>로그아웃</NavLink>:
              <NavLink to='/login'>로그인</NavLink>}
            {sessionStorage.getItem('email')&& <NavLink to='/cart' style={{float:'right'}}>장바구니🛒</NavLink>}
              {sessionStorage.getItem('email') && <span style={{float:'right'}}>{sessionStorage.getItem('email')}님</span>}
        </div>
        
        <Switch>
            <Route path="/" component={Home} exact={true}/>
            <Route path="/products" component={Products}/>
            <Route path="/login" component={Login}/>
            <Route path="/join" component={Join}/>
            <Route paht="/cart" component={Cart}/>
            <Route render = {({location})=><h1>{location.pathname}존재하지 않는 페이지입니다.</h1>}/>
        </Switch>
    </div>
  )
}

export default withRouter(Router1) 