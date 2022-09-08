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
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";
import { GrRotateLeft } from "react-icons/gr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Head from "next/head";

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
  const handleShopModal = () => {
    setshopModal(!shopModal);
  };

  const handleBulkUpdateModal = () => {
    setBulkUpdateModal(!bulkUpdateModal);
  };

  //Current Date
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

  // Sevens Days
  const getSevenDaysAfterDate = () => {
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
    const newSevenDaysDate = sevenDays.reverse();
    let newTempArr = "";
    newTempArr = sevenDays[2];
    sevenDays[2] = sevenDays[1];
    sevenDays[1] = newTempArr;

    let seventhDayDate = sevenDays.join("-");
    return seventhDayDate;
  };

  // Seven Days Data of a Specific Room
  const getSevenDaysDataOfRoom = async (token, roomId) => {
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
    // console.log(resJson);
  };

  console.log(sevenDaysDataOfRoom);

  //   sevenDaysDataOfRoom.forEach((element) => {
  //     console.log(element.date);
  //   });

  // console.log(currDate, newSevenDaysDate);
  // const newArr = currDate.split("-");
  // console.log(newCurrentDaye, newSevenDay);
  console.log(roomDetails);

  //   console.log(roomDetailsToShow);

  useEffect(() => {
    if (propertyId !== undefined) {
      let currentDateFuncResponse = getCurrentDateFunction();
      let seventhDayDateFuncResponse = getSevenDaysAfterDate();
      setCurrentdate(currentDateFuncResponse);
      setSeventhDayDate(seventhDayDateFuncResponse);
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
  console.log(filteredPlan);

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
                <span>
                  <GrRotateLeft size={15} style={{ marginRight: "10px" }} />
                  <AiOutlineDoubleLeft
                    size={15}
                    style={{ marginRight: "10px" }}
                  />
                  <MdKeyboardArrowLeft />
                  {currentDate}
                  <MdKeyboardArrowRight />
                  <AiOutlineDoubleRight
                    size={15}
                    style={{ marginLeft: "10px" }}
                  />
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
                            ? "NOV"
                            : date.getMonth() == 10
                            ? "OCT"
                            : date.getMonth() == 11
                            ? "NOV"
                            : "NO MONTH"}
                        </span>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </div>
          <div className={styles.buttonGroup}>
            <Row>
              <Col className={styles.buttons}>
                <button
                  onClick={handleRatesAvailiblityDropDown}
                  className={`${styles.buttonHover} ${styles.button} `}
                >
                  All Rates & Availablity
                  <span>
                    <MdOutlineArrowDropDown
                      size={22}
                      style={{ marginBottom: "2px" }}
                    />
                  </span>
                  {allRatesAvailiblityDropDown ? (
                    <div className={styles.allRatesDropdownBtn}>
                      <h6>Room & Rates View</h6>
                      <div className={styles.roomsRatesButtons}>
                        <Row className={styles.roomsRatesButtonsRow}>
                          <Col className={styles.roomsRatesButtonsColLeft}>
                            <span
                              className={styles.roomsRatesButtonsColLeftIcon}
                            >
                              <TiTick size={20} />
                            </span>
                            <span>ALL RATES & AVAILABLITY</span>
                          </Col>
                          <Col className={styles.roomsRatesButtonsColRight}>
                            <BsFillStarFill />
                          </Col>
                        </Row>
                        <Row className={styles.roomsRatesButtonsRow}>
                          <Col className={styles.roomsRatesButtonsColLeft}>
                            <span
                              className={styles.roomsRatesButtonsColLeftIcon}
                            >
                              <TiTick size={20} />
                            </span>
                            <span>ALL RATES & AVAILABLITY</span>
                          </Col>
                          <Col className={styles.roomsRatesButtonsColRight}>
                            <BsFillStarFill />
                          </Col>
                        </Row>
                        <Row className={styles.roomsRatesButtonsRow}>
                          <Col className={styles.roomsRatesButtonsColLeft}>
                            <span
                              className={styles.roomsRatesButtonsColLeftIcon}
                            >
                              <TiTick size={20} />
                            </span>
                            <span>ALL RATES & AVAILABLITY</span>
                          </Col>
                          <Col className={styles.roomsRatesButtonsColRight}>
                            <BsFillStarFill />
                          </Col>
                        </Row>
                      </div>
                      <h6 className={styles.channelsViewText}>Channels View</h6>
                      <div className={styles.channelViewButtons}>
                        <Row className={styles.roomsRatesButtonsRow}>
                          <Col className={styles.roomsRatesButtonsColLeft}>
                            <span
                              className={styles.roomsRatesButtonsColLeftIcon}
                            >
                              <TiTick size={20} color={"transparent"} />
                            </span>
                            <span>ALL RATES & AVAILABLITY</span>
                          </Col>
                          <Col
                            className={styles.roomsRatesButtonsColRight}
                          ></Col>
                        </Row>
                        <Row className={styles.roomsRatesButtonsRow}>
                          <Col className={styles.roomsRatesButtonsColLeft}>
                            <span
                              className={styles.roomsRatesButtonsColLeftIcon}
                            >
                              <TiTick size={20} color={"transparent"} />
                            </span>
                            <span>ALL RATES & AVAILABLITY</span>
                          </Col>
                          <Col
                            className={styles.roomsRatesButtonsColRight}
                          ></Col>
                        </Row>
                        <Row className={styles.roomsRatesButtonsRow}>
                          <Col className={styles.roomsRatesButtonsColLeft}>
                            <span
                              className={styles.roomsRatesButtonsColLeftIcon}
                            >
                              <TiTick size={20} color={"transparent"} />
                            </span>
                            <span>ALL RATES & AVAILABLITY</span>
                          </Col>
                          <Col
                            className={styles.roomsRatesButtonsColRight}
                          ></Col>
                        </Row>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </button>
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
                          <>
                            <li
                              key={dropKey}
                              onClick={() => {
                                setFilteredPlanName(dropdownPlan);
                              }}
                            >
                              {dropdownPlan.name}
                            </li>
                          </>
                        );
                      }
                    )}
                  </div>
                </button>
                <div className={styles.inputItem}>
                  <span>
                    <BiSearch size={15} style={{ marginBottom: "1px" }} />
                  </span>
                  <input placeholder="Search room Rates" />
                </div>
                <span>Clear all filters</span>
              </Col>
              <Col className={styles.rightlinkText}>
                <div className={styles.linkText}>
                  <GoTriangleRight size={20} style={{ marginBottom: "3px" }} />
                  <span>Quick Tour - Inventory Grid</span>
                </div>
              </Col>
            </Row>
          </div>
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
                      <Col className={styles.midSection}>Avail</Col>
                      <Col className={styles.rightSection}>
                        <Row className={styles.data}>
                          {sevenDaysDataOfRoom.map((avail) => {
                            return (
                              <>
                                {val.name == avail.roomName && (
                                  <Col className={styles.col} key={avail.id}>
                                    {avail.noOfAvailable}
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
                        style={{ border: "none" }}
                      >
                        Room Price
                      </Col>
                      <Col className={styles.midSection}></Col>
                      <Col className={styles.rightSection}>
                        <Row className={styles.data}>
                          {sevenDaysDataOfRoom.map((roomPrice, keyj) => {
                            return (
                              <Col className={styles.col} key={keyj}>
                                ₹ {roomPrice.price}
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
                                {filteredPlan == "" ? (
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
                                                  (plansRatesToShow, keyi) => {
                                                    return (
                                                      <>
                                                        {planName.name ==
                                                          plansRatesToShow.name && (
                                                          <Col
                                                            key={keyi}
                                                            className={
                                                              styles.col
                                                            }
                                                          >
                                                            ₹{" "}
                                                            {
                                                              plansRatesToShow.amount
                                                            }
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
                                    {planName.name == filteredPlan.name && (
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
                                                              <Col
                                                                key={keyi}
                                                                className={
                                                                  styles.col
                                                                }
                                                              >
                                                                ₹{" "}
                                                                {
                                                                  plansRatesToShow.amount
                                                                }
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
        </div>
      </div>
    </div>
  );
}
