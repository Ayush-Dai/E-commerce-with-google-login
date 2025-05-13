import React,{useEffect,useState} from 'react';
import ProductCard from './ProductCard';
import { Skeleton } from '../ui/skeleton';
import DialogBox from './DialogBox';
import { allproductsApi } from '../../APIs/GoogleApi';

function Product() {
  const [products, setProducts]=useState([]);
  const [loading, setLoading]=useState(true);
  const [selectedProduct, setSelectedProduct]=useState(null);

  useEffect(()=>{
    const fetchProducts=async()=>{
      try{
        const response=await  allproductsApi();
        if(response.status===200){
          setProducts(response.data.products);
          console.log(products);
        }else{
          console.error("failed to fetch products",response);
        }
        setLoading(false);
      }catch(e){
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  },[]);

return(<>
<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
{loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-72" />
          ))
        : products.length > 0
        ? products.map((product) => <ProductCard key={product._id} product={product} 
        onClick={()=>setSelectedProduct(product)}
        />)
        : <p className="col-span-full text-center text-gray-500">No products available.</p>
      }
  <DialogBox
  product={selectedProduct}
  onClose={()=>setSelectedProduct(null)}
  />    
    </div>
</>)

}

export default Product;