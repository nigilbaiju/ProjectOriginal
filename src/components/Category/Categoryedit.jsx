import axios from 'axios'
import React, { useState } from 'react'
import './Category.css'
import { uid } from 'uid'
import { useNavigate } from 'react-router-dom'

const Categoryedit = (props) => {
    //  var [inputs,setInputs] =useState({"cid":'',"ccode":'',"cname":'',"status":'ACTIVE'})
    var [inputs,setInputs] =useState(props.data)
    const navigate = useNavigate();


const inputHandler = (e) => {
    e.preventDefault();
    const {name,value}=e.target
    setInputs((inputs) => ({...inputs,[name]:value}))
 }
   
 const saveData =(event) =>{
    event.preventDefault();
        if(props.method === "post")
        {
            // setError(false);
            const cid = uid();
            inputs.cid=cid;
            axios.post("http://localhost:3005/cnew",inputs)
            .then((response) =>{
                alert("Record Saved")
                navigate('/categoryview');
                })
            .catch(err=>console.log(err))  
        }
        if(props.method ==='put')
        {
            axios.put("http://localhost:3005/cedit/"+inputs._id,inputs)
            .then((response) =>{
                alert("Record Updated")
                window.location.reload(false);
                })
            .catch(err=>console.log(err))  

        }
    }      
  return (
    <div className="container">
        <h2>To Add New Category</h2>
            <br/>
            <form>

                <div className="form-group">
                    <label>Category Code</label>
                    <input name="ccode" value={inputs.ccode} type="text" required onChange={inputHandler} />
                </div>
                <div className="form-group">
                    <label>Category Name</label>
                    <input name="cname" value={inputs.cname} type="text" required onChange={inputHandler} />
                </div>

               <div className="form-group">
                    <label>Status</label>
                    <select name="status" value={inputs.status} onChange={inputHandler}>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                    </select>
                </div> 
                
                <input type="submit" value="Register Category" onClick={saveData} />
             
             
            </form>
    </div>
  )
}


export default Categoryedit
