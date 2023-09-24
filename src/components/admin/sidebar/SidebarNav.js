import React,{useState, useEffect, useContext} from 'react'
import {useLocation, useNavigate} from 'react-router-dom';

import PartialSideBar from './PartialSideBar'


import SvgIcons from '../../../icons/svg.icon';
import { LayoutContext } from '../../../context/layout.context';

export default function SidebarNav({mobileCheck, setMobileCheck}) {

    const location = useLocation();
    const layout   = useContext(LayoutContext);

    const [itemsSub, setItemsSub] = useState([])

    const items = [
        {
            link      : '/dashboard',
            logo      : SvgIcons.NavDashboardIcon,
            className : `items middle mb_16`,
            name      : 'Dashboard',
            subMenu   : false,
            children  : ""
        },
        {
            link      : '/settings',
            logo      : SvgIcons.SettingIcon,
            className : 'items middle mb_16 disabled',
            subMenu   : true,
            name      : 'Settings',
            childern  : '',
            disabled  : false
        },
    ]

    return (
        <div className={"d-flex flex-row " + (!layout.state.expandedBar ? 'handleSiderBarShadow' : '')} id="sidebar">
        <div className={(mobileCheck) ? 'partailSideNav' : 'hidePartial partailSideNav z-index-2'}>
            <PartialSideBar 
                items       = {items}
                setItemsSub = {setItemsSub}
            />
        </div>
    </div>
    )
}
