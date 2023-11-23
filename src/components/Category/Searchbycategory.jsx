import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import React, {  useState } from 'react'
import './Categoryview.css'
import { Delete,Edit} from '@mui/icons-material';
import Category from './Categoryedit';

const Searchbycategory = (data) => {
    var [categoryview,setCategoryview] = useState([]);
    var [selected,setSelected] = useState();
    var [update,setUpdate] = useState(false);
    var [searchitem,setSearchitem] = useState('');


    const deletevalues = (cid) =>{
        console.log("deleted",cid)
        axios.delete("http://localhost:3005/deletec/"+cid)
        .then((response) => {
            alert("Deleted")
            window.location.reload(false);
    })
    }

    const updatevalues = (value) => {
        console.log("updated",value)
        setSelected(value);
        setUpdate(true);
    }

    const readsearrchvalue = (event) => {
        event.preventDefault();
        setSearchitem(event.target.value);
    }
   
    const searchhandler = async() =>{
        try {
            const response = await axios.get(`http://localhost:3005/searchcategory?cn=${searchitem}`);
            setCategoryview(response.data);
          }
        catch (error) {
            console.error(error);
          }
    }

    
    var result=
    <div className='bb'>
        <br/>
        <TextField  label="Search by Name" variant="outlined" value={searchitem} onChange={readsearrchvalue} />
        <br/>
        <br/>
        <Button className='bu' onClick={searchhandler}>Search</Button>
        <br/>
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

export default Searchbycategory
