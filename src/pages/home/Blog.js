import React, { useContext, useEffect } from 'react'
import { LayoutContext } from '../../context/layout.context'

export default function Blog() {

  const layout = useContext(LayoutContext)

  useEffect(()=>{
    
    layout.setLayout({
      showNav : true,
      showFooter: true,

    })

  },[])


  return (
    <div>Blog</div>
  )
}
