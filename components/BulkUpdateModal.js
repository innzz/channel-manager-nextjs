import React from "react";
import { useState } from "react";
import "antd/dist/antd.css";
import moment from "moment";
import { DatePicker } from "antd";
import { RiCloseFill } from "react-icons/ri";

export default function Modal(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [totalNoRooms, setTotalNoRooms] = useState("");
  const [price, setPrice] = useState("");
  const [noOfBooked, setNoOfBooked] = useState("");
  const [noOfHold, setNoOfHold] = useState("");
  const [noOfAvailable, setNoOfAvailable] = useState("");
  //   console.log(currentDate, seventhDayDate);
  // console.log(props.roomDetails);
  // console.log(props.roomDetailsToShow);
  const propertyId = props.propertyId;
  const roomId = props.defaultRoomId;
  const token = props.token;

  // console.log(fromDate);
  // console.log(toDate);
  // console.log(totalNoRooms);
  // console.log(price);
  // console.log(noOfBooked);
  // console.log(noOfHold);
  // console.log(noOfAvailable);
  // console.log(propertyId);
  // console.log(roomId);
  // console.log(token);

  const bulkUpdateInventory = async () => {
    let data = {
      fromDate: fromDate,
      noOfAvailable: noOfAvailable,
      noOfBooked: noOfBooked,
      noOfOnHold: noOfHold,
      price: price,
      propertyId: propertyId,
      roomId: roomId,
      toDate: toDate,
      totalNoRooms: totalNoRooms,
    };
    const res = await fetch(
      "https://api.bookonelocal.in/api-bookone/api/availability/bulkAvailabilityUpdateByRoomAndDateRange",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          APP_ID: "BOOKONE_WEB_APP",
        },
        body: JSON.stringify(data),
      }
    );
    let updatedResponse = await res.json();
    console.log(updatedResponse);
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-3 py-2 rounded hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Bulk Update Inventory
      </button>
      {showModal ? (
        <>
          {props.roomDetails.map((val, i) => {
            return (
              <div key={i}>
                {val.name == props.roomDetailsToShow?.name && (
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full backdrop-blur-sm">
                    <div className="relative my-6 mx-auto max-w-3xl w-full">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex justify-between bg-blue-500 items-center p-2">
                          <h3 className="text-white text-xl">
                            Update Inventory for {val.name}
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
                                type="number"
                                id="totalNoRooms"
                                placeholder="No Of Rooms"
                                onChange={(e) =>
                                  setTotalNoRooms(+e.target.value)
                                }
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
                                onChange={(e) => setPrice(+e.target.value)}
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
                                onChange={(e) => setNoOfBooked(+e.target.value)}
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
                                onChange={(e) => setNoOfHold(+e.target.value)}
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
                                onChange={(e) =>
                                  setNoOfAvailable(+e.target.value)
                                }
                                required
                              />
                            </div>
                          </div>
                        </form>
                        {/*footer*/}
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
                              bulkUpdateInventory();
                              setShowModal(false);
                            }}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </>
      ) : null}
    </>
  );
}
