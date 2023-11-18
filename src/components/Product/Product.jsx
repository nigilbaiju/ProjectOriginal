import { uid } from 'uid';
import { ref, set } from 'firebase/database';
import { React, useState } from 'react';
import './Product.css';
import { db } from '../Database';;

const Product = () => {
    const [pcode, setPCode] = useState('');
    const [pname, setPname] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState(false);


    const clearvalues = () =>
    {
        setPCode('');
        setPname('');
        setPrice('');
        setDescription('');
        setStatus()
    }
    const readPcode = (event) => {
        event.preventDefault();
        setPCode(event.target.value)

    }
    const readPName = (event) => {
        event.preventDefault();
        setPname(event.target.value)
    }
    const readPrice = (event) => {
        event.preventDefault();
        setPrice(event.target.value)
    }
    const readDescription = (event) => {
        event.preventDefault();
        setDescription(event.target.value)
    }
    const readStatus = (event) => {
        event.preventDefault();
        setStatus(event.target.value)
    }

    const readsavedata = (event) => {
        event.preventDefault();
        if (pcode.trim() === '' || pname.trim() === '' || price.trim() === '' || description.trim() === '' || status==='') {
            setError(true);
            return;
        }
        else {
            setError(false);
            console.log(status);
            const pid = uid();
            try 
            {
            set(ref(db, `Product/${pid}`), { pid, pcode, pname, price, description,status })
            // .then(() => {
            //     // Data saved successfully!
            //   })
            //  .catch((error) => {
            //     // The write failed...
            //   });
            }
            catch(error){
                alert('error ')
            }
            finally
            {
            clearvalues();
            alert('record saved')

            }
        }

    }


    return (
        <div className="container">
            <h2>To Add New Products</h2>
            <br/>
            <form>

                <div className="form-group">
                    <label>Product Code</label>
                    <input value={pcode} type="text" required onChange={readPcode} />
                </div>
                <div className="form-group">
                    <label>Product Name</label>
                    <input value={pname}type="text" required onChange={readPName} />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input value={price}type="number" required onChange={readPrice} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="4" value={description} required onChange={readDescription}></textarea>
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select required onClick={readStatus}>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE" selected>INACTIVE</option>
                    </select>
                </div>
                <input type="submit" value="Register Product" onClick={readsavedata} />
                
                {error && 'All fields must be entered'}
            </form>
        </div>
    )
}

export default Product
