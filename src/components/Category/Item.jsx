import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Item = () => {
    var [inputs,setInputs] =useState({"icode":'',"iname":'',"cid":'',"status":'ACTIVE'});
    var [categoryview,setCategoryview] = useState([]);
    const [error, setError] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3005/cview")
        .then(response =>{   
            setCategoryview(response.data)})
        .catch(err => console.log(err))
    },[])

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file)
        inputs.iphoto=file;
        console.log(inputs.iphoto);
      };
    
    const inputHandler = (e) => {
        e.preventDefault();
        const {name,value}=e.target
        setInputs((inputs) => ({...inputs,[name]:value}))
    }
    
    const saveimage =(event) => {
        if (!selectedImage) {
            console.error('No image selected');
            return;
          }
        // Create a FormData object to send the image as a binary file
          const formData = new FormData();
          formData.append('image', selectedImage);
        
          // Make a POST request to the server
          fetch('http://localhost:3005/upload', {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Image uploaded successfully:', data.message);
              // TODO: You can perform additional actions after a successful upload
            })
            .catch((error) => {
              console.error('Error uploading image:', error);
            });
    }


    const saveData =(event) =>{
        event.preventDefault();
            console.log(inputs)
            if (inputs.icode.trim() === '' || inputs.iname.trim() === '' || inputs.cid.trim() === '' || inputs.status.trim()==='' || !selectedImage) {
                setError(true);
                return;
            }
            else {
                setError(false);
                const formData = new FormData();
                formData.append('icode',inputs.icode);
                formData.append('iname',inputs.iname);
                formData.append('cid',inputs.cid);
                formData.append('image', selectedImage);
                formData.append('status',inputs.status);
            
                fetch('http://localhost:3005/itemimagenew', {
                  method: 'POST',
                  body: formData,
                })
                  .then((response) => response.json())
                  .then((data) => {
                    alert('Item added successfully:', data.message);
                    // Reset form or perform additional actions
                  })
                  .catch((error) => {
                    console.error('Error adding item:', error);
                  });
               
        }      
    }
  return (
    <div className="container">
    <h2>To Add New Item</h2>
        <br/>
        <form>
            <div className="form-group">
                <label>Item Code</label>
                <input name="icode" value={inputs.icode} type="text" required onChange={inputHandler} />
            </div>
            <div className="form-group">
                <label>Item Name</label>
                <input name="iname" value={inputs.iname} type="text" required onChange={inputHandler} />
            </div>

            <div className="form-group">
                <label>Category</label>

                <select name="cid"  value={inputs.cid} onChange={inputHandler}>
                    {
                    categoryview.map((value,index)=>{
                    return(
                        <option key={index} value={value.cid}>{value.cname}</option>
                          )
                    
                })}
                </select>

            </div> 

            <div className="form-group">
                <label>Image</label>
                <img src={inputs.iphoto} alt='' width="50" height="50" />&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="file" onChange={handleImageChange} />               
            </div>


           <div className="form-group">
                <label>Status</label>
                <select name="status" value={inputs.status} onChange={inputHandler}>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                </select>
            </div> 
            
            <input type="submit" value="Register Item" onClick={saveData} />
            <input type="submit" value="Save Image" onClick={saveimage} />    
         
        </form>
        <br/>

        {error && "All fields must be entered"}
</div>
  )
}

export default Item
