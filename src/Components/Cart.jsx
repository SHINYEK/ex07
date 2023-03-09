import React, { useEffect, useState } from 'react'
import {app} from '../firebase'
import {getDatabase,ref,onValue,remove} from 'firebase/database'

const Cart = () => {
    const db = getDatabase(app);
    const [cart, setCart] = useState(null);
    const callAPI = () =>{
        let email = sessionStorage.getItem('email');
        email = email.replace('@','').replace('.','');
        //레퍼런스 주소, 스냅샷으로 결과 들어옴
        onValue(ref(db,`cart/${email}`),(snapshot)=>{
            let rows = [];
            snapshot.forEach(row =>{
               rows.push(row.val());
            })
            setCart(rows)
        });
    }

    useEffect(()=>{
        callAPI();
    },[])

    const onClickDelete = (id) =>{
        if(!window.confirm(id+"번 상품을 삭제하시겠습니까?"))return;
        //장바구니 id상품 삭제
        let email = sessionStorage.getItem('email').replace('@','');
        email = email.replace('.','');
        remove(ref(db,`cart/${email}/${id}`))
    }

    if(cart===null){
        return<h1>Loading......</h1>
    }
  return (
    <div>
        <h1>장바구니</h1>
        <table>
            <thead>
                <tr>
                    <td>상품번호</td>
                    <td>상품이미지</td>
                    <td>상품명</td>
                    <td>상품가격</td>
                    <td>삭제</td>
                </tr>
            </thead>
            <tbody>
                {cart.map(c=>(
                    <tr key={c.productId}>
                        <td style={{fontWeight:'bold', color:'green'}}>{c.productId}</td>
                        <td><a href={c.link}><img src={c.image} width={100} /></a></td>
                        <td><div dangerouslySetInnerHTML={{ __html: c.title }} /></td>
                        <td>{c.lprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}원</td>
                        <td><button className='cart' style={{margin:'0px'}} onClick={()=>{onClickDelete(c.productId)}}>삭제</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Cart