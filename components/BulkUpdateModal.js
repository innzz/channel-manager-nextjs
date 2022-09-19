import React, { useEffect } from "react";
import { useState } from "react";
import "antd/dist/antd.css";
import moment from "moment";
import { DatePicker } from "antd";
import { RiCloseFill } from "react-icons/ri";
import { bulkUpdateRatesAndAvailablity } from "../assets/api/bulkUpdateRatesAndAvailablity";
import { DataByDates } from "../assets/api/dataByDates";

export default function Modal({roomDetails,token,setSevenDaysDataofRooms,setCurrentdate}) {
  let ModalRoomDetails = roomDetails;
  const [showModal, setShowModal] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [bulkUpdationRoom, setBulkUpdationRoom] = useState(ModalRoomDetails);
  
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
      setBulkUpdationRoom(roomDetails)
    }, [ModalRoomDetails])
    


    //It will handle all the input values
  const handleBulkUpdationOfRoom = (e)=>{
    if (e.target.name === 'totalNoRooms') {
      setBulkUpdationRoom({...bulkUpdationRoom,totalNoRooms: +e.target.value})
    }
    else if (e.target.name === 'price'){
      setBulkUpdationRoom({...bulkUpdationRoom,price: +e.target.value})
    }
    else if (e.target.name === 'noOfBooked'){
      setBulkUpdationRoom({...bulkUpdationRoom,noOfBooked: +e.target.value})
    }
    else if (e.target.name === 'noOfHold'){
      setBulkUpdationRoom({...bulkUpdationRoom,noOfOnHold: +e.target.value})
    }
    else if (e.target.name === 'noOfAvailable'){
      setBulkUpdationRoom({...bulkUpdationRoom,noOfAvailable: +e.target.value})
    }
  }

  //It will bulk update rates and availablities of selected room
  const bulkUpdateInventory = async ({noOfAvailable,noOfBooked,noOfOnHold,price,propertyId,roomId,totalNoRooms}) => {
    let data = {
      fromDate: fromDate,
      noOfAvailable: noOfAvailable,
      noOfBooked: noOfBooked,
      noOfOnHold: noOfOnHold,
      price: price,
      propertyId: propertyId,
      roomId: roomId,
      toDate: toDate,
      totalNoRooms: totalNoRooms,
    };
    // console.log(data)
    let updatedBulkRatesAndAvailablities = await bulkUpdateRatesAndAvailablity(data,token);
    let currentDateFuncResponse = getCurrentDateFunction();
    let seventhDayDateFuncResponse = getSevenDaysAfterDate(7);
    const dataRefreshed = {
      fromDate: currentDateFuncResponse,
      propertyId: propertyId,
      roomId: roomId,
      toDate: seventhDayDateFuncResponse,
    };
    let refreshedDataOfRooms = await DataByDates(dataRefreshed, token);
    let refreshedDataOfRoomsResponse = refreshedDataOfRooms;
    setSevenDaysDataofRooms(refreshedDataOfRoomsResponse);
    setCurrentdate(currentDateFuncResponse);
  };

  return (
    <>
      <button
      style={{backgroundColor:"#1D174D"}}
        className=" text-white font-bold uppercase text-sm px-3 py-2 rounded hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Bulk Update Inventory
      </button>
      {showModal ? (
        <div>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full backdrop-blur-sm">
                    <div className="relative my-6 mx-auto max-w-3xl w-full">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex justify-between bg-blue-500 items-center p-2">
                          <h3 className="text-white text-xl">
                            Update Inventory for {roomDetails.roomName}
                          </h3>
                          <RiCloseFill
                            className="text-white h-6 w-6 text-bold"
                            onClick={() => setShowModal(false)}
                          />
                        </div>
                        <div className="flex justify-between py-2 px-2 items-center">
                          <DatePicker
                            className="p-2 w-full"
                            size="small"
                            onChange={(value) => {
                              const fromDate =
                                moment(value).format("YYYY-MM-DD");
                              setFromDate(fromDate);
                            }}
                          />
                          <DatePicker
                            className="p-2 mx-2 w-full"
                            placeholder="End Date"
                            size="small"
                            onChange={(value) => {
                              const toDate = moment(value).format("YYYY-MM-DD");
                              setToDate(toDate);
                            }}
                          />
                        </div>
                        <form className="mx-2 mt-4">
                          <div className="flex justify-between items-center">
                            <div className="m-1 flex w-full">
                              <label
                                htmlFor="totalNoRooms"
                                className="form-label text-gray-700 w-72 text-sm mt-2"
                              >
                                No Of Rooms :
                              </label>
                              <input
                                className="form-control block text-sm text-gray-500 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                name="totalNoRooms"
                                type="totalNoRooms"
                                id="totalNoRooms"
                                placeholder="No Of Rooms"
                                onChange={handleBulkUpdationOfRoom}
                                required
                              />
                            </div>
                            <div className="m-1 flex w-full">
                              <label
                                htmlFor="price"
                                className="form-label text-gray-700 w-52 text-sm mt-2"
                              >
                                Price :
                              </label>
                              <input
                                className="form-control block text-sm text-gray-500 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                name="price"
                                type="number"
                                id="price"
                                placeholder="Price"
                                onChange={handleBulkUpdationOfRoom}
                                required
                              />
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-3">
                            <div className="m-1 flex w-full">
                              <label
                                htmlFor="noOfBooked"
                                className="form-label text-gray-700 w-72 text-sm mt-2"
                              >
                                No Of Booked Rooms :
                              </label>
                              <input
                                className="form-control block text-sm text-gray-500 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                name="noOfBooked"
                                type="number"
                                id="noOfBooked"
                                placeholder="Booked"
                                onChange={handleBulkUpdationOfRoom}
                                required
                              />
                            </div>
                            <div className="m-1 flex w-full">
                              <label
                                htmlFor="noOfHold"
                                className="form-label text-gray-700 w-52 text-sm mt-2"
                              >
                                No Of Hold Rooms :
                              </label>
                              <input
                                className="form-control block text-sm text-gray-500 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                name="noOfHold"
                                type="number"
                                id="noOfHold"
                                placeholder="Hold"
                                onChange={handleBulkUpdationOfRoom}
                                required
                              />
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-3 w-[23.5rem] mb-4">
                            <div className="m-1 flex w-full">
                              <label
                                htmlFor="noOfAvailable"
                                className="form-label text-gray-700 w-[18rem] text-sm mt-2"
                              >
                                No Of Available Rooms :
                              </label>
                              <input
                                className="w-full form-control block text-sm text-gray-500 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                name="noOfAvailable"
                                type="number"
                                id="noOfAvailable"
                                placeholder="Available"

                                onChange={handleBulkUpdationOfRoom}
                                required
                              />
                            </div>
                          </div>
                        </form>
                        <div className="flex items-center justify-end px-2 py-2 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => {
                              bulkUpdateInventory(bulkUpdationRoom);
                              setShowModal(false);
                            }}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                {/* )} */}
        </div>
      ) : null}
    </>
  );
}
