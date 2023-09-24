import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/Loader'
import { LayoutContext } from '../../context/layout.context'
import { PngIcons } from '../../icons'
import { ProductService } from '../../services'
import CustomTextField from '../../components/CustomTextField';
import SvgIcons from '../../icons/svg.icon';
import CategoryList from '../../utils/CategoriesDetail.json'
import { UserContext } from '../../context/user.context'
import AuthService from '../../services/Auth';

export default function Shop() {

  const layout = useContext(LayoutContext)
  const navigate = useNavigate();
  const params = useParams();

  const [show, setShow] = useState({
    mainLoader      : false,
  })

  const [state, setState] = useState({
    products           : [],
    selectedCategory   : {},
    filteredProducts   : [],
    categoryShowIndex  : 15,
    selectedSubCategory: "",
    merchant           : {}
  })

  useEffect(()=>{
    layout.setLayout({
      showNav : true,
      showFooter: true,
    })

  },[])



  const OnLoad = async() =>{
    setShow({...show, mainLoader: true})
    let merchant = await getUser();
    let query = {
      createdBy : params.id
    }
    const {response, error} =  await ProductService.GetProducts({query: query})
    if(response){
      setState({...state, products : response.data, filteredProducts : response.data, merchant : merchant});
      setShow({...show, mainLoader: false})
    }
    else{
      navigate(`notfound`, {replace : true})
      setShow({...show, mainLoader: false})
    }
  }

  const getUser = async() => {
    let query = {_id : params.id, delete : false}
    const {response, error} = await AuthService.GetUser({query});
    if(response){
      return response.data[0]
    }
    else{
      return {}
    }
  }


  useEffect(()=>{
    OnLoad();
  },[])

  console.log('show ', state.merchant)


  const handleSearchProduct = (e) =>{
    let filteredProducts = state.products.filter((product)=>{
        return product.name.toLowerCase().includes(e.target.value.toLowerCase());
    })

    if(e.target.value == ""){
      setState({...state, filteredProducts : state.products})
    }
    else{
      setState({...state, filteredProducts : filteredProducts})
    }
  
  }

  return (
      <div id='Shop'>
          {show.mainLoader ? 

          <Loader />

          :

          <div>
            <section id="product1" className="section-p1">
            <div className=' w-100  d-flex justify-flex-end align-items-center'>
                  <div className='w-30 d-flex justify-flex-end mb_16'>
                    <CustomTextField 
                          className   = "w-100"
                          placeholder = "Search Product"
                          icon        = <SvgIcons.SearchIcon fill={"#84889b"}/>
                          position    = "start"
                          onChange    = {(e)=>handleSearchProduct(e)}
                          top         = {7}
                          left        = {10}
                      />
                  </div>
              </div>
              <div className='row'>
              <div className='col-md-4 pt_20 text-left'>
                 <div className='w-90 '>
                    <div className='d-flex align-items-center'>
                      {state.merchant?.image && <img src={state?.merchant?.image} height={50} className={'border object-fit-cover borderRadius-50'} width={50} />}
                      <h2 className='Heading18B mb_0 color-Heading cp ml_12'>{state.merchant?.storeName}</h2>
                    </div>
                    {state.merchant?.description && <p className='Body14R mt_24 color-neutral80'><span className='Heading16B color-Heading'>About:</span> {state.merchant?.description}</p>}
                    {state.merchant?.location && <p className='Body14R mt_16 color-neutral80'> <span className='Heading16B color-Heading'>Location:</span> {state.merchant?.location?.address}</p>}
                    {state.merchant?.phone && <p className='Body14R mt_16 color-neutral80'> <span className='Heading16B color-Heading'>Phone:</span> +{state.merchant?.phone}</p>}
                    {state.merchant?.email && <p className='Body14R mt_16 color-neutral80'> <span className='Heading16B color-Heading'>Email:</span> {state.merchant?.email}</p>}
                  
                 </div>
                  <div className='mt_24'>

                  </div>
              </div>
              <div className="pro-container col-md-8 mt_32 h-fit">


          {state.filteredProducts.length == 0 ? 
            <div className='emptyScreen middle w-100'>
             <img src={PngIcons.products.noProducts} width="200px" alt=""/> 
            </div>

            :

            <>

                {state.filteredProducts.length > 0 && state?.filteredProducts.map((product, idx)=>
                <div className="pro cp" onClick={()=>navigate(`/products/${product._id}`, {state : product})}>
                  <img height={227}  width={227} src={product.images.length > 0 ? product.images[0] :  PngIcons.products.product1} alt />
                  <div className="des">
                    <span className='capitalize'>{product.storeName}</span>
                    <h5 className='capitalize'>{product.name}</h5>
                    <div className="star">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                    </div>
                    <h4 className='Body22B'>$ {product?.discount > 0 ? 'QR ' + (product.price-product.discount) : product.price }<span className='beforePrice Body16R line-through color-Heading'>{"  " + product.discount > 0 && product.price}</span></h4>
                  </div>
                  <Link to={(`/products/${product._id}`, {state: product})}><i className="fal fa-shopping-cart cart" /></Link>
                </div>)}
                </>}
              </div>
              </div>
            </section>
          </div>
          }
      </div>

  )
}
