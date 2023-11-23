import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Categoryview.css'
import { Delete,Edit} from '@mui/icons-material';
import Category from './Categoryedit';

const Categoryview = () => {
    var [categoryview,setCategoryview] = useState([]);
    var [selected,setSelected] = useState();
    var [update,setUpdate] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3005/cview")
        .then(response =>{   
            setCategoryview(response.data)})
        .catch(err => console.log(err))
    },[])

    
    const deletevalues = (cid) =>{

        console.log("deleted",cid)
         axios.put("http://localhost:3005/updatestatus/"+cid)
        .then((response) => {
            alert("Status Updated")
            window.location.reload(false);
    })

    }

    const updatevalues = (value) => {
        console.log("updated",value)
        setSelected(value);
        setUpdate(true);
    }

    var result=
    <div className='bb'>
          <TableContainer className='center'>
        <Table className='styled-table' >
            <TableHead>
                <TableRow>
                    <TableCell>Category ID</TableCell>
                    <TableCell>Category Code</TableCell>
                    <TableCell>Category Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {categoryview.map((value,index)=>{
                    return(
                        <TableRow key={index}>
                             <TableCell>{value.cid}</TableCell>
                            <TableCell>{value.ccode}</TableCell>
                            <TableCell>{value.cname}</TableCell>
                            <TableCell>{value.status}</TableCell>
                            <TableCell><button><Edit style={{ color: 'blue' }} onClick={()=>updatevalues(value)} /></button></TableCell>
                            <TableCell><button><Delete style={{ color: 'red' }} onClick={()=>deletevalues(value._id)} /></button></TableCell>
                        </TableRow>
                        
                    )
                })}
            </TableBody>
        </Table>
      </TableContainer >
</div>

    if(update)
        result = <Category data={selected} method='put' />
        return (result)
  
}

export default Categoryview
