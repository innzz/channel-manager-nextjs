import React from "react";
import { useState } from "react";
import "antd/dist/antd.css";
import moment from "moment";
import { DatePicker } from "antd";
import { RiCloseFill } from "react-icons/ri";

export default function AddOrUpdatePlan(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [currentDate, setCurrentdate] = useState("");
  const [seventhDayDate, setSeventhDayDate] = useState("");
  const [planMenu, setPlanMenu] = useState(false)
  //   console.log(currentDate, seventhDayDate);
  return (
    <>
      <button
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-3 py-2 rounded hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >

        Add or Update Plan
      </button>
      {showModal ? (
        <>
          {props.roomDetails?.map((val, i) => {
            return (
              <>
                {val.name == props.roomDetailsToShow?.name && (
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full backdrop-blur-sm">
                    <div className="relative my-6 mx-auto max-w-3xl w-full">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex justify-between bg-blue-500 items-center p-2 px-3">
                          <h3 className="text-white text-xl">Add Or Update Plans For {val.name}</h3>
                          <RiCloseFill
                            className="text-white h-6 w-6 text-bold"
                            onClick={() => setShowModal(false)}
                          />
                        </div>
                        <div className="flex justify-between py-2 px-2 items-center">
                          <div className="relative inline-block text-left">
                            <div>
                              <button type="button" className="inline-flex w-96 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" onClick={() => setPlanMenu(!planMenu)} aria-expanded="true" aria-haspopup="true">
                                Choose Plan
                                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>

                            {planMenu === true ? <div className="absolute right-0 z-10 mt-2 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                              {sevenDaysDataOfRoom[0]?.roomRatePlans?.map(
                                (plans, ji) => {
                                  return (
                                    <div key={ji}>
                                      <div className="py-1" role="none">
                                        <a href="#" className="text-gray-700 hover:bg-blue-800 hover:text-white hover:mx-3 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">{plans.name}</a>
                                        </div>
                                    </div>)
                                })}
                            </div> : <></>}
                          </div>
                          <div>
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
                        </div>
                        <div className="mx-2 mt-4">
                          <div className="">
                            <label className="text-black-900 w-24">
                              Availability :{" "}
                            </label>{" "}
                            <input
                              className="border-2 border-blue-100 rounded-md"
                              type="text"
                              id=""
                              name=""
                            />
                          </div>
                          <div className="mt-2">
                            <label className="text-black-900 text-md w-24">
                              Rates :{" "}
                            </label>{" "}
                            <input
                              className="border-2 border-blue-100 rounded-md"
                              type="text"
                              id=""
                              name=""
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button className="border bg-blue-400 h-10 p-2 m-2 text-white border-none rounded-md font-bold shadow hover:shadow-lg  focus:outline-none ease-linear transition-all duration-150 active:bg-blue-600">
                            Clear Selection
                          </button>
                        </div>
                        <div className="flex items-center bg-blue-400 border-blue-100 h-8 mx-2 mt-1 p-2 rounded-md">
                          <input className="border-blue-200" type="checkbox" />
                          <label className="font-bold ml-2 text-white">
                            Double Room
                          </label>
                        </div>
                        <div className="flex items-center bg-blue-400 border-blue-100 h-8 mx-2 mt-1 p-2 rounded-md">
                          <input className="border-blue-200" type="checkbox" />
                          <label className="font-bold ml-2 text-white">Twin Room</label>
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
                )}
              </>
            );
          })}
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
