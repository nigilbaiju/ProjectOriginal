import axios from 'axios'
import React, { useState } from 'react'

const Category = () => {
    var [inputs,setInputs] =useState({"ccode":'',"cname":'',"status":''})

const inputHandler = (e) => {
    const {name,value}=e.target
    setInputs((inputs) => ({...inputs,[name]:value}))
    console.log(inputs)
 }
   
 const saveData =() =>{
    console.log(inputs)
    axios.post("http://localhost:3005/new",inputs)
    .then((response) =>{
        alert("Record Saved")
        })
    .catch(err=>console.log(err))

    }
  return (
    <div>
        <h2>To Add New Category</h2>
            <br/>
            <form>

                <div class="form-group">
                    <label>Category Code</label>
                    <input name="ccode" value={inputs.ccode} type="text" required onChange={inputHandler} />
                </div>
                <div class="form-group">
                    <label>Category Name</label>
                    <input value={inputs.cname}type="text" required onChange={inputHandler} />
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <select required onClick={inputHandler}>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE" selected>INACTIVE</option>
                    </select>
                </div>
                <input type="submit" value="Register Product" onClick={saveData} />
                
             
            </form>
    </div>
  )
}

export default Category
