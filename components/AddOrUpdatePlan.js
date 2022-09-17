import React from "react";
import { useState } from "react";
import "antd/dist/antd.css";
import moment from "moment";
import { DatePicker } from "antd";
import { RiCloseFill } from "react-icons/ri";
import { useEffect } from "react";

export default function AddOrUpdatePlan({roomDetails,token,setSevenDaysDataofRooms,setCurrentdate,}) {
  let ModalRoomDetails = roomDetails;
  const [showModal, setShowModal] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [bulkUpdationRoom, setBulkUpdationRoom] = useState(ModalRoomDetails);
  
  console.log("bulk update room",bulkUpdationRoom)

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
      setBulkUpdationRoom(roomDetails)
    }, [ModalRoomDetails])

  //   useEffect(() => {
  //     setBulkUpdationRoom(roomDetails)
  //   }, [ModalRoomDetails])

  //   const getRoomPlans = async()=>{
  //       const roomPlansReq = await fetch(`https://testapi.bookonelocal.co.nz/api-bookone/api/room/property/${propertyId}/room/${roomId}/roomPlan`,{
  //           method: "GET",
  //           headers: {
  //               Accept: "application/json",
  //               Authorization: `Bearer ${token}`,
  //               "Content-Type": "application/json",
  //               APP_ID: "BOOKONE_WEB_APP",
  //             }
  //       });
  //       const roomPlansRes = await roomPlansReq.json();
  //       console.log(roomPlansRes);
  //   }

  // useEffect(() => {
  //     getRoomPlans()
  // }, [])
  
