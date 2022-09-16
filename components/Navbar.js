import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { TbNotes } from "react-icons/tb";
import { MdSupportAgent } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../styles/Navbar.module.css";
import { MdSystemUpdateAlt } from "react-icons/md";
function NavBar(props) {
  const router = useRouter();
  // console.log(props.bookingId);
  const [bthList, setBthList] = useState(false);
  const bookOneTextHotel = () => {
    setBthList(!bthList);
  };

  const logOutFunction = ()=>{
    localStorage.removeItem("token");
    router.push('/')
  }

  return (
    <div className={styles.navbarContainer}>
      <Col className={styles.logo}>
        <Link href={"#"}>
          <Image
            className={styles.logoImage}
            height={60}
            width={150}
            src="/logo.svg"
          />
        </Link>
      </Col>
      <Col className={styles.navItem}>
        {/* <div className={styles.links}>
          <Link href="/login" className={styles.link}>
            CRS
          </Link>
          <Link href="/login" className={styles.link}>
            CM
          </Link>
        </div> */}
      </Col>
      <Col className={styles.profileButtonColumn}>
        <div
          className={`${styles.profileButton} flex`}
          onClick={bookOneTextHotel}
        >
          BookOne test Hotel
          <span>
            <IoMdArrowDropdown size={25} />
          </span>
          {/* <div
                        className={styles.roomTypeDrop}
                        onMouseLeave={bookOneTextHotel}
                        style={bthList ? { display: "block" } : { display: "none" }}
                    > */}
          <div
            className={styles.roomTypeDrop}
            onMouseLeave={bookOneTextHotel}
            style={bthList ? { display: "block" } : { display: "none" }}
          >
            <li className="flex gap-2">
              <CgProfile className="h-6" /> <span>My Account</span>
            </li>
            <li className="flex gap-2">
              <TbNotes className="h-6" />
              <span>Terms & Condition </span>
            </li>
            <li className="flex gap-2">
              <MdSupportAgent className="h-6" />
              <span>Support</span>
            </li>
            <Link href={`/bookings/${props.bookingId}`}>
              <li className="flex gap-2">
                <MdSupportAgent className="h-6" />
                <span>Bookings</span>
              </li>
            </Link>
            {/* <Link href="/" onClick={()=>{localStorage.removeItem("token")}}> */}
              <li className="flex gap-2" onClick={logOutFunction}>
                <AiOutlineLogout className="h-6" />
                <span>Logout</span>
              </li>
            {/* </Link> */}
          </div>
          {/* </div> */}
        </div>
      </Col>
    </div>
  );
}

export default NavBar;
