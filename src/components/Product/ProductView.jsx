
import { onValue, ref, update } from 'firebase/database';
import { React, useState } from 'react';
import { db } from '../Database';
import './Productview.css'
import {Delete,Edit} from '@mui/icons-material';


const ProductView = () => {
  const [viewd, setViewdata] = useState([]);

  //To retrieve data      
  const viewdata = (event) => {
    event.preventDefault();
    setViewdata([])
    const record = ref(db, "Product");
    return onValue(record, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {

        Object.values(data).map((project) => {
          setViewdata((viewd) => [...viewd, project]);
        });
      }
    });


  }

  //To delete data
  const deletedata = (todo) => {
    // event.preventDefault();
    
    update(ref(db,`Product/$todo.pid`),{
      status:"INACTIVE",
      pid:todo.pid,
    })
    

    // to update
    
}

  return (

    <div className='bb'>

      <input type="submit" value="View Product" onClick={viewdata} />
      <div className='center'>
        <table className='styled-table'>
          <thead>
            <tr>
              <td>Pid</td>
              <td>Product Code</td>
              <td>Product Name</td>
              <td>Price</td>
              <td>Status</td>
              <td colSpan={2}>Actions</td>
              
            </tr>
          </thead>

          <tbody>
            {viewd.map((value, index) => {
              return (
                <tr key={index} className='active-row'>
                  <td>{value.pid}</td>
                  <td>{value.pcode}</td>
                  <td>{value.pname}</td>
                  <td>{value.price}</td>
                  <td>{value.status}</td>
                  <td><button><Edit style={{ color: 'blue' }}  /></button></td>
                  <td><button><Delete style={{ color: 'red' }} onClick={()=>deletedata(viewd)}/></button></td>
                </tr>
              )
            },[])}

          </tbody>

        </table>
      </div>

    </div>
  )
}

export default ProductView
