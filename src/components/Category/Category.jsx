import axios from 'axios'
import React, { useState } from 'react'
import './Category.css'
import { uid } from 'uid'
import { useNavigate } from 'react-router-dom'



const Category = () => {
    var [inputs,setInputs] =useState({"cid":'',"ccode":'',"cname":'',"status":'ACTIVE'});
    const [error, setError] = useState(false);
    const navigate = useNavigate();


const inputHandler = (e) => {
    e.preventDefault();
    const {name,value}=e.target
    setInputs((inputs) => ({...inputs,[name]:value}))
 }
   
 const saveData =(event) =>{
    event.preventDefault();
    if (inputs.ccode.trim() === '' || inputs.cname.trim() === '' || inputs.status.trim()==='') {
        setError(true);
        return;
    }
    else {
            setError(false);
            const cid = uid();
            inputs.cid=cid;
            axios.post("http://localhost:3005/cnew",inputs)
            .then((response) =>{
                alert("Record Saved")
                navigate('/categoryview');
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
            <br/>
            {error && "All fields must be entered"}
    </div>
  )
}

export default Category
