import React from "react";
import { useState } from "react";
import "antd/dist/antd.css";
import moment from "moment";
import { DatePicker } from "antd";
import { RiCloseFill } from "react-icons/ri";

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  const [currentDate, setCurrentdate] = useState("");
  const [seventhDayDate, setSeventhDayDate] = useState("");
  //   console.log(currentDate, seventhDayDate);
  return (
    <>
      <button
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-3 py-2 rounded hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Bulk Update
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full backdrop-blur-sm">
            <div className="relative my-6 mx-auto max-w-3xl w-full">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex justify-between bg-blue-500 items-center p-2">
                  <h3 className="text-white text-xl">Bulk Update</h3>
                  <RiCloseFill
                    className="text-white h-6 w-6 text-bold"
                    onClick={() => setShowModal(false)}
                  />
                </div>
                <div className="flex justify-between py-2 items-center">
                  <div className="p-2">
                    <DatePicker
                      className="p-2"
                      size="small"
                      onChange={(value) => {
                        const fromDate = moment(value).format("YYYY-MM-DD");
                        setCurrentdate(fromDate);
                      }}
                    />
                    <DatePicker
                      className="p-2 mx-2"
                      placeholder="End Date"
                      size="small"
                      onChange={(value) => {
                        const endDate = moment(value).format("YYYY-MM-DD");
                        setSeventhDayDate(endDate);
                      }}
                    />
                  </div>
                  <button className="border bg-blue-400 h-10 p-2 m-2 text-white border-none rounded-md font-bold shadow hover:shadow-lg  focus:outline-none ease-linear transition-all duration-150 active:bg-blue-600">
                    Add Range
                  </button>
                </div>
                <div className="mx-2 mt-4">
                  {/* <div className="">
                    <label className="text-black-900 w-24">
                      Availability :{" "}
                    </label>{" "}
                    <input
                      className="border-2 border-blue-100 rounded-md"
                      type="text"
                      id=""
                      name=""
                    />
                  </div> */}
                  <div>
                    <div className="mb-3 xl:w-96 flex">
                      <div>
                        <label
                          htmlFor="noOfRooms"
                          className="form-label inline-block mb-2 text-gray-700"
                        ></label>
                        <input
                          name="noOfRooms"
                          type="number"
                          className="form-control block w-full px-3 py-1.5 text-sm font-normal text-gray-500 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="noOfRooms"
                          placeholder="No Of Rooms"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="price"
                          className="form-label inline-block mb-2 text-gray-700"
                        ></label>
                        <input
                          name="price"
                          type="number"
                          className="form-control block w-full px-3 py-1.5 text-sm font-normal text-gray-500 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none appearance-none"
                          id="price"
                          placeholder="Price"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="border bg-blue-400 h-10 p-2 m-2 text-white border-none rounded-md font-bold shadow hover:shadow-lg  focus:outline-none ease-linear transition-all duration-150 active:bg-blue-600">
                    Clear Selection
                  </button>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
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
