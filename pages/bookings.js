import React from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Bookings.module.css';
import Link from 'next/link';
import { useEffect,useState } from 'react';
import {BiArrowBack,BiSearch} from 'react-icons/bi';
import {MdAddCircle} from 'react-icons/md';
import {AiFillCaretDown} from 'react-icons/ai';
import {BsThreeDotsVertical} from 'react-icons/bs';
import { Col, Row } from 'react-bootstrap';

const Bookings = ()=> {
    const [bookings, setBookings] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/getBookingsRetrieval')
        .then(response => response.json())
        .then((data) => {
        //  console.log(data);
         setBookings(data);
        })
  }, [])
//   console.log(bookings)
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
                <button><MdAddCircle size={20} className={styles.bookingsTableButtonIcon}/> A Room</button>
                <button><MdAddCircle size={20} className={styles.bookingsTableButtonIcon}/> Property</button>
                <button><MdAddCircle size={20} className={styles.bookingsTableButtonIcon}/> Enquiry</button>
                <span className={styles.bookingsTableButtonsGroup}>
                    <button>Recent Booking</button>
                    <button>Todays Arrival</button>
                    <button>In House</button>
                    <button>Todays Departure</button>
                </span>
            </div>
            <div className={styles.bookingsTableDropdownsSection}>
                <span className={styles.bookingsTableDropdown}><span>All</span><AiFillCaretDown /></span>
                <span className={styles.bookingsTableDropdown}><span>All</span><AiFillCaretDown /></span>
                <span className={styles.bookingsTableDropdown}><span>All</span><AiFillCaretDown /></span>
                <span className={styles.bookingsTableDropdown}><span>All</span><AiFillCaretDown /></span>
                <span className={styles.bookingsTableDropdown}><span>All</span><AiFillCaretDown /></span>
                <span className={styles.bookingsTableDropdown}><span>All</span><AiFillCaretDown /></span>
                <button>Reset</button>
            </div>
            <div className={styles.bookingsTable}>
                {
                    // bookings.map((val,i)=>{
                    //     console.log(val.booking)
                    //     return (
                    //     <Row key={i} className={styles.bookingsTableHeadingRow}>
                    //         <Col><span>Action</span></Col>
                    //         <Col><span>Reservation Id</span></Col>
                    //         <Col><span>Name</span></Col>
                    //         <Col><span>Booking Date</span></Col>
                    //         <Col><span>Arrival</span></Col>
                    //         <Col><span>Departure</span></Col>
                    //         <Col><span>Room Type/Room No</span></Col>
                    //         <Col><span>Source</span></Col>
                    //         <Col><span>Status</span></Col>
                    //         <Col><span>Payable Amount</span></Col>
                    //         <Col><span>Note</span></Col>
                    //         <Col><span>Action</span></Col>
                    //     </Row>
                    //     )
                    // })
                }
                {/* <Row className={styles.bookingsTableInnerRow}>
                    <Col><span><BsThreeDotsVertical size={25} /></span></Col>
                    <Col><span>BST-B-1690</span></Col>
                    <Col><span>Inzamam Pawaskar</span></Col>
                    <Col><span>Aug 12, 2022 to Aug 13, 2022</span></Col>
                    <Col><span>Fri, Aug 12,01:30 PM<span>ETA</span></span></Col>
                    <Col><span>Fri, Aug 12,01:30 PM<span>ETA</span></span></Col>
                    <Col><span>Double Room 302</span></Col>
                    <Col><span>Walkin</span></Col>
                    <Col><span>CONFIRMED</span></Col>
                    <Col><span>₹4,000.00</span></Col>
                    <Col><span></span></Col>
                    <Col><span><BsThreeDotsVertical size={25} /></span></Col>
                </Row>
                <Row className={styles.bookingsTableInnerRow}>
                    <Col><span><BsThreeDotsVertical size={25} /></span></Col>
                    <Col><span>BST-B-1690</span></Col>
                    <Col><span>Inzamam Pawaskar</span></Col>
                    <Col><span>Aug 12, 2022 to Aug 13, 2022</span></Col>
                    <Col><span>Fri, Aug 12,01:30 PM<span>ETA</span></span></Col>
                    <Col><span>Fri, Aug 12,01:30 PM<span>ETA</span></span></Col>
                    <Col><span>Double Room 302</span></Col>
                    <Col><span>Walkin</span></Col>
                    <Col><span>CONFIRMED</span></Col>
                    <Col><span>₹4,000.00</span></Col>
                    <Col><span></span></Col>
                    <Col><span><BsThreeDotsVertical size={25} /></span></Col>
                </Row>
                <Row className={styles.bookingsTableInnerRow}>
                    <Col><span><BsThreeDotsVertical size={25} /></span></Col>
                    <Col><span>BST-B-1690</span></Col>
                    <Col><span>Inzamam Pawaskar</span></Col>
                    <Col><span>Aug 12, 2022 to Aug 13, 2022</span></Col>
                    <Col><span>Fri, Aug 12,01:30 PM<span>ETA</span></span></Col>
                    <Col><span>Fri, Aug 12,01:30 PM<span>ETA</span></span></Col>
                    <Col><span>Double Room 302</span></Col>
                    <Col><span>Walkin</span></Col>
                    <Col><span>CONFIRMED</span></Col>
                    <Col><span>₹4,000.00</span></Col>
                    <Col><span></span></Col>
                    <Col><span><BsThreeDotsVertical size={25} /></span></Col>
                </Row> */}
            </div>
        </div>
    </div>
    </div>
  )
}

export default Bookings;