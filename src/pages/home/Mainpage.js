import React, { useContext, useEffect } from 'react'
import { LayoutContext } from '../../context/layout.context'

import {PngIcons} from '../../icons'
import CustomButton from '../../components/CustomButton';

export default function Hero() {

  const layout = useContext(LayoutContext)

  useEffect(()=>{
    
    layout.setLayout({
      showNav : true,
      showFooter: true,
    })

  },[])


  return (
    <div id="Hero">
        <section id="hero" style={{backgroundImage : `url(${PngIcons.heroImg})`}}>
            <h4 className='Heading22B'>Trade-in-offer</h4>
            <h2 className='Heading42B'>Super value deals</h2>
            <h1 className='Heading50B'>On all products</h1>
            <p>Save more with coupons & up to 70% off! </p>
            <button style={{backgroundImage: `url(${PngIcons.wallImage})`}}>Shop Now</button>
        </section>

        <section id="feature" className="section-p1">
          <div className="fe-box">
            <img src={PngIcons.features.feature1} alt="" />
            <h6>Free Shipping</h6>
          </div>
          <div className="fe-box">
            <img src={PngIcons.features.feature2} alt="" />
            <h6>Online Order</h6>
          </div>
          <div className="fe-box">
            <img src={PngIcons.features.feature3} alt="" />
            <h6>Save Money</h6>
          </div>
          <div className="fe-box">
            <img src={PngIcons.features.feature4} alt="" />
            <h6>Promotions</h6>
          </div>
          <div className="fe-box">
            <img src={PngIcons.features.feature5} alt="" />
            <h6>Happy Sell</h6>
          </div>
          <div className="fe-box">
            <img src={PngIcons.features.feature6} alt="" />
            <h6>F24/7 Support</h6>
          </div>
        </section>
        
        <section id="product1" className="section-p1">
          <h2 className='Heading32B'>Featured Products</h2>
          <p className='Body18R'>Summer Collection New Morden Design</p>
          <div className="pro-container">
            <div className="pro">
              <img src={PngIcons.products.product1} alt />
              <div className="des">
                <span className='capitalize'>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$78</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart" /></a>
            </div>
            <div className="pro">
              <img src={PngIcons.products.product2} alt />
              <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$78</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart" /></a>
            </div>
            <div className="pro">
              <img src={PngIcons.products.product1} alt />
              <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$78</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart" /></a>
            </div>
            <div className="pro">
              <img src={PngIcons.products.product1} alt />
              <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$78</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart" /></a>
            </div>
            <div className="pro">
              <img src={PngIcons.products.product2} alt />
              <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$78</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart" /></a>
            </div>
            <div className="pro">
              <img src={PngIcons.products.product1} alt />
              <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$78</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart" /></a>
            </div>
            <div className="pro">
              <img src={PngIcons.products.product1} alt />
              <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$78</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart" /></a>
            </div>
            <div className="pro">
              <img src={PngIcons.products.product2} alt />
              <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$78</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart" /></a>
            </div>
          </div>
        </section>

        <section id="banner" className="section-m1" style={{backgroundImage: `url(${PngIcons.banner.banner1})`}}>
          <h4>Repair Services </h4>
          <h2>Up to <span>70% Off</span> – All t-Shirts & Accessories</h2>
          <button className="normal">Explore More</button>
        </section>

        <section id="product1" className="section-p1">
          <h2 className='Heading32B'>New Arrivals</h2>
          <p className='Body18R'>Summer Collection New Morden Design</p>
          <div className="pro-container">
            <div className="pro">
              <img src={PngIcons.products.product1} alt />
              <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$78</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart" /></a>
            </div>
            <div className="pro">
              <img src={PngIcons.products.product2} alt />
              <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$78</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart" /></a>
            </div>
            <div className="pro">
              <img src={PngIcons.products.product1} alt />
              <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$78</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart" /></a>
            </div>
            <div className="pro">
              <img src={PngIcons.products.product1} alt />
              <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$78</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart" /></a>
            </div>
            <div className="pro">
              <img src={PngIcons.products.product2} alt />
              <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$78</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart" /></a>
            </div>
            <div className="pro">
              <img src={PngIcons.products.product1} alt />
              <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$78</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart" /></a>
            </div>
            <div className="pro">
              <img src={PngIcons.products.product1} alt />
              <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$78</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart" /></a>
            </div>
            <div className="pro">
              <img src={PngIcons.products.product2} alt />
              <div className="des">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-Shirts</h5>
                <div className="star">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <h4>$78</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart" /></a>
            </div>
          </div>
        </section>

        <section id="sm-banner" className="section-p1">
            <div className="banner-box" style={{backgroundImage: `url(${PngIcons.banner.banner2})`}}>
            <h4>crazy deals</h4>
            <h2>buy 1 get 1 free</h2>
            <span>The best classic dress is on sale at cara</span>
            </div>
            <div className="banner-box banner-box2" style={{backgroundImage: `url(${PngIcons.banner.banner3})`}}>
                <h4>spring/summer</h4>
                <h2>upcomming season</h2>
                <span>The best classic dress is on sale at cara</span>
            </div>
        </section>

        <section id="banner3">
            <div className="banner-box" style={{backgroundImage: `url(${PngIcons.banner.banner4})`}}>
                <h2>SEASONAL SALE</h2>
                <h3>Winter Collection -50% OFF</h3>
            </div>
            <div className="banner-box banner-box2" style={{backgroundImage: `url(${PngIcons.banner.banner5})`}}>
                <h2>NEW FOOTWEAR COLLECTION </h2>
                <h3>Spring / Summer 2022</h3>
            </div>
            <div className="banner-box banner-box3" style={{backgroundImage: `url(${PngIcons.banner.banner6})`}}>
                <h2>T-SHIRTS</h2>
                <h3>New Trendy Prints</h3>
            </div>
        </section>

        <section id="newsletter" className="section-p1 section-m1">
          <div className="newstext">
              <h4>Sign Up For Newsletters</h4>
              <p>Get E-mail updates about our latest shop and <span>special offers.</span> </p>
          </div>
          <div className="form">
              <input type="text" placeholder="Your email address" />
              <button className="normal">Sign Up</button>
          </div>
        </section>

    </div>
  )
}
