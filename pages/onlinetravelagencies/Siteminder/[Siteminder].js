import React from "react";
import styles from "../../../styles/Ota.module.css";
import NavBar from "../../../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { FaBed, FaSave } from "react-icons/fa";
import { AiFillThunderbolt, AiFillCaretDown } from "react-icons/ai";
import { MdOutlineArrowDropDown, MdSystemUpdateAlt } from "react-icons/md";
import { BsFillTagFill, BsFillStarFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { GoTriangleRight } from "react-icons/go";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdArrowDropDown,
} from "react-icons/md";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";
import { GrRotateLeft } from "react-icons/gr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const Siteminder = ({ showTravelAgencyName, setShowTravelAgencyName }) => {
  let router = useRouter();

  const { Siteminder } = router.query;
  // console.log(siteminder)
  const [allRatesAvailiblityDropDown, setAllRatesAvailiblityDropDown] =
    useState(false);
  const [shopModal, setshopModal] = useState(false);
  const [roomType, setRoomType] = useState(false);
  const [ratePlans, setRatePlans] = useState(false);
  const [dropdownValue, setDropDownValue] = useState([]);
  const [roomDetails, setRoomDetails] = useState([]);
  const [bulkUpdateModal, setBulkUpdateModal] = useState(false);
  const [otas, setOtas] = useState("");

  const [SiteminderPropertyResult, setSiteminderPropertyResult] = useState([]);
  const [SiteminderDatesToShow, setSiteminderDatesToShow] = useState([]);

  const [bookOneResponse, setBookOneResponse] = useState("");

  const handleShopModal = () => {
    setshopModal(!shopModal);
  };

  const handleBulkUpdateModal = () => {
    setBulkUpdateModal(!bulkUpdateModal);
  };

  //Current Date
  const currentDate = new Date().toLocaleDateString().split("/");
  // const newCurrentDate = [];
  for (let i = 0; i < currentDate.length; i++) {
    if (currentDate[i] < 10) {
      currentDate[i] = 0 + currentDate[i];
    }
    // newCurrentDate.push(currentDate[i]);
  }
  const currDate = currentDate.reverse();
  let tempArrival = "";
  tempArrival = currentDate[2];
  currentDate[2] = currentDate[1];
  currentDate[1] = tempArrival;
  let newCurrDate = currDate.join("-");

  // Sevens Days
  const sevenDaysDate = new Date();
  sevenDaysDate.setDate(sevenDaysDate.getDate() + 6);
  const sevenDays = sevenDaysDate.toLocaleDateString().split("/");
  const newSevenDays = [];
  for (let i = 0; i < sevenDays.length; i++) {
    if (sevenDays[i] < 10) {
      sevenDays[i] = 0 + sevenDays[i];
    }
    newSevenDays.push(sevenDays[i]);
  }
  const nextSevenDay = sevenDays.reverse();
  let newTempArr = "";
  newTempArr = sevenDays[2];
  sevenDays[2] = sevenDays[1];
  sevenDays[1] = newTempArr;

  let newSevenDay = sevenDays.join("-");

  const changeLocation = (showTravelAgencyName) => {
    if (showTravelAgencyName.onlineTravelAgencyName === "Agoda") {
    //   setShowTravelAgencyName(showTravelAgencyName);
      //   localStorage.setItem('travelAgency',JSON.stringify(showTravelAgencyName));
      router.push(`/onlinetravelagencies/Agoda/${Siteminder}`);
      // setShowTravelAgencyName(JSON.parse(localStorage.getItem('travelAgency')));
    }
    // console.log(JSON.parse(localStorage.getItem('travelAgency')));
  };

  useEffect(() => {
    fetch(
      `https://api.bookonelocal.in/channel-integration/api/channelManager/property/${Siteminder}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJib29rb25ldGVzdGJ1c2luZXNzQGdtYWlsLmNvbSIsInNjb3BlcyI6IlJPTEVfUFJPUF9BRE1JTiIsImlhdCI6MTY1ODg5Njk5OCwiZXhwIjoxNjU5MzI4OTk4fQ.yJpc1N9tn_q345k3hZHLapQaeXVO23xlWkbQwhPx7XI",
          "Content-Type": "application/json",
          APP_ID: "BOOKONE_WEB_APP",
        },
      }
    )
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        setBookOneResponse(resJson);
        setDropDownValue(resJson.propertiesOnlineTravelAgencies);
        for (
          let i = 0;
          i < resJson.propertiesOnlineTravelAgencies.length;
          i++
        ) {
          if (
            resJson.propertiesOnlineTravelAgencies[i].onlineTravelAgencyName ==
            "SiteMinder"
          ) {
            setShowTravelAgencyName(resJson.propertiesOnlineTravelAgencies[i]);
          }
        }
        setRoomDetails(resJson.roomDtos);
        setOtas(resJson.propertiesOnlineTravelAgencies);
      });
  }, [Siteminder]);

  // console.log(bookOneResponse)
  // console.log(SiteminderDatesToShow);
  // console.log(roomDetails)
  // console.log(otas)
  // console.log(dropdownValue)
  //   console.log('travel agency',showTravelAgencyName)

  const handleRoomTypesDrop = () => {
    setRoomType(!roomType);
  };

  const handleRateDrop = () => {
    setRatePlans(!ratePlans);
  };

  const handleRatesAvailiblityDropDown = () => {
    setAllRatesAvailiblityDropDown(!allRatesAvailiblityDropDown);
  };

  return (
    <div className={styles.bigContainer}>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.topBarButtons}>
          <div className={styles.channelmanagerButton}>
            <span className={styles.channelManagerFont}>Channel Manager:</span>
            <button
              onClick={handleShopModal}
              className={styles.channelSelectionBtn}
            >
              {dropdownValue.length !== 0
                ? showTravelAgencyName.onlineTravelAgencyName
                : "onlineTravelAgencyName"}
              <AiFillCaretDown />
              {shopModal ? (
                <div
                  onMouseLeave={handleShopModal}
                  className={styles.shopModal}
                  style={shopModal ? { display: "block" } : { display: "none" }}
                >
                  {dropdownValue.map((val, i) => {
                    return (
                      <li key={i}>
                        <button
                          type="button"
                          onClick={() => {
                            changeLocation(val);
                          }}
                        >
                          {val.onlineTravelAgencyName}
                        </button>
                      </li>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </button>
          </div>
          <div className={styles.buttonsWrapper}>
            <button
              onClick={handleBulkUpdateModal}
              className={styles.bulkUpdateBtn}
            >
              <MdSystemUpdateAlt />
              <span>Bulk Update</span>
            </button>
            <span className={styles.resetLink}>
              <GrRotateLeft />
              <span>Reset</span>
            </span>
            <button className={styles.saveBtn}>
              <FaSave />
              <span>Save</span>
            </button>
          </div>
        </div>

        <div className={styles.RoomsMainContainerOne}>
          <div className={styles.dateHeading}>
            <h3>Dates: </h3>
          </div>
          <div className={styles.dateContainer}>
            <div className={styles.date}>
              <h4>Wed</h4>
              <p>24</p>
            </div>
            <div className={styles.date}>
              <h4>Wed</h4>
              <p>24</p>
            </div>
            <div className={styles.date}>
              <h4>Thu</h4>
              <p>25</p>
            </div>
            <div className={styles.date}>
              <h4>Fri</h4>
              <p>26</p>
            </div>
            <div className={styles.date}>
              <h4>Sat</h4>
              <p>27</p>
            </div>
            <div className={styles.date}>
              <h4>Sun</h4>
              <p>28</p>
            </div>
            <div className={styles.date}>
              <h4>Mon</h4>
              <p>29</p>
            </div>
          </div>
        </div>
        {roomDetails.map((val, i) => {
          return (
            <div key={i} className={styles.RoomsMainContainer}>
              <div className={styles.roomTypeHeading}>
                <h2>{val.name}</h2>
              </div>
              <div className={styles.secondSection}>
                <div className={styles.roomTypeheading}>
                  <h3>Deluxe Room with Buffet</h3>
                </div>
              </div>

              {val.onlineTravelAgenciesDto.map((val2, j) => {
                return (
                  <div key={j}>
                    {val2.name ==
                    showTravelAgencyName.onlineTravelAgencyName ? (
                      <div className={styles.thirdSection}>
                        <div className={styles.otaContainer}>
                          <div className={styles.otaInnerContainer}>
                            <div className={styles.otaImage}>
                              <img src={val2.logoUrl} alt="" />
                            </div>
                            <div className={styles.otaRoomPlans}>
                              <h3>{val2.name}</h3>
                              <h4>(Deluxe Room - Buffet Combo)</h4>
                            </div>
                          </div>
                          <div className={styles.stockPrice}>
                            <p>Stock: </p>
                            <p>Price: </p>
                          </div>
                        </div>
                        <div className={styles.stockPriceContainer}>
                          <div className={styles.pricing}>
                            <p>10</p>
                            <p>$10</p>
                          </div>
                          <div className={styles.pricing}>
                            <p>10</p>
                            <p>$10</p>
                          </div>
                          <div className={styles.pricing}>
                            <p>10</p>
                            <p>$10</p>
                          </div>
                          <div className={styles.pricing}>
                            <p>10</p>
                            <p>$10</p>
                          </div>
                          <div className={styles.pricing}>
                            <p>10</p>
                            <p>$10</p>
                          </div>
                          <div className={styles.pricing}>
                            <p>10</p>
                            <p>$10</p>
                          </div>
                          <div className={styles.pricing}>
                            <p>10</p>
                            <p>$10</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Siteminder;
