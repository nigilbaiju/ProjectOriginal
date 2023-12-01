import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Itemview.css'
import { Delete,Edit} from '@mui/icons-material';
import Item from './Itemedit';
import {Buffer} from 'buffer';

const Itemview = () => {
    var [Itemview,setItemview] = useState([]);
    var [selected,setSelected] = useState();
    var [update,setUpdate] = useState(false);
    var [categoryview,setCategoryview] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:3005/itemview")
        .then(response =>{   
            console.log(response.data)
            setItemview(response.data)})
        .catch(err => console.log(err))
    },[])

    // const fetchCategoryData = async (cid) => {
    //     try {
    //       const response = await fetch("http://localhost:3005/cview/"+cid);
    //       const data = await response.json();
    //       setCategoryview(data);
    //     } 
    //     catch (error) {
    //       console.error('Error fetching CNAME data:', error);
    //     }
    //   };
  

    

    const deletevalues = (id) =>{
        console.log("deleted",id)
         axios.put("http://localhost:3005/updatestatusitem/"+id)
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
                    <TableCell>Item Code</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Category ID</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Itemview.map((value,index)=>{
                    return(
                        <TableRow key={index}>
                             <TableCell>{value.icode}</TableCell>
                            <TableCell>{value.iname}</TableCell>
                            <TableCell>{value.cat[0].cname}</TableCell> 
                            <TableCell>
                            {/* npm install --save buffer */}
                            <img src={`data:image/jpeg;base64,${Buffer.from(value.image.data)}`} width="50" height="50" alt='Error' />                           
                            </TableCell>   

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
        result = <Item data={selected} method='put' />
        return (result)
  

}

export default Itemview
