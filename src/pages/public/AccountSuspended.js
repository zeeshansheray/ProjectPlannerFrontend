import React, { useContext, useEffect } from 'react';
import { LayoutContext } from '../../context/layout.context';
import { UserContext } from '../../context/user.context';
import { useNavigate } from 'react-router-dom';

export default function AccountSuspended() {
  const layout = useContext(LayoutContext);
  const user = useContext(UserContext);

  const Navigate = useNavigate();


  useEffect(() => {
    layout.setLayout({
      showNav: false,
      showFooter: false,
    });
  }, []);

  useEffect(()=>{
    console.log('user ', user)
    if(!user.isRemoved) Navigate('/merchant', {replace : true})
  },[])

  return (
    <div id="AccountSuspended">
      <div className="container">
        <h1>Account Suspended</h1>
        <p className='Body15R mt_24'>Your account has been suspended for violating our terms of service.</p>
        <p className='mt_8'>
          Please contact us at <a className='color-themeColor'>projectecom4@gmail.com</a> for further assistance.
        </p>
      </div>
    </div>
  );
}
