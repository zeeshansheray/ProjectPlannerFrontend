import React from 'react'
import PngIcons from '../../icons/png.icon';
import { useNavigate, Link, useParams } from 'react-router-dom';
import CustomTextField from '../../components/CustomTextField';
import SvgIcons from '../../icons/svg.icon';
import { LayoutContext } from '../../context/layout.context';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import CustomButton from '../../components/CustomButton';
import CustomModal from '../../components/CustomModal';
import { ProjectService } from '../../services';
import Loader from '../../components/Loader';
import SidebarNav from '../../components/admin/sidebar/SidebarNav';
import CustomTextArea from './../../components/CustomTextArea';
import { useFormik } from 'formik';
import { CircularProgress } from '@material-ui/core';
import localforage from 'localforage';
import CustomRadio from './../../components/CustomRadio';

export default function Projects() {

  const layout            = useContext(LayoutContext)
  const params            = useParams();
  const navigate          = useNavigate();
  const [state, setState] = useState({
    projects       : [],
    selectedProject: {},
    filteredProject: []
  })

  const [sortOrder, setSortOrder] = useState('A-Z');
  const [techStacksFilter, setTechStacksFilters] = useState([]);


  const [show, setShow] = useState({
    modal       : false,
    completeModal : false,
    deleteLoader: false,
    filter : false,
    mainLoader  : true,
  })

  useEffect(()=>{
    layout.setLayout({
      showNav : false,
      showFooter: false,
    })
    OnLoad();
  },[])



  const OnLoad = async() =>{
    setShow({...show, mainLoader: true})
    let query = {
      createdBy : params.id,
    }
    const {response, error} =  await ProjectService.GetProjects({query})
    if(response){
      let filtered = [];
      
      response.data.forEach((data)=>{
        if(!data?.completed && !data?.archived) filtered.push(data)
      })

      console.log('response ', filtered);
      setState({...state, projects : filtered, filteredProject : filtered});
    }
    setShow({...show, mainLoader: false})

  }

  const handleSearchFunc = (e) => {
    const filteredData = state.projects.filter((project)=>{
      return project.name.toLowerCase().includes(e.target.value.toLowerCase())
    })

    setState({...state, filteredProject : filteredData})
  }


  const applyFilterFunc = () => {
    // Filter projects based on selected tech stacks
    const filteredProjects = state.projects.filter((project) => {
      // Check if all selected tech stacks are present in the project's tech stacks
      return techStacksFilter.every((stack) => project.techStacks.includes(stack));
    });
  
    // Sort the filtered projects based on the selected order
    let sortedProjects = [...filteredProjects];
  
    if (sortOrder === 'A-Z') {
      sortedProjects.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'Z-A') {
      sortedProjects.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOrder === 'New-Old') {
      sortedProjects.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    } else if (sortOrder === 'Old-New') {
      sortedProjects.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }
  
    setState({ ...state, filteredProject: sortedProjects });
    setShow({...show, filter : false})
  };
  
  const techStacks = [
    "JavaScript",
    "React",
    "Angular",
    "Vue.js",
    "Python",
    "Ruby",
    "Node.js",
    "Express.js",
    "PHP",
    "Java",
    "C#",
    "ASP.NET",
    "Ruby on Rails",
    "Django",
    "Laravel",
  ];
  

  const handleAddTagFunc = (stack) => {
    let allTechStacks = techStacksFilter;
    if(allTechStacks.includes(stack)){
      allTechStacks = allTechStacks.filter((currentStack)=>{
        return currentStack !== stack
      })
    }
    else{
      allTechStacks.push(stack);
    }
    setTechStacksFilters([...allTechStacks])
  }
  
  const handleCompleteFunc = async(key) => {
    let response;
    let updateList = [];
    if(key == "complete"){
      response = await ProjectService.UpdateProject({
        payload: { completed : new Date().getTime(), _id: state.selectedProject._id },
      });
    }
    else{
      response = await ProjectService.UpdateProject({
        payload: { archived : true, _id: state.selectedProject._id },
      });
    }

    console.log('2 ', response.response.data._id)

    state.filteredProject.forEach((project,idx)=>{
      if(project._id != response.response.data._id){
        updateList.push(project)
      }
    })
    setState({...state, projects : [...updateList], filteredProject : [...updateList],  selectedProject : null})
    setShow({...show, completeModal : false})
  }


  return (
    <div className='d-flex w-100'> 
        <SidebarNav/>
        {show.mainLoader ? 
        
        <Loader/>

        :
        
        <div id="MerchantProducts" className='w-100'>
            <h4  className = 'Heading22B color-heading'>
              Projects List
            </h4>
            {(!show.mainLoader && state.projects.length > 0  && state.filteredProject.length > 0) ? <>
           <div className='d-flex justify-flex-end'>
              <div className='middle mr_8 cp position-relative'>
                <div onClick={()=>setShow({...show, filter : !show.filter})}>
                <SvgIcons.FilterIcon/>
                </div>
                {show.filter && <div className='position-absolute cardBox'>
                  <div className='Heading16M'>Sort:</div>
                  <div className='d-flex '>
                    <label className='mr_16'>
                      <input
                        type="radio"
                        className='mr_5'
                        name="sort"
                        value="A-Z"
                        checked={sortOrder === 'A-Z'}
                        onChange={() => setSortOrder('A-Z')} // Set the sortOrder state when the radio button is clicked
                      />
                      A-Z
                    </label>
                    <label className='mr_16'>
                      <input
                        type="radio"
                        className='mr_5'
                        name="sort"
                        value="Z-A"
                        checked={sortOrder === 'Z-A'}
                        onChange={() => setSortOrder('Z-A')} // Set the sortOrder state when the radio button is clicked
                      />
                      Z-A
                    </label>
                    <label className='mr_16'>
                      <input
                        type="radio"
                        className='mr_5'
                        name="sort"
                        value="New-Old"
                        checked={sortOrder === 'New-Old'}
                        onChange={() => setSortOrder('New-Old')} // Set the sortOrder state when the radio button is clicked
                      />
                      New-Old
                    </label>
                    <label className='mr_16'>
                      <input
                        type="radio"
                        name="sort"
                        value="Old-New"
                        className='mr_5'
                        checked={sortOrder === 'Old-New'}
                        onChange={() => setSortOrder('Old-New')} // Set the sortOrder state when the radio button is clicked
                      />
                      Old-New
                    </label>
                  </div>
                  <div className="mt_8">
                    <div className='customLabel'>
                      Tech Stacks
                    </div>
                    <div className='d-flex flex-wrap'>
                      {
                        techStacks.map((stack)=>
                        <div onClick={()=>handleAddTagFunc(stack)} className={`${techStacksFilter.includes(stack) && 'active' } singleStack Heading14M cp`}>
                            {stack}
                        </div>
                        )
                      }
                    </div>
                  </div>
                  <div className='d-flex justify-flex-end mt_16'>
                      <CustomButton 
                        onClick={()=>setShow({...show, filter : false})}
                        btntext={"Close"}
                        varient="secondary"
                      />
                      {((sortOrder != "A-Z") || (techStacksFilter.length > 0)) && <CustomButton 
                        onClick={()=>{setTechStacksFilters([]); setSortOrder('A-Z')}}
                        btntext={"Reset Filter"}
                        varient="warning"
                        className={"ml_12"}
                      />}
                      <CustomButton
                        onClick={applyFilterFunc}
                        btntext={'Apply'}
                        className={"ml_12"}
                      />
                  </div>
                </div>}
              </div>
              <div className='w-25'>
                <CustomTextField 
                   placeholder={"Search project by name"}
                   onChange={(e)=>handleSearchFunc(e)}
                   
                />
              </div>
              <div className='ml_8'>
                <CustomButton 
                  btntext={"Create New"}
                  onClick={()=>setShow({...show, modal : true})}
                />
              </div>
            </div>
            <div id="MerchantShop">
                <section id="product1">
                <div className="pro-container">
                    {state.filteredProject.map((project, idx)=>
                    <div className="pro mr_24 position-relative" onClick={()=>{setState({...state, selectedProject : project}); setShow({...show, modal : true})}}>
                    <img height={277} width={277} className='object-fit-cover' src={project.image} alt />
                    <div className="des">
                        <div className='capitalize Heading18B text-center'>{project.name}</div>
                        <div className='capitalize Heading14M'>{"Description: " +project.description}</div>
                        <div className='capitalize Heading14M'>{"Start Date: " +new Date(project.startDate).getDate()+'/'+new Date(project.startDate).getMonth()+'/'+new Date(project.startDate).getFullYear()}</div>
                        <div onClick={(e)=>e.stopPropagation()} className=' Heading14M'>Github Url: <a href={project.githubUrl} target="_blank" rel="noreferrer">{project.githubUrl}</a></div>
                         <div onClick={(e)=>e.stopPropagation()} className=' Heading14M'>Live Url: <a href={project.liveUrl} target="_blank" rel="noreferrer">{project.liveUrl}</a></div>
                    </div>
                      <div className='position-absolute viewMoreIcon'  onClick={(e)=>{e.stopPropagation(); setState({...state, selectedProject : project}); setShow({...show, completeModal : !show.completeModal}) }}>
                        <SvgIcons.ViewMoreIcon height={"23px"} width={"23px"}/>
                        {((state.selectedProject?._id == project._id) && show.completeModal) && <div className='viewMoreBoxComplete'>
                          <div className='cp Heading14M text-left' onClick={()=>handleCompleteFunc('complete')}>
                              Mark Complete
                          </div>
                          <div className='cp Heading14M text-left' onClick={()=>handleCompleteFunc('archive')}>
                              Archive
                          </div>
                        </div>}
                      </div>
                      
                      </div>
                    )}
                </div>
                </section>
            </div>
           </>
            :
            <div className='absoluteMiddle'>
                <div className='Heading24B'>No Projects Found!!!</div>
            </div>
          
          }
        </div>
        

        
        }

        <CustomModal 
          component={<CreateProjectModal techStacks={techStacks} setState={setState} state={state} onClose={()=>{setShow({...show, modal : false});setState({...state, selectedProject : null}) }}/>}
          open={show.modal}
          onClose={()=>{setShow({...show, modal : false}); setState({...state, selectedProject : null})}}
          minWidth={"40vw"}
        />
    </div>
  )
}


