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
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdModeEditOutline,
} from "react-icons/md";
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
import BulkUpdateModal from "../../components/BulkUpdateModal";
import { DataByDates } from "../../assets/api/dataByDates";
import { DataOfSevenDays } from "../../assets/api/dataOfSevenDays";
import { UpdateRatesAndAvailablity } from "../../assets/api/updateRatesAndAvailablity";

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
  const [updationRoom, setUpdationRoom] = useState('');
  const [updationRoomPlan, setUpdationRoomPlan] = useState('');
  const [updationRoomPrice, setUpdationRoomPrice] = useState('');
  const [updationRoomState, setUpdationRoomState] = useState(false);
  const [updationRoomPlanState, setUpdationRoomPlanState] = useState(false);
  const [updationRoomPriceState, setUpdationRoomPriceState] = useState(false);
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
    let sevenDaysDataOfRooms = await DataOfSevenDays(propertyId,roomId,token)
    setSevenDaysDataofRooms(sevenDaysDataOfRooms);
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
    let previousDataOfRooms = await DataByDates(data,token);
    setSevenDaysDataofRooms(previousDataOfRooms);
    setCurrentdate(currentDateFuncResponse);

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
    let datePickerDataOfRooms = await DataByDates(data,token);
    setSevenDaysDataofRooms(datePickerDataOfRooms);
    setCurrentdate(startDate);
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
    let nextSevenDaysDataOfRooms = await DataByDates(data,token);
    setSevenDaysDataofRooms(nextSevenDaysDataOfRooms);
    setCurrentdate(currentDateFuncResponse);
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
    let refreshedDataOfRooms = await DataByDates(data,token);
    setSevenDaysDataofRooms(refreshedDataOfRooms);
    setCurrentdate(currentDateFuncResponse);
    setNoOfDays(14);
    setNextPrevArrows(true);
  };

  //This function will update room rates and availablity of a specific room
  const updateRatesandAvailablity = async (room) => {
    // console.log("updation room after in function update rates and avail", room)
   if (room !== '') {
    const data = {
      ...room,
      updateType: "Availability",
      channelManagerUpdateType: "AVAILABILITY_UPDATE",
    };
    let updateRateAndAvailablity = await UpdateRatesAndAvailablity(data,token)
    let currentDateFuncResponse = getCurrentDateFunction();
    let seventhDayDateFuncResponse = getSevenDaysAfterDate(7);
    const dataRefreshed = {
      fromDate: currentDateFuncResponse,
      propertyId: propertyId,
      roomId: room.roomId,
      toDate: seventhDayDateFuncResponse,
    };
    let refreshedDataOfRooms = await DataByDates(dataRefreshed,token);
    let refreshedDataOfRoomsResponse = refreshedDataOfRooms
    // console.log("update rates and availablity",refreshedDataOfRoomsResponse)
    setSevenDaysDataofRooms(refreshedDataOfRoomsResponse);
    setCurrentdate(currentDateFuncResponse);
    setUpdationRoom('');
    setUpdationRoomState(false);
    setNoOfDays(7);
  }
};

