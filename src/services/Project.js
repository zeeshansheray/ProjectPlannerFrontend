import axios from 'axios'
import { Handlers, utils } from '../utils'
import MainService from './Main'
import env from '../config'
const service  = '/v1/project'

const AddProject    = async({payload}) => await axios.post(env.API_URL+service, payload, {headers: await MainService.getTokenHeader()})
const GetProjects   = async ({query}) => await axios.get(env.API_URL+service+'?'+utils.getQueryString(query), {})
const UpdateProject = async({payload}) => await axios.put(env.API_URL+service, payload, {headers: await MainService.getTokenHeader()})
const GetAll        = async () => await axios.get(env.API_URL+service+'/all')

const Projectservice = {
    AddProject   : Handlers.Services(AddProject),
    GetProjects  : Handlers.Services(GetProjects),
    UpdateProject: Handlers.Services(UpdateProject),
    GetAll       : Handlers.Services(GetAll),
}

export default Projectservice
