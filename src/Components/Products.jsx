import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {app} from '../firebase'
import {getDatabase, ref, set, push} from 'firebase/database'

const Products = ({history}) => {
  //초기화작업 (db와 auth는 앱을 초기화한 값을 넣어줘야한다. app에 firebase초기화 정보가 있음)
  const db = getDatabase(app);

  const [products,setProducts] = useState(null);
  const [page,setPage] = useState(1);
  const[last,setLast]= useState(1);
  const [query,setQuery] = useState('노트북');
  const callAPI = async()=>{
    const url="/v1/search/shop.json";
    const config = {
      headers:{'X-Naver-Client-Id': 'DSISkunI4gxjpwj6Yl6J',
      'X-Naver-Client-Secret': 'CxLnF9_VmQ'},
      params:{query:query,start:1,display:12,page:page}
    }
    
    const result = await axios(url, config)
    console.log(result.data);
    setProducts(result.data.items);
  }

  useEffect(()=>{
    callAPI();
  },[page])

  const onSubmit=(e)=>{
    e.preventDefault();
    callAPI();
  }

  const onClickCart = (product) =>{
    if(!sessionStorage.getItem('email')){
      alert("로그인 후 사용해주세요!");
      history.push('/login');
    }else{
      //장바구니 상품 저장
      console.log(product);
      let email = sessionStorage.getItem('email');
      email = email.replace('@','');
      email = email.replace('.','');
      set(ref(db,`cart/${email}/${product.productId}`),product);
      alert("장바구니 담기 성공!");
    }
  }

  if(products===null){
    return <h1>Loading......</h1>
  }

  return (
    <div>
        <h1>상품검색</h1>
        <form onSubmit={onSubmit}>
          <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} className="search"/>
          <button className='button'>검색</button>
        </form>
        <div className='products'>
          {products.map(p=>(
            <div key={p.productId} className='product'>
              <img src={p.image}  width={200} className='notebook'/>
              <div dangerouslySetInnerHTML={{ __html: p.title }} className='ellipsis title'/>
              <div style={{fontSize:'14px'}}>가격: {p.lprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}원</div>
              <button className='cart' onClick={()=>onClickCart(p)}>장바구니</button>
            </div>
              ))}
        </div>
         
         <div style={{marginTop:'20px'}}>
          <button onClick={()=>setPage(page-1)} disabled={page===1} className='button'>이전</button>
          <span style={{margin:'10px'}}>{page}</span>
          <button onClick={()=>setPage(page+1)} className='button'>다음</button>
         </div>

     </div>

    



  )
}

export default Products