import React,{useState, useContext} from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import {BASE_URL} from "../../utils/config";
import {loadStripe} from '@stripe/stripe-js';

const Booking = ({tour , avgRating}) => {
    let tours = [];
    tours.push(tour);

    const {title, price, reviews} = tour;

    const navigate = useNavigate();

    const {user} = useContext(AuthContext);
    
    const [booking, setBooking] = useState({
        userId: user && user._id,
        userEmail: user && user.email,
        tourName: title,
        fullName:'',
        phone:'',
        guestSize:1,
        bookAt:'',
    });

    const [guestSizeI , setGuestSize] = useState('');
    
    const handleGuestSizeChange =(e)=>{

        setBooking(prev=>({...prev, [e.target.id]:e.target.value}))

        const inputGuestSize = e.target.value;

        if (inputGuestSize <= 0 || inputGuestSize >= 10){
            alert("Minimum GuestSize is 1 and Maximum is 10 ");
        }else{
            setGuestSize(inputGuestSize)
        }
    }

       
        const [date , setDate] = useState('');

        const handleDateChange =(e)=>{

            setBooking(prev=>({...prev, [e.target.id]:e.target.value}))

            const inputDate = e.target.value;
            const currentDate = new Date();
            const selectedDate = new Date(inputDate);

            if (selectedDate < currentDate-1){
                alert(" This Date can not be selected");
            }else{
                setDate(inputDate);
            }
        }

    
    const handleChage = e => {
        setBooking(prev=>({...prev, [e.target.id]:e.target.value}))

    };

    const serviceFee = 300;
    const totalAmount = Number(price) * Number(booking.guestSize) 
    + Number(serviceFee);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handlePhoneNoChange = (e) => {
        setBooking(prev=>({...prev, [e.target.id]:e.target.value}))

        const inputValue = e.target.value;
        setPhoneNumber(inputValue);
        setIsValid(/^\d{10}$/.test(inputValue));
    };

    //send data to the server
    const handleClick =async e =>{
        e.preventDefault()

        console.log(booking);

        try {
            if(!user || user === undefined || user === null){
                return alert("please sign in");
            }

            const res = await fetch(`${BASE_URL}/booking`,{
                method:"post",
                headers:{
                    'content-type':'application/json'
                },
                credentials:'include',
                body: JSON.stringify(booking)
            });

            const result = await res.json();

            if(!res.ok){
                return alert(result.message);
            }
            // navigate("/thank-you");
            makePayment();

        } catch (err) {
            alert(err.message);
        }

    };

    const makePayment = async() =>{
        const stripe = await loadStripe("pk_test_51OrbEMSEd6sw44xe8rcd60YbG1DkquKrEWNNYbQPJhSgymOMUOcshfFhpjet5gqsX2q3chlQ3W7iupfAkvWqCIfu00lYJc0avi");

        const body = {
            products:tours
        }
        const headers = {
            "Content-Type":"application/json"
        }
        const response = await fetch("http://localhost:4000/api/create-checkout-session",{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        });

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId:session.id
        });

        if(result.error){
            console.log(result.error);
        }
    };

    // const sendDataAndPayment = () =>{
    //     handleClick();
    //     makePayment();
    // }

        return (
            <div className="booking">
                <div className="booking_top d-flex align-items-center
                justify-content-between">
                    <h3>₹{price}<span>/per person</span></h3>
                    <span className="tour_rating d-flex align-items-center gap-1">
                        <i class="ri-star-s-fill"></i>
                        {avgRating === 0 ? null : avgRating} ({reviews?.length})       
                    </span>
                </div>

                {/* ===== booking form start ===== */}
                <div className="booking_form">
                    <h5>Information</h5>
                    <Form className="booking_info-form" onSubmit={handleClick}>
                        <FormGroup>
                            <input type="text" placeholder="Full Name" id="fullName"
                            required onChange={handleChage} />
                        </FormGroup>
                        <FormGroup>
                            {isValid ? (
                                <input type="number" placeholder="Phone" id="phone"
                                value={phoneNumber}
                                required onChange={handlePhoneNoChange} />
                            ) : (
                                <input type="number" placeholder="Phone" id="phone"
                                value={phoneNumber}
                                required onChange={handlePhoneNoChange} 
                                style={{color:"red"}}/>
                            )}
                        </FormGroup>
                        <FormGroup className="d-flex align-items-center gap-3">
                            <input type="date" placeholder="" id="bookAt"
                            value={date} required onChange={handleDateChange}  />
                            <input type="number" placeholder="Guest"
                            value={guestSizeI} id="guestSize"
                            required onChange={handleGuestSizeChange} />
                        </FormGroup>
                    </Form>
                </div>
                {/* ===== booking form end ===== */}

                {/* ===== booking bottom start ===== */}
                <div className="booking_bottom">
                    <ListGroup>
                        <ListGroupItem className="borde-0 px-0">
                            <h5 className="d-flex align-items-center gap-1">
                                ₹{price}<i class="ri-close-line"></i> 1 person
                            </h5>
                            <span>₹{price}</span>
                        </ListGroupItem>
                        <ListGroupItem className="borde-0 px-0">
                            <h5>Service charge</h5>
                            <span>₹{serviceFee}</span>
                        </ListGroupItem>
                        <ListGroupItem className="borde-0 px-0 total">
                            <h5>Total</h5>
                            <span>₹{totalAmount}</span>
                        </ListGroupItem>
                    </ListGroup>
                    <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
                        Book Now
                    </Button>
                </div>
                {/* ===== booking bottom end ===== */}
            </div>
        );
}

export default Booking;