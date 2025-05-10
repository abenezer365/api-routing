import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Iphones() {
    const [data, setData] = useState([])
    useEffect(()=>{
        //Actual fetching URL 'http://localhost:4000/products'
        //For now I use local API
        (async()=>{
            try{
              const res = await fetch('http://localhost:4000/products')
              const JSON = await res.json()
              setData(JSON)
            }
            catch(err){
              console.error('Error happened during fetching Datas', err.message)
            }
        })()
              
    },[])
  return (
    <>
    <div className='text-center'>
        <br />
        <br />
        <br />
        <div className="apple-style-title">Iphones</div>
        <div className="apple-style-subtitle">The best for the brightest.</div>
    </div>

    <div className="apple-style-body">
    <div className="container apple-style-hero">     
     {
        data.map((single, index)=>{
            const isEven = (index % 2 ===0)
            const {id: productid, product_name,image_url,brief, description, price, url} = single
            return(
                <div  key={productid} className="row justify-content-center align-items-center">
                <div className={`order-2 col-md-6 text-center mb-4 mb-md-0 apple-style-product-image order-md-${isEven ? 2 : 1}`}>
                    <img src={image_url} alt={`Image of ${product_name}`} />
                </div>
                <div className={`col-md-5 text-md-start text-center apple-style-product-info order-md-${isEven ? 1 : 2}`}>
                    <h2>{product_name}</h2>
                    <p>{description}</p>
                    <p>{brief}</p>
                    <p>{price}</p>
                    <Link to={`/iphones${url}`}>Learn more</Link>
                </div>
                </div>
            )
            })
            }
        </div>
        </div>
    </>
  )
}

export default Iphones
