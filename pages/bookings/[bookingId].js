import React from 'react';
import Navbar from '../../components/Navbar';
import styles from '../../styles/Bookings.module.css';
import Link from 'next/link';
import { useEffect,useState } from 'react';
import {BiArrowBack,BiSearch} from 'react-icons/bi';
import {ImCalendar} from 'react-icons/im';
import {MdAddCircle} from 'react-icons/md';
import {AiFillCaretDown} from 'react-icons/ai';
import {BsThreeDotsVertical} from 'react-icons/bs';
import { Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'

const Bookings = ()=> {
    const [bookingsResponse, setBookingsResponse] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [booking, setBooking] = useState([{}]);
    const [startDateArrival, setStartDateArrival] = useState(new Date());
    const [startDateBooking, setStartDateBooking] = useState(new Date());
    const [startDateDeparture, setStartDateDeparture] = useState(new Date());
    const [arrivalDateToShow, setArrivalDateToShow] = useState('');
    const [bookingDateToShow, setBookingDateToShow] = useState('');
    const [departureDateToShow, setDepartureDateToShow] = useState('');
    const [roomTypeDropdown, setRoomTypeDropdown] = useState(false);
    const [bookingStatusDropdown, setBookingStatusDropdown] = useState(false);
    const [bookingSourceDropdown, setBookingSourceDropdown] = useState(false);
    const [roomType, setRoomType] = useState('All');
    const [bookingStatus, setBookingStatus] = useState('All');
    const [bookingSource, setBookingSource] = useState('All');
    // console.log(startDateArrival)
    const router = useRouter()
    
  const { bookingId } = router.query;
    useEffect(() => {
        console.log(bookingId);
        let newDateArrival = startDateArrival.toLocaleDateString().split('/').reverse();
        for (let index = 0; index < newDateArrival.length; index++) {
            if (newDateArrival[index] < 10) {
                // console.log('yes')
                newDateArrival[index] = `0${newDateArrival[index]}`
                // arrivalDateToShow.push(arrivalDateToShow[index])
                // console.log(newDateArrival[index])
            }
        }
        let tempArrival = '';
        tempArrival = newDateArrival[2];
        newDateArrival[2] = newDateArrival[1];
        newDateArrival[1] = tempArrival;
        setArrivalDateToShow(newDateArrival.join('-'));

        let newDateBooking = startDateBooking.toLocaleDateString().split('/').reverse();
        for (let index = 0; index < newDateBooking.length; index++) {
            if (newDateBooking[index] < 10) {
                // console.log('yes')
                newDateBooking[index] = `0${newDateBooking[index]}`
                // arrivalDateToShow.push(arrivalDateToShow[index])
                // console.log(newDateArrival[index])
            }
        }
        let tempBooking = '';
        tempBooking = newDateBooking[2];
        newDateBooking[2] = newDateBooking[1];
        newDateBooking[1] = tempBooking;
        setBookingDateToShow(newDateBooking.join('-'));

        let newDateDeparture = startDateDeparture.toLocaleDateString().split('/').reverse();
        for (let index = 0; index < newDateDeparture.length; index++) {
            if (newDateDeparture[index] < 10) {
                // console.log('yes')
                newDateDeparture[index] = `0${newDateDeparture[index]}`
                // arrivalDateToShow.push(arrivalDateToShow[index])
                // console.log(newDateArrival[index])
            }
        }
        let tempDeparture = '';
        tempDeparture = newDateDeparture[2];
        newDateDeparture[2] = newDateDeparture[1];
        newDateDeparture[1] = tempDeparture;
        setDepartureDateToShow(newDateDeparture.join('-'));

    }, [startDateArrival , startDateBooking, startDateDeparture])
    
    useEffect(() => {
        // fetch('http://localhost:5000/getBookingsRetrieval')
        fetch('https://channel-manager-server.herokuapp.com/getBookingsRetrieval')
            .then(response => response.json())
            .then((data) => {
            //  console.log(data);
            setBookingsResponse(data);
            setBookings(data.result.bookings)
            const booking = [{}];
            for (let index = 0; index < data.result.bookings.length; index++) {
                // console.log(data.result.bookings[index].booking)
                if (!booking[index][data.result.bookings[index].$.iataid]) {
                    booking[index]["id"] = data.result.bookings[index].$.iataid ;
                    booking[index]["bookings"] = data.result.bookings[index].booking;
                }
            }
            // console.log(booking)
            setBooking(booking);
        })
        // console.log(arrivalDate)
        // arrivalDateToShow = arrivalDate;
    }, [])
    // console.log(newarrivalDateToShow)
    // console.log('arrival date' ,arrivalDateToShow)
    // console.log('booking date',bookingDateToShow)
    // console.log('departure date',departureDateToShow)
    // console.log(bookingsResponse)
    // console.log(bookings)
    // console.log(booking)

  return (
    <div className={styles.bookingsOuterContainer}>
    <Navbar />
    <div className={styles.bookingsMainContainer}>
        <div className={styles.bookingsSearchSection}>
        <span className={styles.bookingsSearchSectionBookingsMngmtSpan}><Link href={`/crs/${bookingId}`}><BiArrowBack className={styles.bookingsSearchSectionBookingsMngmtIcon} /></Link>Booking Management</span>
            <span className={styles.bookingsSearchSectionBookingsInputSpan}><BiSearch className={styles.bookingsSearchSectionIcon} size={26}/><input className={styles.bookingsSearchSectionInput} placeholder='Search bookings' /></span>
        </div>
        <div className={styles.bookingsTableSection}>
            <div className={styles.bookingsTableButtonsSection}>
                {/* <button><MdAddCircle size={20} className={styles.bookingsTableButtonIcon}/> A Room</button>
                <button><MdAddCircle size={20} className={styles.bookingsTableButtonIcon}/> Property</button>
                <button><MdAddCircle size={20} className={styles.bookingsTableButtonIcon}/> Enquiry</button> */}
                <span className={styles.bookingsTableButtonsGroup}>
                    <button>Recent Booking</button>
                    <button>Todays Arrival</button>
                    <button>In House</button>
                    <button>Todays Departure</button>
                </span>
            </div>
            <div className={styles.bookingsTableDropdownsSection}>
                <span className={styles.bookingsTableDropdown} onMouseLeave={()=>{setRoomTypeDropdown(false)}} onClick={()=>{setRoomTypeDropdown(!roomTypeDropdown); setBookingStatusDropdown(false); setBookingSourceDropdown(false)}}><span>{roomType.length > 20 ?roomType.substr(0,20)+'...' : roomType}</span><AiFillCaretDown /><span className={styles.bookingsTableDropdownTopText}>Filter By Room Type</span>
                {roomTypeDropdown ? <ul>
                    <li onClick={()=>{setRoomType('All')}}>All</li>   
                    <li onClick={()=>{setRoomType('Double Room')}}>Double Room</li>   
                    <li onClick={()=>{setRoomType('Twin Room')}}>Twin Room</li>   
                    <li onClick={()=>{setRoomType('Banquet Hall')}}>Banquet Hall</li>   
                    <li onClick={()=>{setRoomType('One Day Trip')}}>One Day Trip</li>   
                </ul>:''}
                </span>
                <span className={styles.bookingsTableDropdown} onMouseLeave={()=>{setBookingStatusDropdown(false)}} onClick={()=>{setRoomTypeDropdown(false); setBookingStatusDropdown(!bookingStatusDropdown); setBookingSourceDropdown(false)}}><span>{bookingStatus.length > 20 ?bookingStatus.substr(0,20)+'...' : bookingStatus}</span><AiFillCaretDown /><span className={styles.bookingsTableDropdownTopText}>Filter By Booking Status</span>
                {bookingStatusDropdown ? <ul>
                    <li onClick={()=>{setBookingStatus('All')}}>All</li>   
                    <li onClick={()=>{setBookingStatus('ENQUIRY')}}>ENQUIRY</li>   
                    <li onClick={()=>{setBookingStatus('Confirmed')}}>Confirmed</li>   
                    <li onClick={()=>{setBookingStatus('Checked In')}}>Checked In</li>   
                    <li onClick={()=>{setBookingStatus('Checked Out')}}>Checked Out</li>   
                    <li onClick={()=>{setBookingStatus('Cancelled')}}>Cancelled</li>   
                </ul>:''}
                </span>
                <span className={styles.bookingsTableDropdown} onMouseLeave={()=>{setBookingSourceDropdown(false)}} onClick={()=>{setRoomTypeDropdown(false); setBookingStatusDropdown(false); setBookingSourceDropdown(!bookingSourceDropdown)}}><span>{bookingSource.length > 20 ?bookingSource.substr(0,20)+'...' : bookingSource}</span><AiFillCaretDown /><span className={styles.bookingsTableDropdownTopText}>Filter By Booking Source</span>
                {bookingSourceDropdown ? <ul>
                    <li onClick={()=>{setBookingSource('All')}}>All</li>   
                    <li onClick={()=>{setBookingSource('Fit Frequent Individual Traveller')}}>Fit Frequent Individual Traveller</li>   
                    <li onClick={()=>{setBookingSource('Walk In')}}>Walk In</li>   
                    <li onClick={()=>{setBookingSource('Website')}}>Website</li>   
                    <li onClick={()=>{setBookingSource('The Hotel Mate')}}>The Hotel Mate</li>   
                    <li onClick={()=>{setBookingSource('SiteMinder')}}>SiteMinder</li>   
                    <li onClick={()=>{setBookingSource('Oyo')}}>Oyo</li>   
                    <li onClick={()=>{setBookingSource('Agoda')}}>Agoda</li>   
                </ul>:''}
                </span>
                {/* <span className={styles.bookingsTableDropdown}><span>Booking Date</span><ImCalendar /></span> */}
                <div>
                    <DatePicker selected={startDateBooking} onChange={(date) => setStartDateBooking(date)} placeholderText="Booking Date"/><ImCalendar />
                    <span className={styles.bookingsTableDropdownTopText}>Booking Date</span>
                </div>
                <div>
                    <DatePicker selected={startDateArrival} onChange={(date) => setStartDateArrival(date)} placeholderText="Arrival Date"/><ImCalendar />
                    <span className={styles.bookingsTableDropdownTopText}>Arrival Date</span>
                </div>
                <div>
                    <DatePicker selected={startDateDeparture} onChange={(date) => setStartDateDeparture(date)} placeholderText="Departure Date"/><ImCalendar />
                    <span className={styles.bookingsTableDropdownTopText}>Departure Date</span>
                </div>
                {/* <span className={styles.bookingsTableDropdown}><span>Arrival Date</span><ImCalendar /></span> */}
                {/* <span className={styles.bookingsTableDropdown}><span>Departure Date</span><ImCalendar /></span> */}
                <button onClick={()=>{
                        setRoomType('All');
                        setBookingStatus('All');
                        setBookingSource('All');
                        setStartDateArrival(new Date());
                        setStartDateBooking(new Date());
                        setStartDateDeparture(new Date());
                }}>Reset</button>
            </div>
            <div className={styles.bookingsTable}>
                <Row className={styles.bookingsTableHeadingRow}>
                    <Col><span>Action</span></Col>
                    <Col><span>Reservation Id</span></Col>
                    <Col><span>Name</span></Col>
                    <Col><span>Booking Date</span></Col>
                    <Col><span>Arrival</span></Col>
                    <Col><span>Departure</span></Col>
                    <Col><span>Room Type/Room No</span></Col>
                    <Col><span>Source</span></Col>
                    <Col><span>Status</span></Col>
                    <Col><span>Payable Amount</span></Col>
                    <Col><span>Note</span></Col>
                    <Col><span>Action</span></Col>
                </Row>
                {
                   booking ? booking.map((val,i)=>{
                        // console.log(val.bookings)
                        if (val.bookings) {
                            return val.bookings.map((val2,j)=>{
                                // console.log(val2.$.room_type)
                                // startDateArrival?.reverse()
                                return (
                                    <>
                                {arrivalDateToShow == val2.$.arrival || bookingDateToShow == val2.$.booking_date.slice(0,10) || departureDateToShow == val2.$.departure?
                                    <Row key={j} className={styles.bookingsTableInnerRow}>
                                    <Col><span><BsThreeDotsVertical size={25} /></span></Col>
                                    <Col><span>{val2.$.booking_id}</span></Col>
                                    <Col><span>{val2.customer[0].$.first_name} {val2.customer[0].$.last_name}</span></Col>
                                    <Col><span>{val2.$.booking_date.slice(0,10)}</span></Col>
                                    <Col><span>{val2.$.arrival}</span></Col>
                                    <Col><span>{val2.$.departure}</span></Col>
                                    <Col><span>{val2.$.room_type}</span></Col>
                                    <Col><span>Walkin</span></Col>
                                    <Col><span>{val2.$.status}</span></Col>
                                    <Col><span>{val2.prices[0].$.net_inclusive_amt}</span></Col>
                                    <Col><span></span></Col>
                                    <Col><span><BsThreeDotsVertical size={25} /></span></Col>
                                </Row> : 
                                <Row key={j} className={styles.bookingsTableInnerRow}>
                                <Col><span><BsThreeDotsVertical size={25} /></span></Col>
                                <Col><span>{val2.$.booking_id}</span></Col>
                                <Col><span>{val2.customer[0].$.first_name} {val2.customer[0].$.last_name}</span></Col>
                                <Col><span>{val2.$.booking_date.slice(0,10)}</span></Col>
                                <Col><span>{val2.$.arrival}</span></Col>
                                <Col><span>{val2.$.departure}</span></Col>
                                <Col><span>{val2.$.room_type}</span></Col>
                                <Col><span>Walkin</span></Col>
                                <Col><span>{val2.$.status}</span></Col>
                                <Col><span>{val2.prices[0].$.net_inclusive_amt}</span></Col>
                                <Col><span></span></Col>
                                <Col><span><BsThreeDotsVertical size={25} /></span></Col>
                            </Row>
                                }
                                {/* </Row> */}
                                </>
                                )
                            })
                        }
                    })
                :''}
            </div>
        </div>
    </div>
    </div>
  )
}

export default Bookings;