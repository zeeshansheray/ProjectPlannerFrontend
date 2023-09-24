import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CartContext } from '../../context/cart.context';
import { LayoutContext } from '../../context/layout.context'
import { PngIcons } from '../../icons'
import SvgIcons from '../../icons/svg.icon';
import {AuthService, ProductService} from '../../services'

export default function Product() {

    const layout = useContext(LayoutContext)
    const cart = useContext(CartContext)
    const location = useLocation();
    const [review, setReview] = useState();

    const [state, setState] = useState({
        product : location.state,
        selectedImageIndex : 0
    })

    const [selectedProduct, setSelectedProduct] = useState({
        productId : location.state?._id,
        quantity  : 1,
        color     : '',
        model     : '',
        type      : '',
        idx       : 0,
        size      : location.state?.sizes[0]?.size,
    })

    console.log('state ', state.product);

    useEffect(async ()=>{
      
        layout.setLayout({
          showNav : true,
          showFooter: true,
        })
    
        const {error, response}  = await ProductService.GetAllReview();
        console.log("response", response);
        if(response && response.success){
            let review;
            let rating = 0;
            let idx = 0;
            for (const element of response.data) {
                const user = await AuthService.getUser({payload: {userId:element.customerId }});
                console.log("user", user);
                if(element.productId === location.state?._id){
                    rating = rating + element.rating
                    review = {
                        reviews : review && review.reviews ? [...review.reviews, element.review] : [element.review],
                        usernames : review && review.usernames ? [...review.usernames, user.response.data[0].fullName] : [user.response.data[0].fullName]
                    }
                }

                idx = idx + 1;
            }

           if(rating > 0){
            review.rating = rating / review.reviews.length;
           } 
           console.log(review)
           setReview(review);
        }

      },[])

      const handleAddtoCart = async () => {
            console.log('cart', cart, state, selectedProduct);

            if(cart.products) { 
                let check = false;
                cart.products.map((element, idx)=>{
                    if(element.productDetails._id === state.product._id && (element.size === selectedProduct.size || !selectedProduct.size)){
                        check = true;
                        cart.products[idx].quantity = cart.products[idx].quantity + 1;
                    }
                })

                if(!check){
                    cart.products.push(
                        {
                            productDetails : state.product,
                            ...selectedProduct
                        }
                    )
                }

                cart.updateCart({ products: cart.products})
            }
            else {
                let product = {
                    productDetails : state.product,
                    quantity       : 1,
                }
                cart.updateCart({ products: [
                    product
                ]})
            }
            window.location.reload();
      }

      console.log('selectedProduct ', selectedProduct)

  return (
    <div id="SingleProduct">
        <div className="container">
            <div className="single-product">
                <div className="row">
                <div className="col-md-6">
                    <div className="product-image middle">
                    <div className="product-image-main">
                        <img src={state.product.images[state.selectedImageIndex]} alt id="product-main-image" />
                    </div>
                    <div className="product-image-slider">
                        {state?.product?.images.map((image, idx)=>idx != state.selectedImageIndex && <img onClick={()=>setState({...state, selectedImageIndex : idx})} src={image} alt className="image-list" />)}
                    </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="breadcrumb">
                    <span><Link to="/">Home</Link></span>
                    <span><Link to="/products">Products</Link></span>
                    <span className="active">{state.product.category.subcategory}</span>
                    </div>
                    <div className="product">
                    <div className="product-title capitalize">
                        <h2>{state.product.name}</h2>
                    </div>
                    <div className="product-rating">
                        {review?.rating  >= 1 && review?.rating <=5 ? <span><i className="bx bxs-star" /></span> : ""}
                        {review?.rating  >= 2 && review?.rating <=5 ? <span><i className="bx bxs-star" /></span> : ""}
                        {review?.rating  >= 3 && review?.rating <=5 ? <span><i className="bx bxs-star" /></span> : ""}
                        {review?.rating  >= 4 && review?.rating <=5 ? <span><i className="bx bxs-star" /></span> : ""}
                        {review?.rating  === 5 ? <span><i className="bx bxs-star" /></span> : ""}
                        
                        <span className="review ml_8">{review?.rating}</span>
                    </div>
                    <div className="product-price">
                        <span className="offer-price">{"$" + (state.product?.discount >0 ? state.product.price - state.product.discount : state.product.price)}</span>
                        <span className="sale-price">{state.product?.discount > 0 && "$ " + (state.product.price) }</span>
                    </div>
                    <div className="product-details">
                        <h3>Description</h3>
                        <p>{state.product.description}</p>
                    </div>
                    {state.product?.sizes?.length > 0 && <div className="product-size">
                        <h4>Sizes</h4>
                        <div className="size-layout">
                        {state.product?.sizes?.length > 0 && state?.product?.sizes.map((size, idx)=>
                        <>
                            <label onClick={()=>setSelectedProduct({...selectedProduct , size : size.size,availibility: size.availibility, idx : idx })} htmlFor={1} className={`size ${size.size == selectedProduct.size && 'selected'} `}>{size.size}</label>
                        </>
                        )}
                        </div>
                    </div>}

                    <div><h4>{(selectedProduct.availibility === "out" || parseInt(selectedProduct.quantity) === 0) ? "Out of Stock" : (selectedProduct.availibility === "limited" ? "Limited" : "In Stock")  } </h4></div>
                    {state.product.sizes[selectedProduct.idx]?.colors?.length > 0 && <div className="product-color">
                        <h4>Colors</h4>
                        <div className='d-flex flex-wrap'>
                            {state.product.sizes[selectedProduct.idx]?.colors?.length > 0 && state.product.sizes[selectedProduct.idx].colors.map((color)=>
                            <div onClick={()=>setSelectedProduct({...selectedProduct , color : color})} className="color-layout mr_10 middle" style={{backgroundColor : color}}>
                                {selectedProduct.color == color && <SvgIcons.IconTick color="#ffffff"/>}
                            </div>)}
                        </div>
                    </div>}
                    {state.product?.colors?.length > 0 &&<div className="product-color">
                        <h4>Colors</h4>
                        <div className='d-flex flex-wrap'>
                            {state.product?.colors?.length  > 0 && state.product?.colors?.map((color)=>
                            <div onClick={()=>setSelectedProduct({...selectedProduct , color : color})} className="color-layout mr_10 middle" style={{backgroundColor : color}}>
                                {selectedProduct.color == color && <SvgIcons.IconTick color="#ffffff"/>}
                            </div>)}
                        </div>
                    </div>}
                    {state.product?.models?.length > 0 &&<div className="product-color">
                        <h4>Models</h4>
                        <div className='d-flex flex-wrap'>
                            {state.product?.models?.length  > 0 && state.product?.models?.map((model)=>
                            <div onClick={()=>setSelectedProduct({...selectedProduct , model : model})} className={`${selectedProduct.model.includes(model) && 'selectedType'} capitalize singleType mr_10 middle`}>
                                {model}
                            </div>)}
                        </div>
                    </div>}
                    {state.product?.types?.length > 0 &&<div className="product-color">
                        <h4>Types</h4>
                        <div className='d-flex flex-wrap'>
                            {state.product?.types?.length  > 0 && state.product?.types?.map((type)=>
                            <div onClick={()=>setSelectedProduct({...selectedProduct , type : type})} className={`${selectedProduct.type.includes(type) && 'selectedType'} capitalize singleType mr_10 middle`}>
                                {type}
                            </div>)}
                        </div>
                    </div>}
                    <span className="divider" />
                    <div className="product-btn-group">
                        <button className="button add-cart" style={{border: "none"}} onClick={handleAddtoCart} disabled={(selectedProduct.availibility === "out" || parseInt(selectedProduct.quantity) === 0)}><i className={ (selectedProduct.availibility === "out" || parseInt(selectedProduct.quantity) === 0 ) ? "" : "bx bxs-cart"}/>{(selectedProduct.availibility === "out" || parseInt(selectedProduct.quantity) === 0) ? "Out of Stock" : "Add to Cart"}</button>
                        <div className="button heart"><i className="bx bxs-heart" /> Add to Wishlist</div>
                    </div>
                    </div>
                </div>
                </div>

                <div className='review'>
                <section className="py-5">
                    <div className="">
                        <div className="row">
                            {console.log("review.reviews", review)}
                            {review && review.reviews.length > 0 && review.reviews.map((element, idx)=>(
                                <div className="col-lg-6 mx-auto">
                                    <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded">
                                        <div className="blockquote-custom-icon bg-info shadow-sm"><i className="fa fa-quote-left text-white"></i></div>
                                        <p className="mb-0 mt-2 font-italic">{element}</p>
                                        <footer className="blockquote-footer pt-4 mt-4 border-top">
                                            <cite title="Source Title">{review.usernames[idx]}</cite>
                                        </footer>
                                    </blockquote>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                </div>
            </div>
        </div>
    </div>
  )
}
