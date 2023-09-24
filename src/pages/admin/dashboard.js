import React, {useEffect , useContext, useState} from 'react'
import { LayoutContext } from '../../context/layout.context';
import SidebarNav from '../../components/admin/sidebar/SidebarNav';
import ProjectService from '../../services/Project';
import Loader from '../../components/Loader';
import { useNavigate, useParams } from 'react-router-dom';

export default function Dashboard() {

  const navigate = useNavigate();
  const params = useParams();
  const [state, setState] = useState({
    projects : [],
    loader : false,
    archived : 0,
    completed: 0,
  })

  
  const layout = useContext(LayoutContext);

  useEffect(()=>{
    layout.setLayout({
      showNav   : false,
      showFooter: false,
    })
  },[])

  const OnLoad = async() =>{
    setState({...state, loader : true})
    let query = {
      createdBy : params.id,
    }
    const {response, error} =  await ProjectService.GetProjects({query})
    if(response){
      let archived = 0
      let completed = 0
      
      response.data.forEach((data)=>{
        if(data?.archived) archived += 1
        else if(data?.completed) completed += 1
      })
      console.log('response ', response.data);
      setState({...state, projects : response.data, completed : completed, archived: archived, loader : false});
    }
    else{
      setState({...state, loader : false})
    }
  }


  useEffect(()=>{
    OnLoad();
  },[])


  return (
    <>{
      state.loader ? 

      <Loader /> 
      
      :
    <div id="AdminDashboard" className='d-flex'>
      <SidebarNav/> 
      <div className='component w-100'>
          <div className='topRow '>
            <div className='singleBox cp' onClick={()=>navigate('projects/all')}>
                <p className='Body14R color-Heading'>Total Projects</p>
                <h4 className='Heading24M color-Heading mt_4'>{state.projects?.length}</h4>
            </div>
            <div className='singleBox cp' onClick={()=>navigate('projects/completed')}>
                <p className='Body14R color-Heading'>Completed Projects</p>
                <h4 className='Heading24M color-Heading mt_4'>{state?.completed}</h4>
            </div>
            <div className='singleBox cp' onClick={()=>navigate('projects/archived')}>
                <p className='Body14R color-Heading'>Archived Projects</p>
                <h4 className='Heading24M color-Heading mt_4 capitalize'>{state?.archived}</h4>
            </div>
          </div>

      </div>
      

    </div>
    }
    </>
  )
}
