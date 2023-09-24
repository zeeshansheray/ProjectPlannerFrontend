import React from 'react'
import { CircularProgress } from '@material-ui/core';


export default function ViewDetail({items, width}) {
    // console.log('items ', items);
    return (
        <div id="viewDetailComponent" style={{width : width || '240px'}}>
            {
                items.map((item, idx)=>
                    <div className="wrapper">
                        {!item.hide && <div className='singleItem'>
                            {item.component ? 
                            
                            item.component
                            
                            : 

                            <div className={`align-items-center d-flex cp ${item.disabled && 'disabled'}`} onClick={item.function}>
                                {item.name == "Delete" && item.processing && <div className="mr_10 pt_6">
                                    <CircularProgress size={15} color={'inherit'}/>
                                </div>}
                                {(item.name == "Delete" && item.processing) || item.icon && <span className="iconPart mr_8">
                                    {item.icon}
                                </span>}
                                <div key={idx} className="dropdownBody Body14R color-neutral100">
                                    {item.name}
                                </div>
                            </div>}
                        </div>}
                </div>
                )
            }
        </div>
    )
}
