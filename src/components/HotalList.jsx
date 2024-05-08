import React from 'react'
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import MyNavbar from './Navbar';
import Footer from './Footer';
import Maintheme from './Maintheme';
import Button from 'react-bootstrap/Button';
function HotalList() {
    const [posts, setposts] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3000");
                const jsondata = await response.json();
                setposts(jsondata)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])
    return (
        <>
        <MyNavbar/>
        <Maintheme/>
        <h1 style={{textAlign:"center", color:"black",fontSize:"50px"    }}>Our Best Hotels</h1>
            <div className='postinfo'>
                {
                    posts.map((post) => (
                                                 
                        <div>
                            <Card style={{ width: '31rem', height: '28rem'}}>
                                <Card.Img variant="top" src={post.image} className='cardimage' />
                                <Card.Body style={{ padding: "5px", }}>
                                    <Card.Title ><b>{post.title}</b></Card.Title>
                                    <Card.Text className='cardtext'>
                                        &#8377;{post.price.toLocaleString("en-IN")}/night
                                    <Link to={`/${post._id}`} key={post._id}>   
                                        <Button variant="success" style={{marginLeft:"250px"}}>Book now</Button>
                                    </Link>
                                        <br />
                                        <div className='location'>
                                            <span class="material-symbols-outlined">location_on</span>
                                            {post.location}
                                        </div>

                                    </Card.Text> 

                                </Card.Body>

                            </Card>
                        </div>
                    
                    ))
                }
            </div>
            <Footer/>
        </>
    )
}

export default HotalList