//This function will update room plans rates and availablity of a specific room
const updatePlansRates = async (plan,updationRoom) => {
    // console.log("updation room in plans function",updationRoom)
    // console.log("updation plan in plans function",plan)
    if (plan !== '') {
      const a = new Date(updationRoom.date).toLocaleDateString().split("/");
      let date = a[1];
      if (date < 10) {
        date = "0"+date
      }
      let month = a[0];
      if (month < 10) {
        month = "0"+month
      }
      let year = a[2];
      const data = {
        ...plan,
        channelManagerUpdateType: "ROOM_RATE_PLAN",
        propertyId: propertyId,
        roomTypeId: updationRoom.roomId,
        effectiveDate: `${year}-${month}-${date}`,
        expiryDate: `${year}-${month}-${date}`
      };
      let updatePlansReq = await fetch('https://api.bookonelocal.in/api-bookone/api/availability/addOrUpdatePlan',
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
      let currentDateFuncResponse = getCurrentDateFunction();
      let seventhDayDateFuncResponse = getSevenDaysAfterDate(7);
      const dataRefreshed = {
        fromDate: currentDateFuncResponse,
        propertyId: propertyId,
        roomId: plan.roomId,
        toDate: seventhDayDateFuncResponse,
      };
      let refreshedDataOfRooms = await DataByDates(dataRefreshed,token);
      setCurrentdate(currentDateFuncResponse);
      setSevenDaysDataofRooms(refreshedDataOfRooms);
      setUpdationRoomPlan('');
      setUpdationRoomState(false);
      setNoOfDays(7)
    }
  };

  //it will handle the object of room to post the data to update room details
  const handleUpdationOfRoomRatesAndAvailablity = (e) => {
    if (e.target.name === "price") {
      // console.log("func ")
      setUpdationRoom({ ...updationRoom, price: +e.target.value });
    } else if (e.target.name === "noOfAvailable") {
      // console.log("func ")
      setUpdationRoom({ ...updationRoom, noOfAvailable: +e.target.value });
    }
  };

  //it will handle the object of plans to post the data to update room plans details
  const handleUpdationOfRoomsPlans = (e,updationRoomPlanObject) => {
    if (e.target.name === updationRoomPlanObject.name) {
      // setUpdationRoomPlan({...updationRoomPlan,[e.target.name]:{...updationRoomPlanObject,amount: +e.target.value}})
      setUpdationRoomPlan({...updationRoomPlanObject,amount: +e.target.value});
    }
  };

  // console.log("updation room plan useSatate",updationRoomPlan);
  // console.log("updation room useSatate",updationRoom);
  // console.log(sevenDaysDataOfRoom);
  console.log("updation plan", updationRoomPlan)
  console.log("updation room", updationRoom)

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
          // console.log(resJson?.roomDtos[0].bookoneRoomId);
          // console.log(resJson);
          //   console.log(sevenDayData);
          //   console.log(resJson);
        });
    }
  }, [router]);
  //   console.log(sevenDaysDataOfRoom);
  //   console.log(roomDetailsToShow);
  // console.log(roomDetails);
  // console.log(filteredPlan);
  // console.log(roomId);
  console.log("seven days data of rooms",sevenDaysDataOfRoom);

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
  // console.log("date",a)

  return (
    <div className={styles.outerContainer}>
      <Navbar bookingId={propertyId} />
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
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <span>From: </span>
                    <DatePicker
                      size="small"
                      onChange={(value) => {
                        const fromDate = moment(value).format("YYYY-MM-DD");
                        setCurrentdate(fromDate);
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
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
                  <button
                    className={styles.findRatesButton}
                    onClick={() => {
                      getDatePickerDataOfRooms(currentDate, seventhDayDate);
                    }}
                  >
                    SEARCH
                  </button>
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
                  {nextPrevArrows && (
                    <AiOutlineDoubleLeft
                      size={15}
                      style={{ marginRight: "10px" }}
                      onClick={() => {
                        getPreviousSevenDaysDataOfRooms(
                          propertyId,
                          sevenDaysDataOfRoom[0].roomId
                        );
                      }}
                    />
                  )}
                  {currentDate}
                  {nextPrevArrows && (
                    <AiOutlineDoubleRight
                      size={15}
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        getNextSevenDaysDataOfRooms(
                          propertyId,
                          sevenDaysDataOfRoom[0].roomId
                        );
                      }}
                    />
                  )}
                </span>
              </Col>
              <Col className={styles.dates}>
                <Row className={styles.dateCards}>
                  {sevenDaysDataOfRoom?.map((val, i) => {
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
            ></Col>
            <Col className={styles.midSection} style={{ border: "none" }}></Col>
            <Col className={styles.rightSection}>
              <Row className={styles.data}>
                {sevenDaysDataOfRoom.map((room, keyj) => {
                  return (
                    <Col
                      className={styles.col}
                      style={{ border: "none" }}
                      key={keyj}
                    >
                      {updationRoomState === true &&
                      updationRoom.id === room.id || 
                      updationRoomPlanState === true &&
                      updationRoom.id === room.id ||
                      updationRoomPriceState === true &&
                      updationRoom.id === room.id 
                      ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                          }}
                        >
                          <span
                            onClick={() =>
                              {updateRatesandAvailablity(updationRoom);updatePlansRates(updationRoomPlan,updationRoom);}
                            }
                            className={styles.saveButton}
                          >
                            <IoIosSave size={20} />
                          </span>
                          <span
                            onClick={() => {
                              setUpdationRoom('');
                              setUpdationRoomState(false);
                              setUpdationRoomPlanState(false);
                            }}
                            className={styles.cancelButton}
                          >
                            <GiCancel size={20} />
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
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
                    <Row className={`${styles.heading} flex items-center`}>
                      <Col className={styles.Icon}>
                        <FaBed size={18} style={{ marginTop: "5px" }} />
                      </Col>
                      <Col
                        className={`${styles.leftSection} flex items-center`}
                      >
                        <span>{val.name}</span>
                        <BulkUpdateModal />
                      </Col>
                      <Col className={styles.midSection}>Stock</Col>
                      <Col className={styles.rightSection}>
                        <Row className={styles.data}>
                          {sevenDaysDataOfRoom.map((avail) => {
                            return (
                              <>
                                {val.name == avail.roomName && (
                                  <Col
                                    className={styles.col}
                                    key={avail.id}
                                  >
                                    {updationRoomState === true &&
                                    updationRoom.id === avail.id ? (
                                      <input
                                        type="text"
                                        name="noOfAvailable"
                                        placeholder={updationRoom.noOfAvailable}
                                        className={styles.availabilityInput}
                                        value={updationRoom.noOfAvailable}
                                        onChange={
                                          handleUpdationOfRoomRatesAndAvailablity
                                        }
                                      />
                                    ) : (
                                      <span
                                      onClick={() => {
                                        setUpdationRoom(avail);
                                        setUpdationRoomState(true);
                                        setUpdationRoomPlanState(false);
                                        setUpdationRoomPriceState(false)
                                      }}>{avail.noOfAvailable}</span>
                                    )}
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
                        style={{ flexDirection: "column" }}
                      >
                        <span
                          className={styles.roomsAndPlansPricesSpan}
                          style={{ border: "none" }}
                        >
                          Room Rates and Plans
                        </span>
                        {/* <span
                          className={styles.roomsAndPlansPrices}
                          style={{ border: "none" }}
                        >
                          {sevenDaysDataOfRoom[0]?.roomRatePlans?.map(
                            (plans, ji) => {
                              return (
                                <>
                                  {filteredPlan === "" ? (
                                    <span
                                      className={styles.roomsAndPlansPricesSpan}
                                      key={ji}
                                    >
                                      {plans.name}
                                    </span>
                                  ) : (
                                    filteredPlan.name === plans.name && (
                                      <span
                                        className={
                                          styles.roomsAndPlansPricesSpan
                                        }
                                        key={ji}
                                      >
                                        {plans.name}
                                      </span>
                                    )
                                  )}
                                </>
                              );
                            }
                          )}
                        </span> */}
                      </Col>
                      <Col className={styles.midSection}>
                        <div className={styles.roomsAndPlansPrices}>
                          <span
                            className={styles.roomsAndPlansPricesSpan}
                            style={{ border: "none" }}
                          >
                            Rates :
                          </span>
                          {/* <span
                            className={styles.roomsAndPlansPrices}
                            style={{ border: "none" }}
                          >
                            {sevenDaysDataOfRoom[0]?.roomRatePlans?.map(
                              (plans, ji) => {
                                return (
                                  <>
                                    {filteredPlan === "" ? (
                                      <span
                                        className={
                                          styles.roomsAndPlansPricesSpan
                                        }
                                        key={ji}
                                      >
                                        Rates:
                                      </span>
                                    ) : (
                                      filteredPlan.name === plans.name && (
                                        <span
                                          className={
                                            styles.roomsAndPlansPricesSpan
                                          }
                                          key={ji}
                                        >
                                          Rates:
                                        </span>
                                      )
                                    )}
                                  </>
                                );
                              }
                            )}
                          </span> */}
                        </div>
                      </Col>
                      <Col className={styles.rightSection}>
                        <Row className={styles.data}>
                          {sevenDaysDataOfRoom.map((roomPrice, keyj) => {
                            return (
                              <Col className={styles.col} key={keyj}>
                                <div className={styles.roomsAndPlansPrices}>
                                  {updationRoomPriceState === true &&
                                  updationRoom.id === roomPrice.id ? (
                                    <input
                                      type="text"
                                      name="price"
                                      placeholder={updationRoom.price}
                                      className={styles.ratesInput}
                                      value={updationRoom.price}
                                      onChange={
                                        handleUpdationOfRoomRatesAndAvailablity
                                      }
                                    />
                                  ) : (
                                    <span
                                      className={styles.roomsAndPlansPricesSpan}
                                      style={{
                                        border: "none",
                                        justifyContent: "center",
                                      }}
                                      onClick={()=>{setUpdationRoomState(false);setUpdationRoom(roomPrice);
                                        setUpdationRoomPriceState(true);
                                        setUpdationRoomPlanState(false);}}
                                    >
                                      ₹{roomPrice.price}
                                    </span>
                                  )}
                                  {/* {roomPrice.roomRatePlans.map(
                                    (plan, keyji) => {
                                      return (
                                        <>
                                          {filteredPlan === "" ? (
                                            <>
                                              {updationRoomState === true &&
                                              updationRoom.id ===
                                                roomPrice.id && updationRoomPlan.name === plan.name ? (
                                                <input
                                                  type="text"
                                                  name="plan"
                                                  placeholder={plan.amount}
                                                  className={styles.ratesInput}
                                                  value={updationRoomPlan.amount}
                                                  onChange={(e)=>{
                                                    handleUpdationOfRoomsPlans(e,plan)
                                                  }
                                                  }
                                                />
                                              ) : (
                                                <span
                                                  key={keyji}
                                                  className={
                                                    styles.roomsAndPlansPricesSpan
                                                  }
                                                  onClick={()=>setUpdationRoomPlan(plan)}
                                                >
                                                  ₹{plan.amount}
                                                </span>
                                              )}
                                            </>
                                          ) : (
                                            filteredPlan.name === plan.name && (
                                              <span
                                                key={keyji}
                                                className={
                                                  styles.roomsAndPlansPricesSpan
                                                }
                                              >
                                                ₹{plan.amount}
                                              </span>
                                            )
                                          )}
                                        </>
                                      );
                                    }
                                  )} */}
                                </div>
                              </Col>
                            );
                          })}
                        </Row>
                      </Col>
                    </Row>

                    {val.name === sevenDaysDataOfRoom[0]?.roomName && (
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
                                                            {updationRoomPlanState === true && updationRoom.id === planRatesOfSevenDays.id && plansRatesToShow.code === updationRoomPlan.code ?<input type="text" value={updationRoomPlan.amount} name={plansRatesToShow.name} onChange={(e)=>handleUpdationOfRoomsPlans(e,plansRatesToShow)} placeholder={plansRatesToShow.amount} className={styles.plansInput} />: <span onClick={()=>{
                                                              setUpdationRoomPlan(plansRatesToShow);
                                                              setUpdationRoomPlanState(true);
                                                              setUpdationRoom(planRatesOfSevenDays);
                                                              setUpdationRoomState(false);
                                                              }}>{plansRatesToShow.amount}</span>}
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
                                                            {updationRoomPlanState === true && updationRoom.id === planRatesOfSevenDays.id && plansRatesToShow.code === updationRoomPlan.code ?<input type="text" value={updationRoomPlan.amount} name={plansRatesToShow.name} onChange={(e)=>handleUpdationOfRoomsPlans(e,plansRatesToShow)} placeholder={plansRatesToShow.amount} className={styles.plansInput} />: <span onClick={()=>{
                                                              setUpdationRoomPlan(plansRatesToShow);
                                                              setUpdationRoomPlanState(true);
                                                              setUpdationRoom(planRatesOfSevenDays);
                                                              setUpdationRoomState(false);
                                                              }}>{plansRatesToShow.amount}</span>}
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
                    )}
                  </div>
                )}
              </>
            );
          })}
          <div className={styles.buttonGroup}>
            <Row>
              <Col className={styles.buttons}>
                <button
                  onClick={handleRoomTypesDrop}
                  className={`${styles.button} flex h-8 p-1`}
                >
                  <FaBed
                    style={{
                      marginRight: "8px",
                      marginBottom: "2px",
                      marginTop: "2px",
                    }}
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
                <button
                  className={`${styles.button} flex h-8 p-1 px-2`}
                  onClick={handleRateDrop}
                >
                  <BsFillTagFill
                    style={{
                      marginRight: "8px",
                      marginBottom: "2px",
                      marginTop: "3px",
                    }}
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
                    <li
                      onClick={() => {
                        setFilteredPlanName("");
                      }}
                    >
                      All
                    </li>
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
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    getRefreshedSevenDaysDataOfRooms(
                      sevenDaysDataOfRoom[0].roomId
                    );
                    setFilteredPlanName("");
                  }}
                >
                  Clear all filters
                </span>
              </Col>
              <Col className={styles.rightlinkText}>
                <div className={`${styles.linkText} flex`}>
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
