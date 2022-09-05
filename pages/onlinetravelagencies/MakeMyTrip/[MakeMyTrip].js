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

const MakeMyTrip = ({ showTravelAgencyName, setShowTravelAgencyName }) => {
  let router = useRouter();

  const { MakeMyTrip } = router.query;
  // console.log(Agoda)
  const [allRatesAvailiblityDropDown, setAllRatesAvailiblityDropDown] =
    useState(false);
  const [shopModal, setshopModal] = useState(false);
  const [roomType, setRoomType] = useState(false);
  const [ratePlans, setRatePlans] = useState(false);
  const [dropdownValue, setDropDownValue] = useState([]);
  const [roomDetails, setRoomDetails] = useState([]);
  const [bulkUpdateModal, setBulkUpdateModal] = useState(false);
  const [otas, setOtas] = useState("");

  // const [showTravelAgencyName, setShowTravelAgencyName] = useState({});
  const [agodaPropertyResult, setAgodaPropertyResult] = useState([]);
  const [agodaDatesToShow, setAgodaDatesToShow] = useState([]);
  const [selectedTextField, setSelectedTextField] = useState([]);
  const [bookOneResponse, setBookOneResponse] = useState("");

  const [priceField, setPriceField] = useState({
    state: true,
    index: -1,
    value: "",
    row: -1
  });
  const [stockField, setStockField] = useState({
    state: true,
    index: [],
    value: "",
    row: -1
  });


  let stockInputHandler = (e,index,row) => {
    // console.log(index,row)
    // let updationIndexes = stockField.index;
    if (e.target.name == "stock" && stockField.index.includes(index) && stockField.row == row) {
      setStockField({
        state: false,
        value: e.target.value,
        index: stockField.index,
        row: stockField.row
      });

      StockPriceDummyArray[index].stock = e.target.value;
      
    }
    // console.log(updationIndexes);
};
// console.log(stockField);

let priceInputhandler = (e,index,row) => {
    if (e.target.name == "price" && priceField.index.includes(index) && priceField.row == row) {
        setPriceField({
            state: false,
            value: e.target.value,
            index: priceField.index,
            row: priceField.row
        });
        StockPriceDummyArray[index].price = e.target.value;
        }
    };
    
    const [StockPriceDummyArray,setStockPriceDummyArray] = useState([
        {
            stock: 10,
            price: "30"
        },
        {
            stock: 15,
      price: "30"
    },
    {
        stock: 20,
        price: "30"
    },
    {
        stock: 15,
        price: "30"
    },
    {
        stock: 11,
        price: "20"
    },
    {
        stock: 10,
        price: "35"
    },
    {
        stock: 12,
        price: "30"
    }
]);

console.log(stockField);
console.log(StockPriceDummyArray)
useEffect(()=>{
    setStockPriceDummyArray(StockPriceDummyArray);
},[StockPriceDummyArray])
// console.log(StockPriceDummyArray)


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
    fetch(
      `https://api.bookonelocal.in/channel-integration/api/channelManager/property/${MakeMyTrip}`,
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
        // console.log(dropdownValue)
        const selectedOnlineTravelAgency = {};
        for (
          let i = 0;
          i < resJson.propertiesOnlineTravelAgencies.length;
          i++
        ) {
          if (
            resJson.propertiesOnlineTravelAgencies[i].onlineTravelAgencyName ===
            "MakeMyTrip"
          ) {
            // setShowTravelAgencyName(
            selectedOnlineTravelAgency =
              resJson.propertiesOnlineTravelAgencies[i];
            // );
          }
        }
        const data = {
          fromDate: newCurrDate,
          toDate: newSevenDay,
          id: selectedOnlineTravelAgency.onlineTravelAgencyPropertyId,
        };


        // fetch(`https://channel-manager-server.herokuapp.com/propertyData`, {
        //   method: "POST",
        //   headers: {
        //     Accept: "application/json",
        //     Authorization:
        //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJib29rb25ldGVzdGJ1c2luZXNzQGdtYWlsLmNvbSIsInNjb3BlcyI6IlJPTEVfUFJPUF9BRE1JTiIsImlhdCI6MTY1ODg5Njk5OCwiZXhwIjoxNjU5MzI4OTk4fQ.yJpc1N9tn_q345k3hZHLapQaeXVO23xlWkbQwhPx7XI",
        //     "Content-Type": "application/json",
        //     APP_ID: "BOOKONE_WEB_APP",
        //   },
        //   body: JSON.stringify(data),
        // })
        //   .then((res) => res.json())
        //   .then((responseJson) => {
        //     // console.log(responseJson);
        //     const dates = [];
        //     for (
        //       let i = 0;
        //       i < responseJson.result.properties[0].property.length;
        //       i++
        //     ) {
        //       const date = new Date(
        //         responseJson.result.properties[0].property[i].$.date
        //       );
        //       const date1 = date.toString().split(" ");
        //       dates.push({
        //         day: date1[0],
        //         date: date1[2],
        //       });
        //     }
        //     setAgodaPropertyResult(responseJson.result.properties[0].property);
        //     setAgodaDatesToShow(dates);
        //   });
        // console.log(resJson);
        setShowTravelAgencyName(selectedOnlineTravelAgency);
        setRoomDetails(resJson.roomDtos);
        setOtas(resJson.propertiesOnlineTravelAgencies);
      });
  }, [MakeMyTrip]);

  // console.log(dropdownValue)

  const changeLocation = (showTravelAgencyName) => {
    if (showTravelAgencyName.onlineTravelAgencyName === "SiteMinder") {
      router.push(`/onlinetravelagencies/Siteminder/${Agoda}`);
    }
    // console.log(JSON.parse(localStorage.getItem('travelAgency')));
  };
  // console.log(bookOneResponse)

  // console.log(agodaDatesToShow);
  // console.log(roomDetails)
  // console.log(otas)
  // console.log(dropdownValue)
  // console.log('Agoda',showTravelAgencyName)

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
              <span
                onClick={() => {
                  console.log("Func")
                  if (selectedTextField.includes("priceField","stockField")) {
                    setStockField({
                          state: true,
                          value: stockField.value,
                          index: stockField.index,
                          row: stockField.row
                        });
                        setPriceField({
                          state: true,
                          value: priceField.value,
                          index: priceField.index,
                          row: priceField.row
                        });
                        setSelectedTextField([]);
                      }
                      else if (selectedTextField.includes("priceField") || selectedTextField.includes("stockField")){
                        if (selectedTextField.includes("priceField")) {
                          setPriceField({
                            state: true,
                            value: priceField.value,
                            index: priceField.index,
                            row: stockField.row
                          });
                        }
                        else {
                          setStockField({
                          state: true,
                          value: stockField.value,
                          index: stockField.index,
                          row: priceField.row
                          });
                        }
                        setSelectedTextField([]);
                      }
                      setStockField({
                        state: false,
                        value: '',
                        index: [],
                        row: []
                        });
                }}
              >
                Save
              </span>
            </button>
          </div>
        </div>

        <div className={styles.RoomsMainContainerOne}>
          <div className={styles.dateHeading}>
            <h3>Dates: </h3>
          </div>
          <div className={styles.dateContainer}>
            {agodaDatesToShow.map((val, i) => {
              return (
                <div key={i} className={styles.date}>
                  <h4>{val.day}</h4>
                  <p>{val.date}</p>
                </div>
              );
            })}
            <div className={styles.date}>
                  <h4>Mon</h4>
                  <p>13</p>
                </div>
            <div className={styles.date}>
                  <h4>Mon</h4>
                  <p>13</p>
                </div>
            <div className={styles.date}>
                  <h4>Mon</h4>
                  <p>13</p>
                </div>
            <div className={styles.date}>
                  <h4>Mon</h4>
                  <p>13</p>
                </div>
            <div className={styles.date}>
                  <h4>Mon</h4>
                  <p>13</p>
                </div>
            <div className={styles.date}>
                  <h4>Mon</h4>
                  <p>13</p>
                </div>
            <div className={styles.date}>
                  <h4>Mon</h4>
                  <p>13</p>
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
                          {
                            StockPriceDummyArray.map((val,i)=>{
                              // console.log(i, stockField.index)
                              return (
                                <div key={i} className={styles.pricing}>
                              {stockField.state == false && i == stockField.index  ? (
                                <input
                                  name={"stock"}
                                  value={stockField.value}
                                  className={styles.input}
                                  onChange={stockInputHandler}
                                ></input>
                              )
                            :
                            (
                              <p
                                onClick={() => {
                                  setStockField({
                                    state: false,
                                    value: "",
                                    index: i,
                                  });
                                  if (!selectedTextField.includes('stockField')) {
                                    setSelectedTextField([...selectedTextField,"stockField"]);
                                  }
                                }}
                              >
                                {stockField.value !== "" && stockField.index == i 
                                  ? `${StockPriceDummyArray[i].stock = stockField.value}`
                                  : val.stock}
                              </p>
                            )
                            }
                            {priceField.state == false && i == priceField.index ? 
                            (
                              <input
                                name={"price"}
                                value={priceField.value}
                                className={styles.input}
                                onChange={priceInputhandler}
                              ></input>
                            )
                            :
                            (
                              <p
                                onClick={() => {
                                  setPriceField({
                                    state: false,
                                    value: "",
                                    index: i,
                                  });
                                  if (!selectedTextField.includes('priceField')) {
                                    setSelectedTextField([...selectedTextField,"priceField"]);
                                  }
                                }}
                              >
                                ${priceField.value !== "" && priceField.index == i 
                                  ? `${StockPriceDummyArray[i].price = priceField.value}`
                                  : val.price}
                              </p>
                            )}
                          </div>
                              )
                            })
                          }
                          {/* <div className={styles.pricing}>
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
                          </div> */}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
              <div>
                      <div className={styles.thirdSection}>
                        <div className={styles.otaContainer}>
                          <div className={styles.otaInnerContainer}>
                            <div className={styles.otaImage}>
                              <img src="" alt="dummy" />
                            </div>
                            <div className={styles.otaRoomPlans}>
                              <h3>hahahah</h3>
                              <h4>(Deluxe Room - Buffet Combo)</h4>
                            </div>
                          </div>
                          <div className={styles.stockPrice}>
                            <p>Stock: </p>
                            <p>Price: </p>
                          </div>
                        </div>
                        <div className={styles.stockPriceContainer}>
                          {
                            StockPriceDummyArray.map((val,j)=>{
                              // console.log(i, stockField.index)
                              return (
                                <div key={j} className={styles.pricing}>
                              {stockField.state == false && stockField.index.includes(j) && stockField.row == i  ? (
                                <input
                                  name={"stock"}
                                  value={stockField.value}
                                  className={styles.input}
                                  onChange={(e)=>stockInputHandler(e,j,i)}
                                ></input>
                              )
                            :
                            (
                              <p
                                onClick={() => {
                                  setStockField({
                                    state: false,
                                    value: '',
                                    index: [...stockField.index,j],
                                    row: i
                                  });
                                  if (!selectedTextField.includes('stockField')) {
                                    setSelectedTextField([...selectedTextField,"stockField"]);
                                  }
                                }}
                              >
                                {stockField.value !== "" && stockField.index.includes(j) && stockField.row == i
                                  ? `${StockPriceDummyArray[j].stock = stockField.value}`
                                  : val.stock}
                              </p>
                            )
                            }
                            {priceField.state == false && priceField.index.includes(j) && priceField.row == i ? 
                            (
                              <input
                                name={"price"}
                                value={priceField.value}
                                className={styles.input}
                                onChange={(e)=>priceInputhandler(e,j,i)}
                              ></input>
                            )
                            :
                            (
                              <p
                                onClick={() => {
                                  setPriceField({
                                    state: false,
                                    value: "",
                                    index: [...stockField.index,j],
                                    row: i
                                  });
                                  if (!selectedTextField.includes('priceField')) {
                                    setSelectedTextField([...selectedTextField,"priceField"]);
                                  }
                                }}
                              >
                                ${priceField.value !== "" && priceField.index.includes(j) && priceField.row == i
                                  ? `${StockPriceDummyArray[j].price = priceField.value}`
                                  : val.price}
                              </p>
                            )}
                          </div>
                              )
                            })
                          }
                          {/* <div className={styles.pricing}>
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
                          </div> */}
                        </div>
                      </div>
                    
                  </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MakeMyTrip;
