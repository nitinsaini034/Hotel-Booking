import React from 'react'
import { useState } from 'react'
import MyNavbar from './Navbar';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Footer from './Footer';
function NewHotal() {
    const navigate = useNavigate();
    const [newhotal, setnewhotal] = useState({
        title: "",
        description: "",
        image: "",
        price: "",
        location: "",
        country: ""
    })
    const handleinput = (e) => {
        let hotal = e.target.name;
        let value = e.target.value;

        setnewhotal({
            ...newhotal,
            [hotal]: value
        })
    }


    const handlesubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch('http://localhost:3000/new', {
                method: 'POST',
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(newhotal)
            })
            toast.success("Hotal Added successfully", {
                position: "top-center"
            })
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <MyNavbar />
            <h1 style={{ textAlign: "center", marginTop: "20px", color:"blue" }}>Add New Hotal</h1><br />
            <div className="newhotalform">
                <div className='formdata'>
                    <form onSubmit={handlesubmit} enctype='multipart/form-data'>

                        <label>Title</label><br />
                        <input type="text" name='title' placeholder='Enter title here'
                            value={newhotal.title} onChange={handleinput} required /> <br />

                        <label>Description</label><br />
                        <input type="text" name='description' placeholder='Enter description here'
                            value={newhotal.description} onChange={handleinput} required /> <br />

                        <label>Upload Hotal Image</label><br />
                        <input type="text" name='image' placeholder='Enter image url here'
                            onChange={handleinput} required value={newhotal.image}/> <br />

                        <label>Price</label><br />
                        <input type="number" name='price' placeholder='Enter price here'
                            value={newhotal.price} onChange={handleinput} required /> <br />

                        <label>Location</label><br />
                        <input type="text" name='location' placeholder='Enter location here'
                            value={newhotal.location} onChange={handleinput} required /> <br />

                        <label>Country</label><br />
                        <input type="text" name='country' placeholder='Enter country name here'
                            value={newhotal.country} onChange={handleinput} required /> <br />

                        <div className="submit"><br />
                            <button type='submit' style={{background:"green", color:"white",
                                padding:"5px", borderRadius:"10px"
                            }}>Add</button>
                        </div>
                    </form>

                </div>

            </div>
            <Footer />
        </>
    )
}

export default NewHotal