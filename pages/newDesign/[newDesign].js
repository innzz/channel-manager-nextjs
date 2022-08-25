import React from "react";
import styles from "../../styles/Siteminder.module.css";
import NavBar from "../../components/Navbar";
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

const NewDesign = () => {
  let router = useRouter();

  const { newDesign } = router.query;
  // console.log(siteminder)
  const [allRatesAvailiblityDropDown, setAllRatesAvailiblityDropDown] =
    useState(false);
  const [shopModal, setshopModal] = useState(false);
  const [showTravelAgencyName, setShowTravelAgencyName] = useState("");
  const [roomType, setRoomType] = useState(false);
  const [ratePlans, setRatePlans] = useState(false);
  const [dropdownValue, setDropDownValue] = useState([]);
  const [roomDetails, setRoomDetails] = useState([]);
  const [bulkUpdateModal, setBulkUpdateModal] = useState(false);
  const [agodaPropertyId, setAgodaPropertyId] = useState("");
  const [agodaPropertyResult, setAgodaPropertyResult] = useState("");

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

  // console.log(currDate, nextSevenDay);
  // const newArr = currDate.split("-");
  // console.log(newCurrDate, newSevenDay);

  useEffect(() => {
    if (newDesign !== undefined) {
      fetch(
        `https://api.bookonelocal.in/channel-integration/api/channelManager/property/${newDesign}`,
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
          // console.log(resJson);
          setBookOneResponse(resJson);
          setDropDownValue(resJson.propertiesOnlineTravelAgencies);
          setShowTravelAgencyName(
            resJson.propertiesOnlineTravelAgencies[0]?.onlineTravelAgencyName
          );
          setRoomDetails(resJson.roomDtos);
          setAgodaPropertyId(resJson.propertiesOnlineTravelAgencies);
        });
    }
  }, [router]);

  // console.log(bookOneResponse.propertiesOnlineTravelAgencies);

  // const [doubleRoomDtosOne, setDoubleRoomDtosOne] = useState("");

  let noPlans = [];
  let doubleRoomDtos = [];
  let twinRoomDtos = [];

  let a = Object.keys(roomDetails).map((val, i) => {
    // return roomDetails[val].onlineTravelAgenciesDto;
    if (roomDetails[val].name == "Double Room") {
      doubleRoomDtos.push(roomDetails[val].onlineTravelAgenciesDto);
      // setDoubleRoomDtosOne(roomDetails[val].onlineTravelAgenciesDto);
    } else if (roomDetails[val].name == "Twin Room") {
      twinRoomDtos.push(roomDetails[val].onlineTravelAgenciesDto);
    } else {
    }
    // console.log(roomDetails[val].name);
  });

  let doubleRoomOta = [];

  for (let i = 0; i < doubleRoomDtos.length; i++) {
    let kbc = doubleRoomDtos[i];
    // console.log(kbc);
    for (let j = 0; j < Object.keys(kbc).length; j++) {
      // console.log(kbc[j]);
      doubleRoomOta.push(kbc[j]);
    }
  }

  // console.log(roomDetails);

  let roomDetailsOta = [];

  let otaDetailSecond = [];

  let roomDetailsOtaFIlter = Object.keys(roomDetails).map((val, i) => {
    return roomDetails[val]?.onlineTravelAgenciesDto;
  });

  let abc = roomDetailsOtaFIlter?.map((val, i) => {
    console.log(val[i]?.name);
    // roomDetailsOta.push(val[i]?.name);
  });
  // console.log(abc);

  let otaFIlter = dropdownValue.map((val, i) => {
    const filtered = val.onlineTravelAgencyName;
    otaDetailSecond.push(filtered);
  });
  // console.log(roomDetailsOta, otaDetailSecond);

  const difference = otaDetailSecond.filter((x) => !roomDetailsOta.includes(x));
  // console.log(difference);

  // console.log(notIncludedProperty[0].onlineTravelAgencyName);

  // const abp = doubleRoomOta.map((key, value) => {
  //   return ({key.name})
  // })

  // let c = [];
  // for (let i = 0; i < a.length; i++) {
  //   let b = a[i]["onlineTravelAgenciesDto"];
  //   c.push(b);
  // }
  // console.log(c);

  // const obj = bookOneResponse;
  // console.log(obj);

  // const a = Object.keys(obj).map(function (key, value) {
  //   obj[key];
  // });
  // console.log(a);

  // const obj = Object.keys(bookOneResponse).map((val, i) => {
  //   return bookOneResponse.roomDtos[0].onlineTravelAgenciesDto[0].name;
  // });
  // console.log(obj);

  // let newObj = [];

  // for (let i = 0; i < Object.keys(bookOneResponse).length; i++) {
  //   let iRes = bookOneResponse.roomDtos;
  //   newObj.push(iRes);
  //   // console.log(iRes);
  //   // for (let j = 0; j < Object.keys(iRes).length; j++) {
  //   //   let jRes = Object.values(iRes);
  //   //   console.log(jRes);
  //   //   // newObj.push(jRes);
  //   // }
  // }
  // console.log(newObj);

  const otaHandler = (id, newCurrDate, newSevenDay) => {
    const data = { id: id, fromDate: newCurrDate, toDate: newSevenDay };
    // console.log(id);
    fetch(`http://localhost:5000/propertyData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setAgodaPropertyResult(data);
        console.log("success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // console.log(propertyResult.result.properties[0].property[0].$.date);
  // console.log(propertyResult.result.properties[0]);

  // const dateArray = propertyResult.result.properties.map((val, i) => {
  //   console.log(val);
  // });
  // console.log(dateArray);

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
      {/* {aaa.map((val, i) => {

      })} */}
      <div className={styles.container}>
        <div className={styles.topBarButtons}>
          <div className={styles.channelmanagerButton}>
            <span className={styles.channelManagerFont}>Channel Manager:</span>
            <button
              onClick={handleShopModal}
              className={styles.channelSelectionBtn}
            >
              {dropdownValue.length !== 0
                ? showTravelAgencyName
                : "onlineTravelAgencyName"}{" "}
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
                            setShowTravelAgencyName(val.onlineTravelAgencyName);
                            otaHandler(
                              val.onlineTravelAgencyPropertyId,
                              newCurrDate,
                              newSevenDay
                            );
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
                <div className={styles.dateContainer}>
                  <div className={styles.date}>
                    <h4>Tue</h4>
                    <p>23</p>
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

              {val.onlineTravelAgenciesDto.map((val2, j) => {
                return (
                  <div key={j} className={styles.thirdSection}>
                    <div className={styles.otaContainer}>
                      <div className={styles.otaImage}>
                        <img src={val2.logoUrl} alt="" />
                      </div>
                      <div className={styles.otaRoomPlans}>
                        <h3>{val2.name}</h3>
                        <h4>(Deluxe Room - Buffet Combo)</h4>
                      </div>
                    </div>
                    <div className={styles.stockPriceContainer}>
                      <div className={styles.stockPrice}>
                        <p>Stock: </p>
                        <p>Price: </p>
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
                      <div className={styles.pricing}>
                        <p>10</p>
                        <p>$10</p>
                      </div>
                    </div>
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

export default NewDesign;