const CreateProjectModal = ({onClose, state , setState, techStacks}) => {
  const [show, setShow] = useState({
    loader : false
  })

  const params = useParams();

  const initValues = {
    name : state.selectedProject?.name || '',
    description: state.selectedProject?.description ||'',
    image: state.selectedProject?.image ||'',
    githubUrl: state.selectedProject?.githubUrl || '',
    liveUrl: state.selectedProject?.liveUrl || '',
    techStacks:state.selectedProject?.techStacks ||  [],
    startDate: state.selectedProject?.startDate
    ? `${new Date(state.selectedProject.startDate).getFullYear()}-${(new Date(state.selectedProject.startDate).getMonth() + 1).toString().padStart(2, '0')}-${new Date(state.selectedProject.startDate).getDate().toString().padStart(2, '0')}`
    : '',
  }

  const formik = useFormik({
    initialValues: {...initValues}
  });





  const handleFileChange = (e) => {
    formik.setValues({...formik.values, image : e.target.files[0]})
  };


  const handleSubmitFunc = async () => {
    setShow({ ...show, loader: true });
  
    // Use a Promise to read the file as base64
    let base64Image;
    if(typeof formik.values.image != "string"){
      base64Image = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.readAsDataURL(formik.values.image);
      });
    }
  
    try {
      let response;
      if(state.selectedProject?._id){
        response = await ProjectService.UpdateProject({
          payload: { ...formik.values, _id: state.selectedProject._id },
        });
      }
      else{
        response = await ProjectService.AddProject({
          payload: { ...formik.values, createdBy: params.id, image: base64Image },
        });
      }
      
      onClose();
      let updateList = [];
      if(state.selectedProject?._id){
        state.projects.forEach((project,idx)=>{
          if(project._id == response.response.data._id){
            updateList.push(response.response.data)
          }
          else{
            updateList.push(project)
          }
        })
        setState({...state, projects : [...updateList], filteredProject : [...updateList], selectedProject : null})
      }
      else{
        console.log('response.response.data ', response.response.data)
        setState({...state, projects : [...state.projects, response.response.data], filteredProject : [...state.filteredProject, response.response.data], selectedProject : null})
      }

      formik.resetForm();

    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error while adding project:', error);
    }
  
    setShow({ ...show, loader: false });
  };


  const handleAddTagFunc = (stack) => {
    let allTechStacks = formik.values.techStacks;
    if(allTechStacks.includes(stack)){
      allTechStacks = allTechStacks.filter((currentStack)=>{
        return currentStack !== stack
      })
    }
    else{
      allTechStacks.push(stack);
    }
    formik.setValues({...formik.values , techStacks : allTechStacks})
  }

  return(
    <div>
      <h4  className = 'Heading22B color-heading'>
          New Project
      </h4>
      <div className="mt_8">
        <CustomTextField 
          label={"name"}
          name = "name"
          value={formik.values.name}
          onChange={formik.handleChange}
        /> 
      </div>
      <div className="mt_8">
        <CustomTextArea 
          label={"Description"}
          name = "description"
          value={formik.values.description}
          onChange={formik.handleChange}
        /> 
      </div>
      <div className="mt_8">
        <CustomTextField 
          label={"Start Date"}
          type = "date"
          name = "startDate"
          value={formik.values.startDate}
          onChange={formik.handleChange}
        /> 
      </div>
      <div className='mt_8'>
         <div className='customLabel mb_8'>
            Image
         </div>
         <input className='customLabel' type="file" onChange={handleFileChange} />
      </div>
      <div className="mt_8">
        <div className='customLabel'>
          Tech Stacks
        </div>
        <div className='d-flex flex-wrap'>
          {
            techStacks.map((stack)=>
             <div onClick={()=>handleAddTagFunc(stack)} className={`${formik.values.techStacks.includes(stack) && 'active' } singleStack Heading14M cp`}>
                {stack}
             </div>
            )
          }
        </div>
      </div>
      <div className="mt_8">
        <CustomTextField 
          label={"Github Repo Link"}
          name = "githubUrl"
          value={formik.values.githubUrl}
          onChange={formik.handleChange}
        /> 
      </div>
      <div className="mt_8">
        <CustomTextField 
          label={"Live Url Link"}
          name = "liveUrl"
          value={formik.values.liveUrl}
          onChange={formik.handleChange}
        /> 
      </div>
      <div className='d-flex justify-flex-end mt_24'>
          <CustomButton 
            varient="secondary"
            btntext={"Cancel"} 
            onClick={onClose}       
          />
          <CustomButton 
            btntext={state.selectedProject?._id ? "Update": "Save"}        
            className={"ml_16"}
            icon={show.loader && <CircularProgress size={14} color='inherit' />}
            onClick={handleSubmitFunc}
            disabled={!formik.values.name || !formik.values.description || !formik.values.githubUrl || !formik.values.liveUrl || formik.values.techStacks.length == 0 || !formik.values.startDate}
          />
      </div>
    </div>
  )
}


