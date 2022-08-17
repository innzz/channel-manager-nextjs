import React from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Bookings.module.css';
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

const Bookings = ()=> {
    const [bookingsResponse, setBookingsResponse] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [booking, setBooking] = useState([{}]);
    const [startDateArrival, setStartDateArrival] = useState(null);
    const [startDateBooking, setStartDateBooking] = useState(null);
    const [startDateDeparture, setStartDateDeparture] = useState(null);
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
    }, [])
// console.log(bookingsResponse)
// console.log(bookings)
// console.log(booking)

  return (
    <div className={styles.bookingsOuterContainer}>
    <Navbar />
    <div className={styles.bookingsMainContainer}>
        <div className={styles.bookingsSearchSection}>
            <span className={styles.bookingsSearchSectionBookingsMngmtSpan}><Link href={'/siteminder/237'}><BiArrowBack className={styles.bookingsSearchSectionBookingsMngmtIcon} /></Link>Booking Management</span>
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
                <span className={styles.bookingsTableDropdown}><span>All</span><AiFillCaretDown /><span className={styles.bookingsTableDropdownTopText}>Filter By Room Type</span></span>
                <span className={styles.bookingsTableDropdown}><span>All</span><AiFillCaretDown /><span className={styles.bookingsTableDropdownTopText}>Filter By Booking Status</span></span>
                <span className={styles.bookingsTableDropdown}><span>All</span><AiFillCaretDown /><span className={styles.bookingsTableDropdownTopText}>Filter By Booking Source</span></span>
                {/* <span className={styles.bookingsTableDropdown}><span>Booking Date</span><ImCalendar /></span> */}
                <div>
                    <DatePicker selected={startDateBooking} onChange={(date) => setStartDateBooking(date)} placeholderText="Booking Date"/><ImCalendar />
                </div>
                <div>
                    <DatePicker selected={startDateArrival} onChange={(date) => setStartDateArrival(date)} placeholderText="Arrival Date"/><ImCalendar />
                </div>
                <div>
                    <DatePicker selected={startDateDeparture} onChange={(date) => setStartDateDeparture(date)} placeholderText="Departure Date"/><ImCalendar />
                </div>
                {/* <span className={styles.bookingsTableDropdown}><span>Arrival Date</span><ImCalendar /></span> */}
                {/* <span className={styles.bookingsTableDropdown}><span>Departure Date</span><ImCalendar /></span> */}
                <button>Reset</button>
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
                                return (
                                <Row key={j} className={styles.bookingsTableInnerRow}>
                                    <Col><span><BsThreeDotsVertical size={25} /></span></Col>
                                    <Col><span>{val2.$.booking_id}</span></Col>
                                    <Col><span>{val2.customer[0].$.first_name} {val2.customer[0].$.last_name}</span></Col>
                                    <Col><span>{val2.$.booking_date}</span></Col>
                                    <Col><span>{val2.$.arrival}<span>ETA</span></span></Col>
                                    <Col><span>{val2.$.departure}<span>ETA</span></span></Col>
                                    <Col><span>{val2.$.room_type}</span></Col>
                                    <Col><span>Walkin</span></Col>
                                    <Col><span>{val2.$.status}</span></Col>
                                    <Col><span>{val2.prices[0].$.net_inclusive_amt}</span></Col>
                                    <Col><span></span></Col>
                                    <Col><span><BsThreeDotsVertical size={25} /></span></Col>
                                </Row>
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