import styles from "../../styles/Siteminder.module.css";
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
import Navbar from "../../components/Navbar";
import Head from "next/head";

export default function Home() {
  let router = useRouter();

  const { siteminder } = router.query;
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
  const [propertyResult, stePropertyResult] = useState("");
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
    if (siteminder !== undefined) {
      fetch(
        `https://api.bookonelocal.in/channel-integration/api/channelManager/property/${siteminder}`,
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
          // console.log(resJson)
          setDropDownValue(resJson.propertiesOnlineTravelAgencies);
          setShowTravelAgencyName(
            resJson.propertiesOnlineTravelAgencies[0]?.onlineTravelAgencyName
          );
          setRoomDetails(resJson.roomDtos);
          setAgodaPropertyId(resJson.propertiesOnlineTravelAgencies);
        });
    }
  }, [router]);
  // console.log(agodaPropertyId);

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
        stePropertyResult(data);
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
    <div className={styles.outerContainer}>
      {bulkUpdateModal ? (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <span>BULK UPDATE</span>
              <span onClick={handleBulkUpdateModal}>X</span>
            </div>
            <div className={styles.modalContent}>
              <Row className={styles.quickTourLinkRow}>
                <Col className={styles.quickTourLinkCol}>
                  <div className={styles.linkText}>
                    <GoTriangleRight
                      size={20}
                      style={{ marginBottom: "3px" }}
                    />
                    <span>Quick Tour - Inventory Grid</span>
                  </div>
                </Col>
              </Row>
              <Row className={styles.setToRow}>
                <Col className={styles.setToCol1}>
                  <span className={styles.setToCol1Span}>Set</span>
                  <button className={styles.setToCol1Input}>
                    Availablity
                    <MdArrowDropDown size={20} />
                  </button>
                </Col>
                <Col className={styles.setToCol2}>
                  <span className={styles.setToCol2Span}>to</span>
                  <input className={styles.setToCol2Input} type="text" />
                </Col>
              </Row>
              <Row className={styles.datesRow}>
                <Col className={styles.datesCol1}>
                  <span>
                    <input className={styles.datesCol1Input} type="date" />
                  </span>
                </Col>
                <Col className={styles.datesCol2}>
                  <span>
                    <input className={styles.datesCol2Input} type="date" />
                  </span>
                </Col>
                <Col className={styles.datesCol3}>
                  <div className={styles.labels}>
                    <label>
                      <input type="checkbox" />
                      <span>Mon</span>
                    </label>
                    <label>
                      <input type="checkbox" />
                      <span>Mon</span>
                    </label>
                    <label>
                      <input type="checkbox" />
                      <span>Mon</span>
                    </label>
                    <label>
                      <input type="checkbox" />
                      <span>Mon</span>
                    </label>
                    <label>
                      <input type="checkbox" />
                      <span>Mon</span>
                    </label>
                    <label>
                      <input type="checkbox" />
                      <span>Mon</span>
                    </label>
                    <label>
                      <input type="checkbox" />
                      <span>Mon</span>
                    </label>
                  </div>
                </Col>
              </Row>
              <Row className={styles.addDateRangeRow}>
                <Col className={styles.addDateRangeCol}>
                  <button>Add Date Range</button>
                </Col>
              </Row>
              <div className={styles.clearSelected}>
                <span>Clear Selected</span>
              </div>
              <div className={styles.roomsContainer}>
                <div className={styles.room}>
                  <input type="checkbox" />
                  <span>Deluxe Room</span>
                </div>
                <div className={styles.room}>
                  <input type="checkbox" />
                  <span>Deluxe Room</span>
                </div>
                <div className={styles.room}>
                  <input type="checkbox" />
                  <span>Deluxe Room</span>
                </div>
                <div className={styles.room}>
                  <input type="checkbox" />
                  <span>Deluxe Room</span>
                </div>
              </div>
              <div className={styles.saveBtnContainer}>
                <button>Save</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <Navbar />
      <div className={styles.container}>
        <Head>
          <title>MMT Channel Manager</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.table}>
          <div className={styles.topBar}>
            <div className={styles.topBarButtons}>
              <div className={styles.channelmanagerButton}>
                <span className={styles.channelManagerFont}>
                  Channel Manager:
                </span>
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
                      style={
                        shopModal ? { display: "block" } : { display: "none" }
                      }
                    >
                      {dropdownValue.map((val, i) => {
                        return (
                          <li key={i}>
                            <button
                              type="button"
                              onClick={() => {
                                setShowTravelAgencyName(
                                  val.onlineTravelAgencyName
                                );
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
            <Row className={styles.dateSection}>
              <Col className={styles.dateSelector}>
                <span>
                  <GrRotateLeft size={15} style={{ marginRight: "10px" }} />
                  <AiOutlineDoubleLeft
                    size={15}
                    style={{ marginRight: "10px" }}
                  />
                  <MdKeyboardArrowLeft />
                  Jul 5, 2022
                  <MdKeyboardArrowRight />
                  <AiOutlineDoubleRight
                    size={15}
                    style={{ marginLeft: "10px" }}
                  />
                </span>
              </Col>
              <Col className={styles.dates}>
                <Row className={styles.dateCards}>
                  <Col className={styles.dateCard}>
                    <span>Mon</span>
                    <span className={styles.boldDateText}>03</span>
                    <span>JUL</span>
                  </Col>
                  <Col className={styles.dateCard}>
                    <span>Mon</span>
                    <span className={styles.boldDateText}>03</span>
                    <span>JUL</span>
                  </Col>
                  <Col className={styles.dateCard}>
                    <span>Mon</span>
                    <span className={styles.boldDateText}>03</span>
                    <span>JUL</span>
                  </Col>
                  <Col className={styles.dateCard}>
                    <span>Mon</span>
                    <span className={styles.boldDateText}>03</span>
                    <span>JUL</span>
                  </Col>
                  <Col className={styles.dateCard}>
                    <span>Mon</span>
                    <span className={styles.boldDateText}>03</span>
                    <span>JUL</span>
                  </Col>
                  <Col className={styles.dateCard}>
                    <span>Mon</span>
                    <span className={styles.boldDateText}>03</span>
                    <span>JUL</span>
                  </Col>
                  <Col className={styles.dateCard}>
                    <span>Mon</span>
                    <span className={styles.boldDateText}>03</span>
                    <span>JUL</span>
                  </Col>
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
                      return <li key={i}>{val.name}</li>;
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
                    <li>Bar</li>
                    <li>Honeymoon</li>
                    <li>Bed & Breakfast</li>
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
                      <Col className={styles.col}>10</Col>
                      <Col className={styles.col}>10</Col>
                      <Col className={styles.col}>10</Col>
                      <Col className={styles.col}>10</Col>
                      <Col className={styles.col}>10</Col>
                      <Col className={styles.col}>10</Col>
                      <Col className={styles.col}>10</Col>
                    </Row>
                  </Col>
                </Row>
                <Row className={styles.content}>
                  <Col className={styles.Icon}></Col>
                  <Col className={styles.leftSection}>
                    Rath Yatra Plan (Rath Yatra Special)
                    <AiFillThunderbolt
                      size={15}
                      style={{ marginTop: "5px", color: "#2494d1" }}
                    />
                  </Col>
                  <Col className={styles.midSection}>Avail</Col>
                  <Col className={styles.rightSection}>
                    <Row className={styles.data}>
                      <Col className={styles.col}>10</Col>
                      <Col className={styles.col}>10</Col>
                      <Col className={styles.col}>10</Col>
                      <Col className={styles.col}>10</Col>
                      <Col className={styles.col}>10</Col>
                      <Col className={styles.col}>10</Col>
                      <Col className={styles.col}>10</Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
