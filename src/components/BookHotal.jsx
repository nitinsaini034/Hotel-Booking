import React from 'react';
import MyNavbar from './Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function BookHotal() {
    const navigate=useNavigate();
    
    const handlebook=()=>{
        toast.success("Hotal booked successfully", {
            position: "top-center",
        })
       navigate("/")
    }
    return (
        <>
        <MyNavbar/>
            <div className="bookhotel">
                <div className='bookcont'>
                    <h1 style={{textAlign:"center", marginTop:"10px"}}>BOOK YOUR HOTEL ROOM</h1>
                    <form className="booktable" onSubmit={handlebook} >
                        <label htmlFor="beds"><img src="/src/assets/bed.png"/> BEDS</label> <br />
                        <select name="" id="" required>
                            <option selected>choose your room</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        <br />
                        <label htmlFor="date"><img src="/src/assets/date.png"/> DATE</label> <br />
                        <input type='date' required/>
                        <br />
                        <label htmlFor="guest"><img src="/src/assets/person.png"/>PERSON</label> <br />
                        <select name="" id="" required>
                            <option>choose person</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        <br />
                        <button style={{marginTop:"20px", padding:"8px", borderRadius:"10px"}}>BOOK NOW</button>
                        
                    </form>
                </div>
            </div>
        </>
    );
}
export default BookHotal;