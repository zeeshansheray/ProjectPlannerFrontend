import { CircularProgress } from '@material-ui/core';
import React,{useEffect , useContext} from 'react'
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomButton from '../../components/CustomButton';
import CustomTextField from '../../components/CustomTextField';
import RatingComponent from '../../components/Rating';
import { LayoutContext } from '../../context/layout.context';
import ProductService from '../../services/Product';

export default function CheckoutSuccess() {

  const layout = useContext(LayoutContext)

  const [searchParams] = useSearchParams();
  const [order, setOrders] = useState();
  const [loader, setLoader] = useState(false);
  const [review, setReview] = useState([]);

  useEffect(async ()=>{
    
    layout.setLayout({
      showNav : true,
      showFooter: true,

    })

    console.log(searchParams.get('success'))

    const {error, response} = await ProductService.GetAllOrders();
    const order = response && response.success && response.data.length > 0 && response.data.filter((item, idx)=>{
      if(searchParams.get('orderId') === item._id){
        return true;
      }
      return false;
    })

    if(order) setOrders(order[0]);

  },[]);


  const handleSubmitReview = async () => {
    console.log("review", review);
    setLoader(true);
    for (const item of review) {
      let payload = item;
      const {response, error} = await ProductService.CreateReview({payload})     
    }

    setLoader(false)
    window.location.href = (window.location.href.includes("localhost")) ? "http://localhost:3000/" : "https://myutopiah.com"
  }

  const handleReview = async (e, product) => {
    let array = review;

    let check = false;
    array.map((element, idx)=>{
      if(element.productId === product._id){
        array[idx].review = e.target.value

        check = true;
      }
    })

    if(!check){
      array.push({
        review : e.target.value,
        productId: product._id,
        orderId: order._id,
        customerId: order.customerId
      })
    }
    console.log("1",array)
    setReview(array)
   
  }


  const handleRating = async (e, product) => {
    let array = review;

    let check = false;
    array.map((element, idx)=>{
      if(element.productId === product._id){
        array[idx].rating = e
        check = true;
      }
    })

    if(!check){
      array.push({
        rating : e,
        productId: product._id,
        orderId: order._id,
        customerId: order.customerId
      })
    }

    console.log("2",array)
    setReview(array)
   
  }

  return (
      <div id={searchParams.get('success')  ? "CheckoutSuccess" : "CheckoutCancelled"} className='middle'>
     { searchParams.get('success') !== null ? <div className="card middle">
        <div className='middle' style={{borderRadius: 200, height: 200, width: 200, background: '#F8FAF5', margin: '0 auto'}}>
          <i className="checkmark">✓</i>
        </div>
        <h1 className='text-center'>{searchParams.get('success') ? "Success" : "Cancelled"}</h1> 
        <p className='text-center'>We received your purchase request;<br /> we'll be in touch shortly!</p>
      </div> : ""}
      { searchParams.get('orderId') && order && order.cart.length > 0 && <div className='reviews w-80 mt-5'>
       <div className='row h5 font-weight-bold text-center'>
          <div className='col-md-2'>
            Product Name
          </div>
          <div className='col-md-2'>
            Product Image
          </div>
          <div className='col-md-5'>
            Review    
          </div>        
          <div className='col-md-3'>
            Ratings
          </div>
        </div>
        {
          order && order.cart && order.cart.map((element, idx)=>(
            <div className='row text-center py-4'>
              <div className='col-md-2 align-self-center'>
                {element.productDetails.name}
              </div>
              <div className='col-md-2 align-self-center'>
                <img src={element.productDetails.images[0]} width="60px" height="60px"/>
              </div>
              <div className='col-md-5 align-self-center'>
                <CustomTextField
                    type         = "text"
                    name         = "review"
                    className    = "lh-24"
                    autoFocus    = {true}
                    onChange     = {(e)=>{handleReview(e, element.productDetails)}}
                  />    
              </div>        
              <div className='col-md-3 align-self-center'>
                <RatingComponent handleRating={(e)=>{handleRating(e, element.productDetails)}}/>
              </div>
            </div>
          ))
        }   
      </div>}

      { searchParams.get('orderId') && order && order.cart.length > 0 && <div className='w-80'>
        <CustomButton
          varient="primary"
          btntext="Submit"
          className="w-100 hpx-52"
          disabled={loader}
          onClick={handleSubmitReview}
          icon={
            loader && <CircularProgress size={20} color={"inherit"} />
          }
        />
      </div>}
    </div>

  )
}
