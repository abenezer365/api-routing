import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import FourO4 from './FourO4';

function Single() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async()=>{
      try{
        const res = await fetch('http://localhost:4000/products')
        const data = await res.json()
        const real = data.find(item => item.url === `/${id}`)
        setProduct(real)
      }
      catch(err){
        console.error('Error happened during fetching product', err.message)
      }
  })()
  }, [id]);

  if (!product) return <FourO4 />;

  const { product_name, image_url, brief, description, price , url} = product;

  return (
    <>  <br />
        <br />
        <br />
    <div className="text-center">
      <div className="row justify-content-center align-items-center d-flex flex-column">
        
      <div className={`col-md-5 text-center apple-style-product-info text-center`}>
                         <h2>{product_name}</h2>
                         <p>{description}</p>
                         <p>{brief}</p>
                         <p>{price}</p>
                         <Link to={`/iphones${url}`}>Learn more</Link>
        </div>
        <div className={`col-md-6 text-center mb-4 mb-md-0 apple-style-product-image-2`}>
            <img src={image_url} alt={`Image of ${product_name}`} />
        </div>
        
     </div>
      <Link to="/iphones" className='apple-style-subtitle arrow'> Back to all iPhones</Link>
    </div>
    </>
  );
}

export default Single;
