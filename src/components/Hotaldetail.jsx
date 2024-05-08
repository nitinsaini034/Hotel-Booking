import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import MyNavbar from './Navbar';
import Footer from './Footer';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
function Hotaldetail() {
    const { hotalID } = useParams();
    const [hotal, sethotal] = useState({});
    const [reviews, setreviews] = useState(() => {
        const reviewsFromStorage = localStorage.getItem(`reviews_${hotalID}`);
        return reviewsFromStorage ? JSON.parse(reviewsFromStorage) : [];
    });

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchHotal() {
            try {
                const response = await fetch(`http://localhost:3000/${hotalID}`);
                const hotaldata = await response.json();
                sethotal(hotaldata)
            } catch (error) {
                console.log(error)
            }
        }
        fetchHotal();
    }, [hotalID])


    useEffect(() => {
        async function fetchReviews() {
            try {
                const response = await fetch(`http://localhost:3000/${hotalID}/reviews`);
                const reviewdata = await response.json();
                setreviews(reviewdata)
                localStorage.setItem(`reviews_${hotalID}`, JSON.stringify(reviewdata));
            } catch (error) {
                console.log(error)
            }
        }
        fetchReviews();
    }, [hotalID])

    const handledelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/${hotalID}`, {
                method: "DELETE",
            });
            await response.json();
            toast.error("Hotal deleted successfully", {
                position: "top-center",
            })
            navigate("/")

        } catch (error) {
            console.log(error)

        }
    }

    const handlereview = async (e) => {
        e.preventDefault();
        const rating = e.target.rating.value;
        const comment = e.target.comment.value
        try {
            const response = await fetch(`http://localhost:3000/${hotalID}/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ rating, comment })
            })
            const data = await response.json();
            console.log(data)
            setreviews([...reviews, data])
            localStorage.setItem(`reviews_${hotalID}`, JSON.stringify([...reviews, data]));
            e.target.reset();
        } catch (error) {
            console.log(error)
        }
    }
    const handleReviewDelete = async (reviewId) => {
        try {
            const response = await fetch(`http://localhost:3000/${hotalID}/reviews/${reviewId}`, {
                method: "DELETE",
            });
            const data = await response.json();
            // Remove the deleted review from the state
            setreviews(reviews.filter(review => review._id !== reviewId));
            // Update the reviews in local storage
            localStorage.setItem(`reviews_${hotalID}`, JSON.stringify(reviews.filter(review => review._id !== reviewId)));
            toast.success("Review deleted successfully", {
                position: "top-center"
            })
        } catch (error) {
            console.log(error);
            toast.error("Error deleting review", {
                position: "top-center"
            })
        }
    }
    return (
        <>
            <MyNavbar />
            <div className="hotaldetail">
                <div className="hotal_card">
                    <h1 className="card-text" style={{color:"black"}}>{hotal.title}</h1>
                    <img src={hotal.image} style={{ width: "65rem", height: "32rem", borderRadius: "15px" }} className="hotalimage" />
                    <div className="hotal_cardbody">
                        {hotal.description} <br />
                        &#8377; {hotal.price}/night <br />
                        {hotal.location} 
                        <div>
                        <img src="/src/assets/location.png" style={{height:"25px", width:"25px"}}/>
                        {hotal.country}
                        </div>   
                    </div>
                    <div style={{ display: "flex" }}>
                        <Link to="/hotal/:hotalID/book">
                            <button className='editbtn'>Book now</button></Link>
                        <button onClick={handledelete} className="delbtn">delete</button>
                    </div>
                </div>
            </div>
            <hr />
            <div className="review">
                <h2>Leave a review</h2>
                <form onSubmit={handlereview}>
                    <div className="rating">
                        <label htmlFor="rating"><b>Rating</b></label>
                        <fieldset class="starability-slot">
                            <input type="radio" id="no-rate" class="input-no-rate" name="rating" value="1" checked aria-label="No rating." />
                            <input type="radio" id="first-rate1" name="rating" value="1" />
                            <label for="first-rate1" title="Terrible">1 star</label>
                            <input type="radio" id="first-rate2" name="rating" value="2" />
                            <label for="first-rate2" title="Not good">2 stars</label>
                            <input type="radio" id="first-rate3" name="rating" value="3" />
                            <label for="first-rate3" title="Average">3 stars</label>
                            <input type="radio" id="first-rate4" name="rating" value="4" />
                            <label for="first-rate4" title="Very good">4 stars</label>
                            <input type="radio" id="first-rate5" name="rating" value="5" />
                            <label for="first-rate5" title="Amazing">5 stars</label>
                        </fieldset>
                    </div>
                    <div className="comment">
                        <label htmlFor="comment">Comment</label><br />
                        <textarea name="review[comment]" id="comment" type="text" rows={6} cols={80} required></textarea >
                    </div>
                    <button>submit</button>
                </form> <br />
                <div className="reviews" style={{ width: "60em" }}>
                    <h2 style={{ textAlign: "center" }}>All Reviews</h2>
                    <div className="row">
                        {reviews.map((review) => (
                            <Card style={{ width: '18rem' }} className='col-6'>
                                <div key={review._id}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{review.comment}</ListGroup.Item>
                                        <ListGroup.Item><p class="starability-result" data-rating={review.rating}></p></ListGroup.Item>
                                        <ListGroup.Item>{review.createdAt}</ListGroup.Item>
                                    </ListGroup>
                                </div>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    handleReviewDelete(review._id)
                                }}>
                                    <button>delete</button>
                                </form>
                            </Card>

                        ))}
                    </div>
                </div>

            </div>

            <Footer />
        </>
    )
}

export default Hotaldetail