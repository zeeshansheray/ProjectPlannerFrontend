import React, {useEffect , useContext, useState} from 'react'
import { LayoutContext } from '../../context/layout.context';
import SidebarNav from '../../components/admin/sidebar/SidebarNav';
import { useFormik } from 'formik';
import CustomTextField from '../../components/CustomTextField';

import Autocomplete from '../../components/googleMap/Autocomplete';

import {AuthService} from '../../services'

import {AdminVld} from '../../validation'
import localforage  from 'localforage';
import { utils } from '../../utils';
import CustomSelect from '../../components/CustomSelect';
import CustomButton from '../../components/CustomButton';
import { CircularProgress } from '@material-ui/core';
import { UserContext } from '../../context/user.context';

export default function Settings() {
  
  const layout = useContext(LayoutContext);

  const initValues = {
    email    : '',
    fullName: '',
  }

  const [state, setState] = useState({
    loader : false,
  })

  const user     = useContext(UserContext)

  const [location, setLocation] = useState({
    lat         : '',
    lng         : '',
    address     : '',
    country     : '',
    city        : '',
    countryCode : '',
    state       : '',
})

  const formik = useFormik({
      initialValues   : {...initValues},
      validationSchema: AdminVld.UpdateAdmin,
      isInitialValid  : false,
  })

  useEffect(()=>{
    layout.setLayout({
      showNav   : false,
      showFooter: false,
    })
    onLoad();
  },[])

  const onLoad = async() =>{
    let user = await localforage.getItem('user');
    formik.setValues({
     email   : user?.email || '',
     fullName: user?.fullName || "",
     location:  user?.location || {},
    })
  }


  //asdad
  
    const onAddressChange = (event) => {
      setLocation({...location, address: event.target.value})
      formik.setValues({...formik.values, location: {...formik.values.location, address: event.target.value}})
    }

    const onCityChange = (event) => {
        setLocation({...location, city: event.target.value})
        formik.setValues({...formik.values, location: {...formik.values.location, city: event.target.value}})
    }

    const onCountryChange = (event) => {
        setLocation({...location, country: event.target.value})
        formik.setValues({...formik.values, location: {...formik.values.location, country: event.target.value}})
    }

    const locationUpdate = () => setLocation(formik.values.location)
    useEffect(locationUpdate, [formik.values.location])

    const locationSummary = (location) => {
      formik.setValues({...formik.values, location})
      setLocation(location)
  }

  const handleSubmitFunc = async() =>{
     setState({...state, loader : true})
     const {response, error}  = await AuthService.Update({payload : formik.values, toaster : true});
     if(response){
      user.updateUser(response.data);
     }
     setState({...state, loader : false})

  }


  return (
    <div className='d-flex'>
      <SidebarNav/> 
      <div className='component w-100'>
        <div className='d-flex space-between'>
          <h2 className='Headhing22M color-Heading mb_32'>
            General Settings
          </h2>
          <div>
            <CustomButton 
              btntext = {"Update"}
              onClick = {handleSubmitFunc}
              icon   = {(state.loader || !formik.isValid) && <CircularProgress size="15px" color="inherit" />}
              disabled = {state.loader || !formik.isValid}
            />
          </div>
        </div>
        <div className='w-40'>
        <CustomTextField
              value      = {formik.values.fullName}
              onChange   = {formik.handleChange}
              name       = "fullName"
              label      = "Full Name"
              helperText = {formik.errors.fullName}
              error      = {formik.errors.fullName}
              className  = "w-100"
          />
       </div>
       <div className='w-40 mt_16'>
        <CustomTextField
              value      = {formik.values.email}
              onChange   = {formik.handleChange}
              name       = "email"
              label      = "email"
              helperText = {formik.errors.email}
              error      = {formik.errors.email}
              className  = "w-100"
          />
       </div>
       
       <div className="w-40 mt_16">
          <Autocomplete 
              className       = "w-100"
              label           = "Address*"
              value           = {location?.address}
              onChange        = {onAddressChange}
              locationSummary = {locationSummary}
              autocomplete    = "off"
          />
          <div className="error fs-12">{
              location?.address && (location?.lat==='' || location?.lng==='' || !formik.values.location.lat || !formik.values.location.lng) && "Please type your address and select from dropdown"
          }</div>
         </div>
         <div className="w-40 mt_16 d-flex justify-content-space-between">
         <div className="w-48">
           <CustomTextField
             type         = "text"
             placeholder  = "City"
             label       = {"City"}
             name         = "city"
             value       = {location?.city}
             onChange    = {onCityChange}
             error={formik.touched.city && formik.errors.city}
             helperText={
               formik.touched.city && formik.errors.city
                 ? formik.errors.city
                 : ""
             }
           />
         </div>

         <div className="w-48">
           <CustomTextField
             type        = "text"
             placeholder = "Country"
             name        = "country"
             label       = {"Country"}
             background  = "white"
             value       = {location?.country}
             onChange    = {onCountryChange}
             error       = {formik.touched.country && formik.errors.country}
             helperText  = {
               formik.touched.country && formik.errors.country
                 ? formik.errors.country
                 : ""
             }
           />
         </div>  
         </div >
      </div>
    </div>
  )
}