//   const [currentDate, setCurrentdate] = useState("");
//   const [seventhDayDate, setSeventhDayDate] = useState("");

  // console.log(props.sevenDaysDataOfRoom[0]?.roomRatePlans);
  return (
    <>
      <button
        style={{ backgroundColor: "#1D174D" }}
        className=" text-white font-bold uppercase text-sm px-3 py-2 rounded hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Example Modal
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full backdrop-blur-sm">
            <div className="relative my-6 mx-auto max-w-3xl w-full">
              {/* {/content/} */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex justify-between bg-blue-500 items-center p-2 px-3">
                  <h3 className="text-white text-xl">
                    Add Or Update Plans For Deluxe
                  </h3>
                  <RiCloseFill className="text-white h-6 w-6 text-bold" />
                </div>
                <div className="flex justify-between py-2 px-2">
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        className="inline-flex w-96 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        aria-expanded="true"
                        aria-haspopup="true"
                      >
                        Plan
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

                    <div
                      className="absolute left-0 z-10 mt-1 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex="-1"
                    >
                      <div>
                        <div className="py-1" role="none">
                          <a
                            href="#"
                            className="text-gray-700 rounded-lg hover:bg-blue-400 hover:text-white hover:mx-3 block px-4 py-2 text-sm"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-0"
                          >
                            Name
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="mx-3 flex flex-wrap w-96 gap-2 mt-3">
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder="Code"
                          name=""
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder="Name"
                          name=""
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder="Description"
                          name=""
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          placeholder="Min Occupancy"
                          id=""
                          name=""
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder="Max Occupancy"
                          name=""
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder="Extra Charge Per Person"
                          name=""
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder="No of Child"
                          name=""
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder="Extra Charge Per Person (3-5 yrs)"
                          name=""
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 px-2 w-44 rounded-md"
                          type="text"
                          id=""
                          placeholder="Extra Charge Per Child"
                          name=""
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <DatePicker
                        className="p-2 w-40"
                        size="small"
                        onChange={(value) => {
                          const fromDate = moment(value).format("YYYY-MM-DD");
                          setCurrentdate(fromDate);
                        }}
                      />
                      <DatePicker
                        className="p-2 w-40"
                        placeholder="End Date"
                        size="small"
                        onChange={(value) => {
                          const endDate = moment(value).format("YYYY-MM-DD");
                          setSeventhDayDate(endDate);
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
                        <input
                          type="checkbox"
                          name=""
                          value=""
                          className=""
                        ></input>
                        <span className="text-base ml-2 font-normal">
                          Monday
                        </span>
                      </div>
                      <div className="w-40">
                        <input
                          type="checkbox"
                          checked=""
                          name=""
                          value=""
                          className=""
                        ></input>
                        <span className="text-base ml-2 font-normal">
                          Tuesday
                        </span>
                      </div>
                      <div className="w-40">
                        <input
                          type="checkbox"
                          name=""
                          value=""
                          className=""
                        ></input>
                        <span className="text-base ml-2 font-normal">
                          Wednesday
                        </span>
                      </div>
                      <div className="w-40">
                        <input
                          type="checkbox"
                          name=""
                          value=""
                          className=""
                        ></input>
                        <span className="text-base ml-2 font-normal">
                          Thursday
                        </span>
                      </div>
                      <div className="w-40">
                        <input
                          type="checkbox"
                          name=""
                          value=""
                          className=""
                        ></input>
                        <span className="text-base ml-2 font-normal">
                          Friday
                        </span>
                      </div>
                      <div className="w-40">
                        <input
                          type="checkbox"
                          name=""
                          value=""
                          className=""
                        ></input>
                        <span className="text-base ml-2 font-normal">
                          Saturday
                        </span>
                      </div>
                      <div className="w-40">
                        <input
                          type="checkbox"
                          name=""
                          value=""
                          className=""
                        ></input>
                        <span className="text-base ml-2 font-normal">
                          Sunday
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-3 ml-1 px-4 py-2">
                    <div className="flex gap-1">
                      <input type="radio" />
                      <label>Rate</label>
                    </div>
                    <div className="flex gap-1">
                      <input type="radio" />
                      <label>Restrictions</label>
                    </div>
                  </div>
                  <div className="mx-6 flex flex-wrap gap-2 border-2 px-3 py-1 pb-2 rounded-lg mb-3">
                    <div>
                      <span>Max Length Of Stay</span>
                      <div>
                        <input
                          type="text"
                          placeholder="Max Length Of Stay"
                          className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-xs font-base text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                          name="quantity"
                          min="1"
                        ></input>
                      </div>
                    </div>
                    <div>
                      <span>Min Length Of Stay</span>
                      <div>
                        <input
                          type="text"
                          placeholder="Min Length Of Stay"
                          className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-xs font-base text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                          name="quantity"
                          min="1"
                        ></input>
                      </div>
                    </div>
                    <div>
                      <span>Status</span>
                      <div>
                        <button
                          type="button"
                          className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-xs font-base text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                          aria-expanded="true"
                          aria-haspopup="true"
                        >
                          Status
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
                    </div>
                    <div>
                      <span>Restrictions</span>
                      <div>
                        <button
                          type="button"
                          className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-xs font-base text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                          aria-expanded="true"
                          aria-haspopup="true"
                        >
                          Restrictions
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
                    </div>
                  </div>

                  <div className="mx-6 flex flex-wrap gap-2 border-2 px-3 py-1 pb-2 rounded-lg mb-3">
                    <div>
                      <span>Currency</span>
                      <div>
                        <button
                          type="button"
                          className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-xs font-base text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                          aria-expanded="true"
                          aria-haspopup="true"
                        >
                          Currency
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

                      <div
                        className="absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex="-1"
                      >
                        <div>
                          <div className="py-1" role="none">
                            <a
                              href="#"
                              className="text-gray-700 hover:bg-blue-400 hover:text-white hover:mx-3 block px-4 py-2 text-sm"
                              role="menuitem"
                              tabIndex="-1"
                              id="menu-item-0"
                            >
                              YES
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span>Room Standard Price</span>
                      <div>
                        <input
                          type="number"
                          className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                          name="quantity"
                          min="1"
                        ></input>
                      </div>
                    </div>
                    <div>
                      <span>More Than Standard Rate (%)</span>
                      <div>
                        <input
                          type="number"
                          className="inline-flex w-44 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                          name="quantity"
                          min="1"
                        ></input>
                      </div>
                    </div>
                    <div>
                      <span>Amount</span>
                      <div>
                        <input
                          type="number"
                          className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                          name="quantity"
                          min="1"
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {/footer/} */}
                <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-700 text-white active:bg-emerald-600 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
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