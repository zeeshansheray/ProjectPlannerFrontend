import axios from 'axios'
import { Handlers, utils } from '../utils'
import MainService from './Main'
import env from '../config'
const service  = '/v1/auth'

const Login          = async({payload}) => await axios.post(env.API_URL+service + '/login', payload)
const Signup         = async({payload}) => await axios.post(env.API_URL+service + '/signup', payload)
const SendEmail      = async({payload}) => await axios.post(env.API_URL+service + '/sendEmail', payload)
const ChangePassword = async({payload}) => await axios.post(env.API_URL+service + '/changePassword', payload)
const Update         = async({payload}) => await axios.put(env.API_URL+service + '/update', payload, {headers: await MainService.getTokenHeader()})
const GetUser        = async ({query}) => await axios.get(env.API_URL+service+'?'+utils.getQueryString(query), {headers: await MainService.getTokenHeader()})

const getUser         = async({payload}) => await axios.post(env.API_URL+service + '/getUser', payload, {headers: await MainService.getTokenHeader()})




const AuthService = {

    Login         : Handlers.Services(Login),
    Signup        : Handlers.Services(Signup),
    SendEmail     : Handlers.Services(SendEmail),
    ChangePassword: Handlers.Services(ChangePassword),
    GetUser       : Handlers.Services(GetUser),
    getUser         : Handlers.Services(getUser),
    Update          : Handlers.Services(Update)

}

export default AuthService
