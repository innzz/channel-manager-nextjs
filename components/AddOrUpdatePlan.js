import React from "react";
import { useState } from "react";
import "antd/dist/antd.css";
import moment from "moment";
import { DatePicker } from "antd";
import { RiCloseFill } from "react-icons/ri";
import { useEffect } from "react";
import { DataByDates } from "../assets/api/dataByDates";

export default function AddOrUpdatePlan({
  roomDetails,
  propertyId,
  token,
  setSevenDaysDataofRooms,
  setCurrentdate,
}) {
  let roomDetailsInModal = roomDetails;
  let propertyIdInModal = propertyId;
  const currencies = [
    {
      currencyName: "Indian Rupee",
      currencyCode: "INR",
    },
    {
      currencyName: "Austrilia Dollar",
      currencyCode: "AUD",
    },
    {
      currencyName: "United States Dollar",
      currencyCode: "USD",
    },
    {
      currencyName: "British Pound",
      currencyCode: "GBP",
    },
    {
      currencyName: "Euro",
      currencyCode: "EUR",
    },
    {
      currencyName: "New Zealand Dollar",
      currencyCode: "NZD",
    },
    {
      currencyName: "Bangladeshi Taka",
      currencyCode: "BDT",
    },
    {
      currencyName: "Saudi Riyal",
      currencyCode: "SAR",
    },
    {
      currencyName: "Singapore Dollar",
      currencyCode: "SGD",
    },
    {
      currencyName: "Fiji Dollar",
      currencyCode: "FJD",
    },
  ];
  const statusArray = ["None", "Open", "Close"];
  const restrictions = ["None", "Arrival", "Departure"];
  const [showModal, setShowModal] = useState(false);
  const [showModalPlans, setShowModalPlans] = useState(false);
  const [showModalStatus, setShowModalStatus] = useState(false);
  const [showModalRestrictions, setShowModalRestrictions] = useState(false);
  const [showModalCurrency, setShowModalCurrency] = useState(false);
  const [modalState, setModalState] = useState("Rate");
  const [updationPlan, setUpdationPlan] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [allPlans, setAllPlans] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRestriction, setSelectedRestriction] = useState("");

  // console.log("bulk update room",roomId,propertyId)
  // console.log("bulk update room",bulkUpdationRoom)

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

  useEffect(() => {
    if (roomDetailsInModal !== undefined) {
      getRoomPlans();
    }
  }, [roomDetailsInModal]);

  const getRoomPlans = async () => {
    const roomPlansReq = await fetch(
      `https://api.bookonelocal.in/api-bookone/api/room/property/${propertyIdInModal}/room/${roomDetailsInModal.bookoneRoomId}/roomPlan`,
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
    const roomPlansRes = await roomPlansReq.json();
    console.log(roomPlansRes);
    setAllPlans(roomPlansRes);
  };

  const filterWeek = (weekday, week) => {
    week = week.filter((item) => item !== weekday);
    setUpdationPlan({ ...updationPlan, dayOfTheWeekList: week });
  };

  const handleChange = (e) => {
    if (
      e.target.name === "code" ||
      e.target.name === "name" ||
      e.target.name === "description"
    ) {
      setUpdationPlan({ ...updationPlan, [e.target.name]: e.target.value });
    } else {
      setUpdationPlan({ ...updationPlan, [e.target.name]: +e.target.value });
    }
  };

  const handleDiscountAmount = (e) => {
    setUpdationPlan({ ...updationPlan, [e.target.name]: +e.target.value });
    // setUpdationPlan({...updationPlan, amount: updationPlan.deviationFromStandardPlan - (updationPlan.deviationFromStandardPlan * updationPlan.amount) })
  };

  const updatePlans = async () => {
    const data = {
      ...updationPlan,
      channelManagerUpdateType: "ROOM_RATE_PLAN",
      effectiveDate: fromDate,
      expiryDate: toDate,
      roomTypeId: updationPlan.roomId,
    };
    console.log(data);
    const updatePlanReq = await fetch(
      "https://api.bookonelocal.in/api-bookone/api/availability/addOrUpdatePlan",
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
      propertyId: propertyIdInModal,
      roomId: roomDetailsInModal.bookoneRoomId,
      toDate: seventhDayDateFuncResponse,
    };
    let refreshedDataOfRooms = await DataByDates(dataRefreshed, token);
    let refreshedDataOfRoomsResponse = refreshedDataOfRooms;
    setSevenDaysDataofRooms(refreshedDataOfRoomsResponse);
    setCurrentdate(currentDateFuncResponse);
    setShowModal(false);
    setUpdationPlan("");
  };

  // if (updationPlan.amount <= 0 || updationPlan.amount === NaN || updationPlan.amount === Infinity ) {
  //   setUpdationPlan({...updationPlan, amount: 2000})
  // }
  // useEffect(() => {
  // }, [])

  //   const [currentDate, setCurrentdate] = useState("");
  //   const [seventhDayDate, setSeventhDayDate] = useState("");
  // console.log("room plans",allPlans);
  console.log("selected plan", updationPlan);
  console.log(fromDate, toDate);

  // console.log(props.sevenDaysDataOfRoom[0]?.roomRatePlans);
  return (
    <>
      <button
        style={{ backgroundColor: "#1D174D" }}
        className=" text-white font-bold uppercase text-sm px-3 py-2 rounded hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add or Update Plans
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full backdrop-blur-sm">
            <div className="relative my-6 mx-auto max-w-3xl w-full">
              {/* {/content/} */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex justify-between bg-blue-500 items-center p-2 px-3">
                  <h3 className="text-white text-xl">
                    Add Or Update Plans For {roomDetailsInModal.name}
                  </h3>
                  <RiCloseFill
                    className="text-white h-6 w-6 text-bold"
                    onClick={() => {
                      setShowModal(false);
                      setUpdationPlan("");
                      setShowModalPlans(false);
                      setShowModalCurrency(false);
                      setModalState("Rate");
                      setSelectedRestriction("");
                      setSelectedCurrency("");
                      setSelectedStatus("");
                      setShowModalRestrictions(false);
                      setShowModalStatus(false);
                    }}
                  />
                </div>
                <div className="flex justify-between py-2 px-2">
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        className="inline-flex w-96 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        aria-expanded="true"
                        aria-haspopup="true"
                        onClick={() => {
                          setShowModalPlans(!showModalPlans);
                        }}
                      >
                        {updationPlan === "" ? "Plans" : updationPlan.name}
                        <svg
                          className="-mr-1 ml-2 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    {showModalPlans && (
                      <div
                        className="absolute left-0 z-10 mt-1 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex="-1"
                      >
                        {allPlans.map((plan, key) => {
                          return (
                            <div
                              className="py-1"
                              role="none"
                              key={key}
                              onClick={() => {
                                setShowModalPlans(false);
                                setUpdationPlan(plan);
                                setSelectedCurrency("");
                                setSelectedRestriction("");
                                setSelectedStatus("");
                                setShowModalCurrency(false);
                                setShowModalStatus(false);
                                setShowModalRestrictions(false);
                              }}
                            >
                              <a
                                className="text-gray-700 rounded-lg hover:bg-blue-400 hover:text-white hover:mx-3 block px-4 py-2 text-sm"
                                role="menuitem"
                                tabIndex="-1"
                                id="menu-item-0"
                              >
                                {plan.name}
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="mx-3 flex flex-wrap w-96 gap-2 mt-3">
                      <div className="">
                        {updationPlan !== "" ? (
                          <input
                            className="border-2 border-blue-100 w-44 px-2 rounded-md"
                            type="text"
                            placeholder={
                              updationPlan !== "" ? updationPlan.code : "Code"
                            }
                            name="code"
                            onChange={handleChange}
                            value={updationPlan.code}
                          />
                        ) : (
                          <input
                            className="border-2 border-blue-100 w-44 px-2 rounded-md"
                            type="text"
                            name="code"
                            placeholder={
                              updationPlan !== "" ? updationPlan.code : "Code"
                            }
                            disabled
                          />
                        )}
                      </div>
                      <div className="">
                        {updationPlan !== "" ? (
                          <input
                            className="border-2 border-blue-100 w-44 px-2 rounded-md"
                            type="text"
                            placeholder={
                              updationPlan !== "" ? updationPlan.name : "Name"
                            }
                            name="name"
                            onChange={handleChange}
                            value={updationPlan.name}
                          />
                        ) : (
                          <input
                            className="border-2 border-blue-100 w-44 px-2 rounded-md"
                            type="text"
                            name="name"
                            placeholder={
                              updationPlan !== "" ? updationPlan.name : "Name"
                            }
                            disabled
                          />
                        )}
                      </div>
                      <div className="">
                        {updationPlan !== "" ? (
                          <input
                            className="border-2 border-blue-100 w-44 px-2 rounded-md"
                            type="text"
                            placeholder={
                              updationPlan !== ""
                                ? updationPlan.description
                                : "Description"
                            }
                            name="description"
                            onChange={handleChange}
                            value={updationPlan.description}
                          />
                        ) : (
                          <input
                            className="border-2 border-blue-100 w-44 px-2 rounded-md"
                            type="text"
                            name="description"
                            placeholder={
                              updationPlan !== ""
                                ? updationPlan.description
                                : "Description"
                            }
                            disabled
                          />
                        )}
                      </div>
                      <div className="">
                        {updationPlan !== "" ? (
                          <input
                            className="border-2 border-blue-100 w-44 px-2 rounded-md"
                            type="number"
                            name="minimumOccupancy"
                            placeholder={
                              updationPlan !== ""
                                ? updationPlan.minimumOccupancy
                                : "Min Occupancy"
                            }
                            onChange={handleChange}
                            value={updationPlan.minimumOccupancy}
                          />
                        ) : (
                          <input
                            className="border-2 border-blue-100 w-44 px-2 rounded-md"
                            name="minimumOccupancy"
                            placeholder={
                              updationPlan !== ""
                                ? updationPlan.minimumOccupancy
                                : "Min Occupancy"
                            }
                            disabled
                          />
                        )}
                      </div>
                      <div className="">
                        {updationPlan !== "" ? (
                          <input
                            className="border-2 border-blue-100 w-44 px-2 rounded-md"
                            type="number"
                            name="maximumOccupancy"
                            placeholder={
                              updationPlan !== ""
                                ? updationPlan.maximumOccupancy
                                : "Max Occupancy"
                            }
                            onChange={handleChange}
                            value={updationPlan.maximumOccupancy}
                          />
                        ) : (
                          <input
                            className="border-2 border-blue-100 w-44 px-2 rounded-md"
                            name="maximumOccupancy"
                            placeholder={
                              updationPlan !== ""
                                ? updationPlan.maximumOccupancy
                                : "Max Occupancy"
                            }
                            disabled
                          />
                        )}
                      </div>
                      <div className="">
                        {updationPlan !== "" ? (
                          <input
                            className="border-2 border-blue-100 w-44 px-2 rounded-md"
                            type="number"
                            name="extraChargePerPerson"
                            placeholder={
                              updationPlan !== ""
                                ? updationPlan.extraChargePerPerson
                                : "Extra Charge Per Person"
                            }
                            onChange={handleChange}
                            value={updationPlan.extraChargePerPerson}
                          />
                        ) : (
                          <input
                            className="border-2 border-blue-100 w-44 px-2 rounded-md"
                            name="extraChargePerPerson"
                            placeholder={
                              updationPlan !== ""
                                ? updationPlan.extraChargePerPerson
                                : "Extra Charge Per Person"
                            }
                            disabled
                          />
                        )}
                      </div>
                      <div className="">
                        {updationPlan !== "" ? (
                          <input
                            className="border-2 border-blue-100 w-44 px-2 rounded-md"
                            type="number"
                            name="noOfChildren"
                            placeholder={
                              updationPlan !== ""
                                ? updationPlan.noOfChildren
                                : "No of Child"
                            }
                            onChange={handleChange}
                            value={updationPlan.noOfChildren}
                          />
                        ) : (
                          <input
                            className="border-2 border-blue-100 w-44 px-2 rounded-md"
                            name="noOfChildren"
                            placeholder={
                              updationPlan !== ""
                                ? updationPlan.noOfChildren
                                : "No of Child"
                            }
                            disabled
                          />
                        )}
                      </div>
                      <div className="">
                        {updationPlan !== "" ? (
                          <input
                            className="border-2 border-blue-100 w-44 px-2 rounded-md"
                            type="number"
                            name="extraChargePerChild3To5yrs"
                            placeholder={
                              updationPlan !== ""
                                ? updationPlan.extraChargePerChild3To5yrs
                                : "Extra Charge Per Person (3-5 yrs)"
                            }
                            onChange={handleChange}
                            value={updationPlan.extraChargePerChild3To5yrs}
                          />
                        ) : (
                          <input
                            className="border-2 border-blue-100 w-44 px-2 rounded-md"
                            name="extraChargePerChild3To5yrs"
                            placeholder={
                              updationPlan !== ""
                                ? updationPlan.extraChargePerChild3To5yrs
                                : "Extra Charge Per Person (3-5 yrs)"
                            }
                            disabled
                          />
                        )}
                      </div>
                      <div className="">
                        {updationPlan !== "" ? (
                          <input
                            className="border-2 border-blue-100 px-2 w-44 rounded-md"
                            type="number"
                            name="extraChargePerChild"
                            placeholder={
                              updationPlan !== ""
                                ? updationPlan.extraChargePerChild
                                : "Extra Charge Per Child"
                            }
                            onChange={handleChange}
                            value={updationPlan.extraChargePerChild}
                          />
                        ) : (
                          <input
                            className="border-2 border-blue-100 px-2 w-44 rounded-md"
                            name="extraChargePerChild"
                            placeholder={
                              updationPlan !== ""
                                ? updationPlan.extraChargePerChild
                                : "Extra Charge Per Child"
                            }
                            disabled
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <DatePicker
                        className="p-2 w-40"
                        size="small"
                        onChange={(value) => {
                          const fromDateValue =
                            moment(value).format("YYYY-MM-DD");
                          setFromDate(fromDateValue);
                        }}
                      />
                      <DatePicker
                        className="p-2 w-40"
                        placeholder="End Date"
                        size="small"
                        onChange={(value) => {
                          const endDateValue =
                            moment(value).format("YYYY-MM-DD");
                          setToDate(endDateValue);
                        }}
                      />
                    </div>

                    <div className="mt-3 px-1 flex flex-wrap">
                      {/* {props.sevenDaysDataOfRoom[0]?.roomRatePlans?.map(
                                plans => {
                                  return plans.dayOfTheWeekList.map(weeks => (
                                    <div key={plans.id} className="w-40">
                                      <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} name="" value="" className="" ></input>
                                      <span className="text-base ml-2 font-normal">{weeks}</span>
                                    </div>
                                    ))})} */}
                      <div className="w-40">
                        {updationPlan === "" ? (
                          <input type="checkbox" disabled />
                        ) : updationPlan.dayOfTheWeekList.includes("MONDAY") ? (
                          <input
                            type="checkbox"
                            onClick={() =>
                              filterWeek(
                                "MONDAY",
                                updationPlan.dayOfTheWeekList
                              )
                            }
                            checked
                          />
                        ) : (
                          <input
                            type="checkbox"
                            onClick={() => {
                              if (
                                !updationPlan.dayOfTheWeekList.includes(
                                  "MONDAY"
                                )
                              ) {
                                let arr = updationPlan.dayOfTheWeekList;
                                arr.push("MONDAY");
                                setUpdationPlan({
                                  ...updationPlan,
                                  dayOfTheWeekList: arr,
                                });
                              }
                            }}
                          />
                        )}
                        <span className="text-base ml-2 font-normal">
                          MONDAY
                        </span>
                      </div>
                      <div className="w-40">
                        {updationPlan === "" ? (
                          <input type="checkbox" disabled />
                        ) : updationPlan.dayOfTheWeekList.includes(
                            "TUESDAY"
                          ) ? (
                          <input
                            type="checkbox"
                            onClick={() =>
                              filterWeek(
                                "TUESDAY",
                                updationPlan.dayOfTheWeekList
                              )
                            }
                            checked
                          />
                        ) : (
                          <input
                            type="checkbox"
                            onClick={() => {
                              if (
                                !updationPlan.dayOfTheWeekList.includes(
                                  "TUESDAY"
                                )
                              ) {
                                let arr = updationPlan.dayOfTheWeekList;
                                arr.push("TUESDAY");
                                setUpdationPlan({
                                  ...updationPlan,
                                  dayOfTheWeekList: arr,
                                });
                              }
                            }}
                          />
                        )}
                        <span className="text-base ml-2 font-normal">
                          TUESDAY
                        </span>
                      </div>
                      <div className="w-40">
                        {updationPlan === "" ? (
                          <input type="checkbox" disabled />
                        ) : updationPlan.dayOfTheWeekList.includes(
                            "WEDNESDAY"
                          ) ? (
                          <input
                            type="checkbox"
                            onClick={() =>
                              filterWeek(
                                "WEDNESDAY",
                                updationPlan.dayOfTheWeekList
                              )
                            }
                            checked
                          />
                        ) : (
                          <input
                            type="checkbox"
                            onClick={() => {
                              if (
                                !updationPlan.dayOfTheWeekList.includes(
                                  "WEDNESDAY"
                                )
                              ) {
                                let arr = updationPlan.dayOfTheWeekList;
                                arr.push("WEDNESDAY");
                                setUpdationPlan({
                                  ...updationPlan,
                                  dayOfTheWeekList: arr,
                                });
                              }
                            }}
                          />
                        )}
                        <span className="text-base ml-2 font-normal">
                          WEDNESDAY
                        </span>
                      </div>
                      <div className="w-40">
                        {updationPlan === "" ? (
                          <input type="checkbox" disabled />
                        ) : updationPlan.dayOfTheWeekList.includes(
                            "THURSDAY"
                          ) ? (
                          <input
                            type="checkbox"
                            onClick={() =>
                              filterWeek(
                                "THURSDAY",
                                updationPlan.dayOfTheWeekList
                              )
                            }
                            checked
                          />
                        ) : (
                          <input
                            type="checkbox"
                            onClick={() => {
                              if (
                                !updationPlan.dayOfTheWeekList.includes(
                                  "THURSDAY"
                                )
                              ) {
                                let arr = updationPlan.dayOfTheWeekList;
                                arr.push("THURSDAY");
                                setUpdationPlan({
                                  ...updationPlan,
                                  dayOfTheWeekList: arr,
                                });
                              }
                            }}
                          />
                        )}
                        <span className="text-base ml-2 font-normal">
                          THURSDAY
                        </span>
                      </div>
                      <div className="w-40">
                        {updationPlan === "" ? (
                          <input type="checkbox" disabled />
                        ) : updationPlan.dayOfTheWeekList.includes("FRIDAY") ? (
                          <input
                            type="checkbox"
                            onClick={() =>
                              filterWeek(
                                "FRIDAY",
                                updationPlan.dayOfTheWeekList
                              )
                            }
                            checked
                          />
                        ) : (
                          <input
                            type="checkbox"
                            onClick={() => {
                              if (
                                !updationPlan.dayOfTheWeekList.includes(
                                  "FRIDAY"
                                )
                              ) {
                                let arr = updationPlan.dayOfTheWeekList;
                                arr.push("FRIDAY");
                                setUpdationPlan({
                                  ...updationPlan,
                                  dayOfTheWeekList: arr,
                                });
                              }
                            }}
                          />
                        )}
                        <span className="text-base ml-2 font-normal">
                          FRIDAY
                        </span>
                      </div>
                      <div className="w-40">
                        {updationPlan === "" ? (
                          <input type="checkbox" disabled />
                        ) : updationPlan.dayOfTheWeekList.includes(
                            "SATURDAY"
                          ) ? (
                          <input
                            type="checkbox"
                            onClick={() =>
                              filterWeek(
                                "SATURDAY",
                                updationPlan.dayOfTheWeekList
                              )
                            }
                            checked
                          />
                        ) : (
                          <input
                            type="checkbox"
                            onClick={() => {
                              if (
                                !updationPlan.dayOfTheWeekList.includes(
                                  "SATURDAY"
                                )
                              ) {
                                let arr = updationPlan.dayOfTheWeekList;
                                arr.push("SATURDAY");
                                setUpdationPlan({
                                  ...updationPlan,
                                  dayOfTheWeekList: arr,
                                });
                              }
                            }}
                          />
                        )}
                        <span className="text-base ml-2 font-normal">
                          SATURDAY
                        </span>
                      </div>
                      <div className="w-40">
                        {updationPlan === "" ? (
                          <input type="checkbox" disabled />
                        ) : updationPlan.dayOfTheWeekList.includes("SUNDAY") ? (
                          <input
                            type="checkbox"
                            onClick={() =>
                              filterWeek(
                                "SUNDAY",
                                updationPlan.dayOfTheWeekList
                              )
                            }
                            checked
                          />
                        ) : (
                          <input
                            type="checkbox"
                            onClick={() => {
                              if (
                                !updationPlan.dayOfTheWeekList.includes(
                                  "SUNDAY"
                                )
                              ) {
                                let arr = updationPlan.dayOfTheWeekList;
                                arr.push("SUNDAY");
                                setUpdationPlan({
                                  ...updationPlan,
                                  dayOfTheWeekList: arr,
                                });
                              }
                            }}
                          />
                        )}
                        <span className="text-base ml-2 font-normal">
                          SUNDAY
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-3 ml-1 px-4 py-2">
                    <div className="flex gap-1">
                      {modalState === "Rate" ? (
                        <input
                          type="radio"
                          name="modalState"
                          onClick={() => setModalState("Rate")}
                          checked
                        />
                      ) : (
                        <input
                          type="radio"
                          name="modalState"
                          onClick={() => setModalState("Rate")}
                        />
                      )}
                      <label>Rate</label>
                    </div>
                    <div className="flex gap-1">
                      {modalState === "Restriction" ? (
                        <input
                          type="radio"
                          name="modalState"
                          onClick={() => setModalState("Restriction")}
                          checked
                        />
                      ) : (
                        <input
                          type="radio"
                          name="modalState"
                          onClick={() => setModalState("Restriction")}
                        />
                      )}
                      <label>Restrictions</label>
                    </div>
                  </div>
                  {modalState === "Restriction" ? (
                    <div className="mx-6 flex flex-wrap gap-2 border-2 px-3 py-1 pb-2 rounded-lg mb-3">
                      <div>
                        <span>Max Length Of Stay</span>
                        <div>
                          {updationPlan !== "" ? (
                            <input
                              type="number"
                              placeholder={
                                updationPlan !== ""
                                  ? updationPlan.maximumLengthOfStay
                                  : "Max Length Of Stay"
                              }
                              name="maximumLengthOfStay"
                              className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-xs font-base text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                              onChange={handleChange}
                            />
                          ) : (
                            <input
                              type="text"
                              placeholder={
                                updationPlan !== ""
                                  ? updationPlan.maximumLengthOfStay
                                  : "Max Length Of Stay"
                              }
                              name="maximumLengthOfStay"
                              className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-xs font-base text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                              disabled
                            />
                          )}
                        </div>
                      </div>
                      <div>
                        <span>Min Length Of Stay</span>
                        <div>
                          {updationPlan !== "" ? (
                            <input
                              type="number"
                              placeholder={
                                updationPlan !== ""
                                  ? updationPlan.minimumLengthOfStay
                                  : "Min Length Of Stay"
                              }
                              name="minimumLengthOfStay"
                              className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-xs font-base text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                              onChange={handleChange}
                            />
                          ) : (
                            <input
                              placeholder={
                                updationPlan !== ""
                                  ? updationPlan.minimumLengthOfStay
                                  : "Min Length Of Stay"
                              }
                              name="minimumLengthOfStay"
                              className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-xs font-base text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                              disabled
                            />
                          )}
                        </div>
                      </div>
                      <div style={{ position: "relative" }}>
                        <span>Status</span>
                        <div>
                          <button
                            type="button"
                            className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-xs font-base text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                            aria-expanded="true"
                            aria-haspopup="true"
                            onClick={() => setShowModalStatus(!showModalStatus)}
                          >
                            {selectedStatus !== ""
                              ? selectedStatus
                              : updationPlan !== ""
                              ? updationPlan.status
                              : "Status"}
                            <svg
                              className="-mr-1 ml-2 h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                        {showModalStatus && (
                          <div
                            className="absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none h-20"
                            style={{ overflowY: "auto" }}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            {statusArray.map((status, i) => {
                              return (
                                <div
                                  className="py-1"
                                  role="none"
                                  key={i}
                                  onClick={() => {
                                    setShowModalStatus(false);
                                    setSelectedStatus(status);
                                  }}
                                >
                                  <a
                                    href="#"
                                    className="text-gray-700 hover:bg-blue-400 hover:text-white hover:mx-3 block px-4 py-2 text-sm"
                                    role="menuitem"
                                    tabIndex="-1"
                                    id="menu-item-0"
                                  >
                                    {status}
                                  </a>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div style={{ position: "relative" }}>
                        <span>Restrictions</span>
                        <div>
                          <button
                            type="button"
                            className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-xs font-base text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                            aria-expanded="true"
                            aria-haspopup="true"
                            onClick={() =>
                              setShowModalRestrictions(!showModalRestrictions)
                            }
                          >
                            {selectedRestriction !== ""
                              ? selectedRestriction
                              : updationPlan !== ""
                              ? updationPlan.restriction
                              : "Restrictions"}
                            <svg
                              className="-mr-1 ml-2 h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                        {showModalRestrictions && (
                          <div
                            className="absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none h-20"
                            style={{ overflowY: "auto" }}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            {restrictions.map((restriction, i) => {
                              return (
                                <div
                                  className="py-1"
                                  role="none"
                                  key={i}
                                  onClick={() => {
                                    setShowModalRestrictions(false);
                                    setSelectedRestriction(restriction);
                                  }}
                                >
                                  <a
                                    href="#"
                                    className="text-gray-700 hover:bg-blue-400 hover:text-white hover:mx-3 block px-4 py-2 text-sm"
                                    role="menuitem"
                                    tabIndex="-1"
                                    id="menu-item-0"
                                  >
                                    {restriction}
                                  </a>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="relative mx-6 flex flex-wrap gap-2 border-2 px-3 py-1 pb-2 rounded-lg mb-3">
                      <div style={{ position: "relative" }}>
                        <span>Currency</span>
                        <div>
                          <button
                            type="button"
                            className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-xs font-base text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                            aria-expanded="true"
                            aria-haspopup="true"
                            onClick={() =>
                              setShowModalCurrency(!showModalCurrency)
                            }
                          >
                            {selectedCurrency !== ""
                              ? selectedCurrency.currencyCode
                              : updationPlan !== ""
                              ? updationPlan.currencyCode
                              : "Currency"}
                            <svg
                              className="-mr-1 ml-2 h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                        {showModalCurrency && (
                          <div
                            className="absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none h-20"
                            style={{ overflowY: "scroll" }}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                          >
                            {currencies.map((currency, i) => {
                              return (
                                <div
                                  className="py-1"
                                  key={i}
                                  role="none"
                                  onClick={() => {
                                    setShowModalCurrency(false);
                                    setSelectedCurrency(currency);
                                  }}
                                >
                                  <a
                                    href="#"
                                    className="text-gray-700 hover:bg-blue-400 hover:text-white hover:mx-3 block px-4 py-2 text-sm"
                                    role="menuitem"
                                    tabIndex="-1"
                                    id="menu-item-0"
                                  >
                                    {currency.currencyName}(
                                    {currency.currencyCode})
                                  </a>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div>
                        <span>Room Standard Price</span>
                        <div>
                          <input
                            type="number"
                            name="roomStandardPrice"
                            className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                            placeholder="2000"
                            disabled
                          />
                        </div>
                      </div>
                      <div>
                        <span>More Than Standard Rate (%)</span>
                        <div>
                          {updationPlan !== "" ? (
                            <input
                              type="number"
                              className="inline-flex w-44 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                              name="deviationFromStandardPlan"
                              placeholder={
                                updationPlan !== ""
                                  ? updationPlan.deviationFromStandardPlan
                                  : "Discount Amount"
                              }
                              onChange={handleDiscountAmount}
                              value={updationPlan.deviationFromStandardPlan}
                            />
                          ) : (
                            <input
                              type="number"
                              className="inline-flex w-44 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                              name="deviationFromStandardPlan"
                              placeholder={
                                updationPlan !== ""
                                  ? updationPlan.deviationFromStandardPlan
                                  : "Discount Amount"
                              }
                              disabled
                            />
                          )}
                        </div>
                      </div>
                      <div>
                        <span>Amount</span>
                        <div>
                          {updationPlan !== "" ? (
                            <input
                              type="number"
                              className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                              name="amount"
                              placeholder={
                                updationPlan !== ""
                                  ? updationPlan.amount
                                  : "Amount"
                              }
                              onChange={handleChange}
                              value={updationPlan.amount}
                            />
                          ) : (
                            <input
                              className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                              name="amount"
                              placeholder={
                                updationPlan !== ""
                                  ? updationPlan.amount
                                  : "Amount"
                              }
                              disabled
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* {/footer/} */}
                <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setUpdationPlan("");
                      setShowModalPlans(false);
                      setShowModalCurrency(false);
                      setModalState("Rate");
                      setSelectedRestriction("");
                      setSelectedCurrency("");
                      setSelectedStatus("");
                      setShowModalRestrictions(false);
                      setShowModalStatus(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-700 text-white active:bg-emerald-600 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => updatePlans()}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
