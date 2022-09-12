import styles from "../../styles/Siteminder.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { FaBed } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { BsFillTagFill, BsFillStarFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { GoTriangleRight } from "react-icons/go";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight,MdModeEditOutline } from "react-icons/md";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";
import { GrRotateLeft } from "react-icons/gr";
import { IoIosSave } from "react-icons/io";
import { GiCancel } from "react-icons/gi";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

export default function PropertyId() {
  let router = useRouter();

  //   let token = localStorage.getItem("token");
  //   console.log(token);
  //   console.log(router);

  const { propertyId } = router.query;
  // console.log(siteminder)
  const [allRatesAvailiblityDropDown, setAllRatesAvailiblityDropDown] =
    useState(false);
  const [shopModal, setshopModal] = useState(false);
  const [roomType, setRoomType] = useState(false);
  const [ratePlans, setRatePlans] = useState(false);
  const [roomDetails, setRoomDetails] = useState([]);
  const [bulkUpdateModal, setBulkUpdateModal] = useState(false);
  const [currentDate, setCurrentdate] = useState("");
  const [seventhDayDate, setSeventhDayDate] = useState("");
  const [roomDetailsToShow, setRoomDetailsToShow] = useState("");
  const [sevenDaysDataOfRoom, setSevenDaysDataofRooms] = useState([]);
  const [filteredPlan, setFilteredPlanName] = useState("");
  const [token, setToken] = useState("");
  const [noOfDays, setNoOfDays] = useState(7);
  const [updationRoom, setUpdationRoom] = useState({});
  const [updationRoomState, setUpdationRoomState] = useState(false);
  const [nextPrevArrows, setNextPrevArrows] = useState(true);
  const handleShopModal = () => {
    setshopModal(!shopModal);
  };

  const handleBulkUpdateModal = () => {
    setBulkUpdateModal(!bulkUpdateModal);
  };

  //It will give Current Date
  const getCurrentDateFunction = () => {
    const currentDate = new Date().toLocaleDateString().split("/");
    // const currentDateNew = [];
    for (let i = 0; i < currentDate.length; i++) {
      if (currentDate[i] < 10) {
        currentDate[i] = 0 + currentDate[i];
      }
    }
    const currDate = currentDate.reverse();
    let tempArrival = "";
    tempArrival = currentDate[2];
    currentDate[2] = currentDate[1];
    currentDate[1] = tempArrival;

    let currentDateNew = currDate.join("-");
    return currentDateNew;
  };

  // It will give seventh Day Date from Current Date
  const getSevenDaysAfterDate = (noOfDays) => {
    const sevenDaysDate = new Date();
    sevenDaysDate.setDate(sevenDaysDate.getDate() + noOfDays);
    const sevenDays = sevenDaysDate.toLocaleDateString().split("/");
    const newSevenDays = [];
    for (let i = 0; i < sevenDays.length; i++) {
      if (sevenDays[i] < 10) {
        sevenDays[i] = 0 + sevenDays[i];
      }
      newSevenDays.push(sevenDays[i]);
    }
    const newSevenDaysDate = sevenDays.reverse();
    let newTempArr = "";
    newTempArr = sevenDays[2];
    sevenDays[2] = sevenDays[1];
    sevenDays[1] = newTempArr;

    let seventhDayDate = sevenDays.join("-");
    return seventhDayDate;
  };

  // This function will set seven Days Data of a Specific Room
  const getSevenDaysDataOfRoom = async (token, roomId) => {
    let currentDateFuncResponse = getCurrentDateFunction();
    setCurrentdate(currentDateFuncResponse);
    // console.log(token, roomId);
    let res = await fetch(
      `https://api.bookonelocal.in/api-bookone/api/availability/getNext7daysRatesAndAvailabilityForRoom?PropertyId=${propertyId}&RoomId=${roomId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          APP_ID: "BOOKONE_WEB_APP",
        },
      }
    );
    let resJson = await res.json();
    setSevenDaysDataofRooms(resJson);
    setNoOfDays(14);
  };

  //This function will set Previuos Seven Days Data of Specific Room
  const getPreviousSevenDaysDataOfRooms = async (propertyId, roomId) => {
    if (noOfDays >= 21) {
      setNoOfDays(noOfDays - 7);
    }
    let currentDateFuncResponse = getSevenDaysAfterDate(noOfDays - 14);
    let seventhDayDateFuncResponse = getSevenDaysAfterDate(noOfDays - 7);
    const data = {
      fromDate: currentDateFuncResponse,
      propertyId: propertyId,
      roomId: roomId,
      toDate: seventhDayDateFuncResponse,
    };
    let previousSevenDaysRes = await fetch(
      `https://api.bookonelocal.in/api-bookone/api/availability/getRatesAndAvailabilityForRoomByDate`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          APP_ID: "BOOKONE_WEB_APP",
        },
        body: JSON.stringify(data),
      }
    );
    let previousSevenDaysResponse = await previousSevenDaysRes.json();
    let previousSevenDaysResponseJson = previousSevenDaysResponse;
    setCurrentdate(currentDateFuncResponse);
    setSevenDaysDataofRooms(previousSevenDaysResponseJson);

    // }
  };

  //This function will set User specific dates Data of Specific Room
  const getDatePickerDataOfRooms = async (startDate, endDate) => {
    setNoOfDays(7);
    const data = {
      fromDate: startDate,
      propertyId: propertyId,
      roomId: sevenDaysDataOfRoom[0].roomId,
      toDate: endDate,
    };
    let datePickerDataRes = await fetch(
      `https://api.bookonelocal.in/api-bookone/api/availability/getRatesAndAvailabilityForRoomByDate`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          APP_ID: "BOOKONE_WEB_APP",
        },
        body: JSON.stringify(data),
      }
    );
    let datePickerDataResponse = await datePickerDataRes.json();
    let datePickerDataResponseJson = datePickerDataResponse;
    // console.log(datePickerDataResponseJson);
    setCurrentdate(startDate);
    setSevenDaysDataofRooms(datePickerDataResponseJson);
    setNextPrevArrows(false);
  };

    //This function will set Next seven dates Data of Specific Room
  const getNextSevenDaysDataOfRooms = async (propertyId, roomId) => {
    let currentDateFuncResponse = getSevenDaysAfterDate(noOfDays);
    let seventhDayDateFuncResponse = getSevenDaysAfterDate(noOfDays + 7);
    setNoOfDays(noOfDays + 7);
    const data = {
      fromDate: currentDateFuncResponse,
      propertyId: propertyId,
      roomId: roomId,
      toDate: seventhDayDateFuncResponse,
    };
    let nextSevenDaysRes = await fetch(
      `https://api.bookonelocal.in/api-bookone/api/availability/getRatesAndAvailabilityForRoomByDate`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          APP_ID: "BOOKONE_WEB_APP",
        },
        body: JSON.stringify(data),
      }
    );
    let nextSevenDaysResponse = await nextSevenDaysRes.json();
    let nextSevenDaysResponseJson = nextSevenDaysResponse;
    console.log(nextSevenDaysResponseJson);
    setCurrentdate(currentDateFuncResponse);
    setSevenDaysDataofRooms(nextSevenDaysResponseJson);
  };

  //This function will set Refreshed Seven Days Data of Specific Room
  const getRefreshedSevenDaysDataOfRooms = async (roomId) => {
    let currentDateFuncResponse = getCurrentDateFunction();
    let seventhDayDateFuncResponse = getSevenDaysAfterDate(7);
    const data = {
      fromDate: currentDateFuncResponse,
      propertyId: propertyId,
      roomId: roomId,
      toDate: seventhDayDateFuncResponse,
    };
    let refreshedSevenDaysRes = await fetch(
      `https://api.bookonelocal.in/api-bookone/api/availability/getRatesAndAvailabilityForRoomByDate`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          APP_ID: "BOOKONE_WEB_APP",
        },
        body: JSON.stringify(data),
      }
    );
    let refreshedSevenDaysResponse = await refreshedSevenDaysRes.json();
    let refreshedSevenDaysResponseJson = refreshedSevenDaysResponse;
    setSevenDaysDataofRooms(refreshedSevenDaysResponseJson);
    setCurrentdate(currentDateFuncResponse);
    setNoOfDays(14);
    setNextPrevArrows(true)
  };
  
  
  //This function will update room rates and availablity of a specific room
  const updateRatesandAvailablity = async (room)=>{
    const data = {...room,updateType:"Availability",channelManagerUpdateType:"AVAILABILITY_UPDATE"};
    console.log(data)
    let updateRatesAndAvailablityRes = await fetch(
      `https://api.bookonelocal.in/api-bookone/api/availability/updateAvailability`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          APP_ID: "BOOKONE_WEB_APP",
        },
        body: JSON.stringify(data),
      }
      )
      let currentDateFuncResponse = getCurrentDateFunction();
      let seventhDayDateFuncResponse = getSevenDaysAfterDate(7);
      const dataRefreshed = {
        fromDate: currentDateFuncResponse,
        propertyId: propertyId,
        roomId: room.roomId,
        toDate: seventhDayDateFuncResponse,
      };
      let refreshedSevenDaysRes = await fetch(
        `https://api.bookonelocal.in/api-bookone/api/availability/getRatesAndAvailabilityForRoomByDate`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            APP_ID: "BOOKONE_WEB_APP",
          },
          body: JSON.stringify(dataRefreshed),
        }
      );
      let refreshedSevenDaysResponse = await refreshedSevenDaysRes.json();
      let refreshedSevenDaysResponseJson = refreshedSevenDaysResponse;
      setSevenDaysDataofRooms(refreshedSevenDaysResponseJson);
    
    setUpdationRoom({});
    setUpdationRoomState(false);
  }
  
  //it will handle the object of room to post the data to update room details
  const handleUpdationOfRoomRatesAndAvailablity = (e) => {
     if (e.target.name === "price") {
      // console.log("func ")
      setUpdationRoom({...updationRoom,price: +e.target.value})
     }
     else if (e.target.name === "noOfAvailable") {
      // console.log("func ")
      setUpdationRoom({...updationRoom,noOfAvailable: +e.target.value})
     }
  };
  
  // console.log(updationRoom);
  // console.log(sevenDaysDataOfRoom);

  useEffect(() => {
    if (propertyId !== undefined) {
      let currentDateFuncResponse = getCurrentDateFunction();
      setCurrentdate(currentDateFuncResponse);
      let tokenRes = localStorage.getItem("token");
      setToken(tokenRes);
      fetch(
        `https://api.bookonelocal.in/channel-integration/api/channelManager/property/${propertyId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenRes}`,
            "Content-Type": "application/json",
            APP_ID: "BOOKONE_WEB_APP",
          },
        }
      )
        .then((res) => res.json())
        .then((resJson) => {
          setRoomDetails(resJson.roomDtos);
          getSevenDaysDataOfRoom(tokenRes, resJson?.roomDtos[0].bookoneRoomId);
          setRoomDetailsToShow(resJson?.roomDtos[0]);
          //   console.log(sevenDayData);
          //   console.log(resJson);
        });
    }
  }, [router]);
  //   console.log(sevenDaysDataOfRoom);
  //   console.log(roomDetailsToShow);
  //   console.log(roomDetails);
  // console.log(filteredPlan);

  const handleRoomTypesDrop = () => {
    setRoomType(!roomType);
  };

  const handleRateDrop = () => {
    setRatePlans(!ratePlans);
  };

  const handleRatesAvailiblityDropDown = () => {
    setAllRatesAvailiblityDropDown(!allRatesAvailiblityDropDown);
  };

  // console.log(fromDatePicker, endDatePicker);

  return (
    <div className={styles.outerContainer}>
      <Navbar />
      <div className={styles.container}>
        <Head>
          <title>MMT Channel Manager</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.table}>
          <div className={styles.topBar}>
            <Row className={styles.dateSection}>
              <Col className={styles.dateSelector}>
                <Col>
                  <div style={{display: "flex", justifyContent: "center"}}>
                  <span>From: </span>
                  <DatePicker
                  size="small"
                    onChange={(value) => {
                      const fromDate = moment(value).format("YYYY-MM-DD");
                      setCurrentdate(fromDate);
                    }}
                  />
                  </div>
                  <div style={{display: "flex", justifyContent: "center"}}>
                  <span>To: </span>
                  <DatePicker
                    placeholder="End Date"
                    size="small"
                    onChange={(value) => {
                      const endDate = moment(value).format("YYYY-MM-DD");
                      setSeventhDayDate(endDate);
                    }}
                  />
                  </div>
                  <button className={styles.findRatesButton} onClick={()=>{getDatePickerDataOfRooms(currentDate,seventhDayDate)}}>SEARCH</button>
                </Col>
                <span>
                  <GrRotateLeft
                    onClick={() => {
                      getRefreshedSevenDaysDataOfRooms(
                        sevenDaysDataOfRoom[0].roomId
                      );
                    }}
                    size={15}
                    style={{ marginRight: "10px" }}
                  />
                  {nextPrevArrows && <AiOutlineDoubleLeft
                    size={15}
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      getPreviousSevenDaysDataOfRooms(
                        propertyId,
                        sevenDaysDataOfRoom[0].roomId
                      );
                    }}
                  />}
                  {currentDate}
                  {nextPrevArrows && <AiOutlineDoubleRight
                    size={15}
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      getNextSevenDaysDataOfRooms(
                        propertyId,
                        sevenDaysDataOfRoom[0].roomId
                      );
                    }}
                  />}
                </span>
              </Col>
              <Col className={styles.dates}>
                <Row className={styles.dateCards}>
                  {sevenDaysDataOfRoom.map((val, i) => {
                    let date = new Date(val.date);

                    return (
                      <Col className={styles.dateCard} key={i}>
                        <span>
                          {date.getDay() == 1
                            ? "MON"
                            : date.getDay() == 2
                            ? "TUE"
                            : date.getDay() == 3
                            ? "WED"
                            : date.getDay() == 4
                            ? "THU"
                            : date.getDay() == 5
                            ? "FRI"
                            : date.getDay() == 6
                            ? "SAT"
                            : date.getDay() == 0
                            ? "SUN"
                            : "NO DAY"}
                        </span>
                        <span className={styles.boldDateText}>
                          {date.getDate() < 10
                            ? "0" + date.getDate()
                            : date.getDate()}
                        </span>
                        <span>
                          {date.getMonth() == 0
                            ? "JAN"
                            : date.getMonth() == 1
                            ? "FEB"
                            : date.getMonth() == 2
                            ? "MAR"
                            : date.getMonth() == 3
                            ? "APR"
                            : date.getMonth() == 4
                            ? "MAY"
                            : date.getMonth() == 5
                            ? "JUN"
                            : date.getMonth() == 6
                            ? "JUL"
                            : date.getMonth() == 7
                            ? "AUG"
                            : date.getMonth() == 8
                            ? "SEP"
                            : date.getMonth() == 9
                            ? "OCT"
                            : date.getMonth() == 10
                            ? "NOV"
                            : date.getMonth() == 11
                            ? "DEC"
                            : "NO MONTH"}
                        </span>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </div>
          {/* <div className={styles.buttonGroup}>
            <Row>
              <Col className={styles.buttons}>
                <button onClick={handleRoomTypesDrop} className={styles.button}>
                  <FaBed
                    style={{ marginRight: "8px", marginBottom: "2px" }}
                    size={15}
                  />
                  All Room Types
                  <MdOutlineArrowDropDown
                    size={22}
                    style={{ marginLeft: "2px", marginBottom: "2px" }}
                  />
                  <div
                    className={styles.roomTypeDrop}
                    onMouseLeave={handleRoomTypesDrop}
                    style={
                      roomType ? { display: "block" } : { display: "none" }
                    }
                  >
                    {roomDetails?.map((val, i) => {
                      return (
                        <li
                          key={i}
                          onClick={() => {
                            setRoomDetailsToShow(val);
                            getSevenDaysDataOfRoom(token, val.bookoneRoomId);
                            setFilteredPlanName("");
                          }}
                        >
                          {val.name}
                        </li>
                      );
                    })}
                  </div>
                </button>
                <button className={styles.button} onClick={handleRateDrop}>
                  <BsFillTagFill
                    style={{ marginRight: "8px", marginBottom: "2px" }}
                  />
                  All Rates Plans
                  <MdOutlineArrowDropDown
                    size={22}
                    style={{ marginLeft: "2px", marginBottom: "4px" }}
                  />
                  <div
                    className={styles.ratePlanDrop}
                    onMouseLeave={handleRateDrop}
                    style={
                      ratePlans ? { display: "block" } : { display: "none" }
                    }
                  >
                    {sevenDaysDataOfRoom[0]?.roomRatePlans.map(
                      (dropdownPlan, dropKey) => {
                        return (
                          <li
                            key={dropKey}
                            onClick={() => {
                              setFilteredPlanName(dropdownPlan);
                            }}
                          >
                            {dropdownPlan.name}
                          </li>
                        );
                      }
                    )}
                  </div>
                </button>
                <span style={{cursor: "pointer"}} onClick={() => {
                      getRefreshedSevenDaysDataOfRooms(
                        sevenDaysDataOfRoom[0].roomId
                      );
                      setFilteredPlanName('')
                    }}>Clear all filters</span>
              </Col>
              <Col className={styles.rightlinkText}>
                <div className={styles.linkText}>
                  <GoTriangleRight size={20} style={{ marginBottom: "3px" }} />
                  <span>Quick Tour - Inventory Grid</span>
                </div>
              </Col>
            </Row>
          </div> */}
          <Row className={styles.content}>
                      <Col className={styles.Icon}></Col>
                      <Col
                        className={styles.leftSection}
                        style={{ border: "none" }}
                      > 
                      </Col>
                      <Col className={styles.midSection}  style={{ border: "none" }}></Col>
                      <Col className={styles.rightSection}>
                        <Row className={styles.data}>
                          {sevenDaysDataOfRoom.map((room, keyj) => {
                            return (
                              <Col className={styles.col} style={{border: "none"}} key={keyj} >
                                {updationRoomState === true && updationRoom.id === room.id ? <div style={{display: "flex",justifyContent: "space-evenly", alignItems: "center"}}><span onClick={()=>updateRatesandAvailablity(updationRoom)} className={styles.saveButton}><IoIosSave size={20} /></span><span onClick={()=>{setUpdationRoom({});setUpdationRoomState(false)}} className={styles.cancelButton}><GiCancel size={20} /></span></div> :""}
                              </Col>
                            );
                          })}
                        </Row>
                      </Col>
            </Row>
          {roomDetails?.map((val, i) => {
            return (
              <>
                {val.name == roomDetailsToShow?.name && (
                  <div key={i} className={styles.item}>
                    <Row className={styles.heading}>
                      <Col className={styles.Icon}>
                        <FaBed size={18} style={{ marginTop: "5px" }} />
                      </Col>
                      <Col className={styles.leftSection}>
                        <span>{val.name}</span>
                        <AiFillThunderbolt
                          size={15}
                          style={{ marginTop: "5px", color: "#2494d1" }}
                        />
                      </Col>
                      <Col className={styles.midSection}>Stock</Col>
                      <Col className={styles.rightSection}>
                        <Row className={styles.data}>
                          {sevenDaysDataOfRoom.map((avail) => {
                            return (
                              <>
                                {val.name == avail.roomName && (
                                  <Col className={styles.col} key={avail.id} onClick={()=>{setUpdationRoom(avail);setUpdationRoomState(true)}}>
                                    {/* {avail.noOfAvailable} */}
                                    {updationRoomState === true && updationRoom.id === avail.id ?<input type="text" name="noOfAvailable" placeholder={updationRoom.noOfAvailable} className={styles.availabilityInput} value={updationRoom.noOfAvailable} onChange={handleUpdationOfRoomRatesAndAvailablity} />: avail.noOfAvailable}
                                  </Col>
                                )}
                              </>
                            );
                          })}
                        </Row>
                      </Col>
                    </Row>
                    <Row className={styles.content}>
                      <Col className={styles.Icon}></Col>
                      <Col
                        className={styles.leftSection}
                        style={{flexDirection: "column"}}
                      >
                        <span className={styles.roomsAndPlansPricesSpan} style={{border: 'none'}}>Room Rates and Plans</span>
                        <span className={styles.roomsAndPlansPrices} style={{border: 'none'}}>
                          {sevenDaysDataOfRoom[0]?.roomRatePlans?.map((plans,ji)=>{
                            return (
                              <>{filteredPlan === "" ? <span className={styles.roomsAndPlansPricesSpan} key={ji}>{plans.name}</span> : filteredPlan.name === plans.name && <span className={styles.roomsAndPlansPricesSpan} key={ji}>{plans.name}</span>}</>
                            )
                          })}
                        </span>
                      </Col>
                      <Col className={styles.midSection}><div className={styles.roomsAndPlansPrices}>
                        <span className={styles.roomsAndPlansPricesSpan} style={{border: "none"}}>Rates :</span>
                        <span className={styles.roomsAndPlansPrices} style={{border: 'none'}}>
                          {sevenDaysDataOfRoom[0]?.roomRatePlans?.map((plans,ji)=>{
                            return (
                              <>{filteredPlan === "" ? <span className={styles.roomsAndPlansPricesSpan} key={ji}>Rates:</span> : filteredPlan.name === plans.name && <span className={styles.roomsAndPlansPricesSpan} key={ji}>Rates:</span>}</>
                            )
                          })}
                        </span>
                        </div></Col>
                      <Col className={styles.rightSection}>
                        <Row className={styles.data}>
                          {sevenDaysDataOfRoom.map((roomPrice, keyj) => {
                            // console.log(roomPrice)
                            return (
                              <Col className={styles.col} key={keyj}>
                                <div className={styles.roomsAndPlansPrices}>
                                {updationRoomState === true && updationRoom.id === roomPrice.id ?<input type="text" name="price" placeholder={updationRoom.price} className={styles.ratesInput} value={updationRoom.price} onChange={handleUpdationOfRoomRatesAndAvailablity} />: <span className={styles.roomsAndPlansPricesSpan} style={{border: "none", justifyContent: "center"}}>₹{roomPrice.price}</span>}
                                  {/* <span className={styles.roomsAndPlansPricesSpan} style={{border: "none", justifyContent: "center"}}>₹{roomPrice.price}</span> */}
                                  {roomPrice.roomRatePlans.map((plan,keyji)=>{
                                    return (
                                      <>
                                      {
                                        filteredPlan === "" ? <>{updationRoomState === true && updationRoom.id === roomPrice.id ? <input type="text" name="price" placeholder={plan.amount} className={styles.ratesInput} value={plan.amount} onChange={handleUpdationOfRoomRatesAndAvailablity} /> : <span key={keyji} className={styles.roomsAndPlansPricesSpan}>₹{plan.amount}</span>} </>: filteredPlan.name === plan.name && <span key={keyji} className={styles.roomsAndPlansPricesSpan}> ₹{plan.amount}</span>
                                      }
                                      </>
                                    )
                                  })}
                                </div>
                              </Col>
                              // <Col className={styles.col} key={keyj}>
                              //   {updationRoomState === true && updationRoom.id === roomPrice.id ?<input type="text" name="price" placeholder={updationRoom.price} className={styles.ratesInput} value={updationRoom.price} onChange={handleUpdationOfRoomRatesAndAvailablity} />: `₹ ${roomPrice.price}`}
                              // </Col>
                            );
                          })}
                        </Row>
                      </Col>
                    </Row>

                    {/* {val.name === sevenDaysDataOfRoom[0]?.roomName && (
                      <>
                        {sevenDaysDataOfRoom[0].roomRatePlans.map(
                          (planName, key) => {
                            return (
                              <>
                                {filteredPlan === "" ? (
                                  <Row className={styles.content} key={key}>
                                    <Col className={styles.Icon}></Col>
                                    <Col className={styles.leftSection}>
                                      {planName.name}
                                      <AiFillThunderbolt
                                        size={15}
                                        style={{
                                          marginTop: "5px",
                                          color: "#2494d1",
                                        }}
                                      />
                                    </Col>
                                    <Col className={styles.midSection}>
                                      Plan Rates
                                    </Col>
                                    <Col className={styles.rightSection}>
                                      <Row className={styles.data}>
                                        {sevenDaysDataOfRoom?.map(
                                          (planRatesOfSevenDays) => {
                                            return (
                                              <>
                                                {planRatesOfSevenDays?.roomRatePlans?.map(
                                                  (plansRatesToShow, keyi) => {
                                                    return (
                                                      <>
                                                        {planName.name == plansRatesToShow.name && (
                                                          <Col key={keyi} className={styles.col}>
                                                            {updationRoomState === true && updationRoom.id === planRatesOfSevenDays.id ?<input type="text" name={plansRatesToShow.name} placeholder={plansRatesToShow.amount} className={styles.plansInput} />: plansRatesToShow.amount}
                                                          </Col>
                                                        )}
                                                      </>
                                                    );
                                                  }
                                                )}
                                              </>
                                            );
                                          }
                                        )}
                                      </Row>
                                    </Col>
                                  </Row>
                                ) : (
                                  <>
                                    {filteredPlan.name === planName.name && (
                                      <Row className={styles.content} key={key}>
                                        <Col className={styles.Icon}></Col>
                                        <Col className={styles.leftSection}>
                                          {planName.name}
                                          <AiFillThunderbolt
                                            size={15}
                                            style={{
                                              marginTop: "5px",
                                              color: "#2494d1",
                                            }}
                                          />
                                        </Col>
                                        <Col className={styles.midSection}>
                                          Plan Rates
                                        </Col>
                                        <Col className={styles.rightSection}>
                                          <Row className={styles.data}>
                                            {sevenDaysDataOfRoom.map(
                                              (planRatesOfSevenDays) => {
                                                return (
                                                  <>
                                                    {planRatesOfSevenDays.roomRatePlans.map(
                                                      (
                                                        plansRatesToShow,
                                                        keyi
                                                      ) => {
                                                        return (
                                                          <>
                                                            {planName.name ==
                                                              plansRatesToShow.name && (
                                                                <Col key={keyi} className={styles.col}>
                                                                {updationRoomState === true && updationRoom.id === planRatesOfSevenDays.id ?<input type="text" name={plansRatesToShow.name} placeholder={plansRatesToShow.amount} className={styles.plansInput} />: plansRatesToShow.amount}
                                                              </Col>
                                                            )}
                                                          </>
                                                        );
                                                      }
                                                    )}
                                                  </>
                                                );
                                              }
                                            )}
                                          </Row>
                                        </Col>
                                      </Row>
                                    )}
                                  </>
                                )}
                              </>
                            );
                          }
                        )}
                      </>
                    )} */}
                  </div>
                )}
              </>
            );
          })}
          <div className={styles.buttonGroup}>
            <Row>
              <Col className={styles.buttons}>
                <button onClick={handleRoomTypesDrop} className={styles.button}>
                  <FaBed
                    style={{ marginRight: "8px", marginBottom: "2px" }}
                    size={15}
                  />
                  All Room Types
                  <MdOutlineArrowDropDown
                    size={22}
                    style={{ marginLeft: "2px", marginBottom: "2px" }}
                  />
                  <div
                    className={styles.roomTypeDrop}
                    onMouseLeave={handleRoomTypesDrop}
                    style={
                      roomType ? { display: "block" } : { display: "none" }
                    }
                  >
                    {roomDetails?.map((val, i) => {
                      return (
                        <li
                          key={i}
                          onClick={() => {
                            setRoomDetailsToShow(val);
                            getSevenDaysDataOfRoom(token, val.bookoneRoomId);
                            setFilteredPlanName("");
                          }}
                        >
                          {val.name}
                        </li>
                      );
                    })}
                  </div>
                </button>
                <button className={styles.button} onClick={handleRateDrop}>
                  <BsFillTagFill
                    style={{ marginRight: "8px", marginBottom: "2px" }}
                  />
                  All Rates Plans
                  <MdOutlineArrowDropDown
                    size={22}
                    style={{ marginLeft: "2px", marginBottom: "4px" }}
                  />
                  <div
                    className={styles.ratePlanDrop}
                    onMouseLeave={handleRateDrop}
                    style={
                      ratePlans ? { display: "block" } : { display: "none" }
                    }
                  >
                    {sevenDaysDataOfRoom[0]?.roomRatePlans.map(
                      (dropdownPlan, dropKey) => {
                        return (
                          <li
                            key={dropKey}
                            onClick={() => {
                              setFilteredPlanName(dropdownPlan);
                            }}
                          >
                            {dropdownPlan.name}
                          </li>
                        );
                      }
                    )}
                  </div>
                </button>
                <span style={{cursor: "pointer"}} onClick={() => {
                      getRefreshedSevenDaysDataOfRooms(
                        sevenDaysDataOfRoom[0].roomId
                      );
                      setFilteredPlanName('')
                    }}>Clear all filters</span>
              </Col>
              <Col className={styles.rightlinkText}>
                <div className={styles.linkText}>
                  <GoTriangleRight size={20} style={{ marginBottom: "3px" }} />
                  <span>Quick Tour - Inventory Grid</span>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}