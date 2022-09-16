import React, { useEffect } from "react";
import { useState } from "react";
import { DatePicker } from "antd";
import { RiCloseFill } from "react-icons/ri";
import axios from "axios";
import "antd/dist/antd.css";
import moment from "moment";

export default function Duplicate({ propertyId, defaultRoomId, token }) {
  const [showModal, setShowModal] = React.useState(false);
  const [dropdownPlan, setDropdownPlan] = useState(!true);
  const [currencyDropDown, setCurrencyDropDown] = useState(false);
  const [rateShow, setRateShow] = useState(true);
  const [restrictionShow, setRestrictionShow] = useState(false);
  const [currentDate, setCurrentdate] = useState("");
  const [seventhDayDate, setSeventhDayDate] = useState("");
  const [planData, setPlanData] = useState([]);
  const [planDataDetail, setPlanDataDetail] = useState([]);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  // console.log(defaultRoomId, propertyId);
  console.log(planDataDetail);

  const roomPlanResponse = async () => {
    const res = await axios.get(
      `https://testapi.bookonelocal.co.nz/api-bookone/api/room/property/${propertyId}/room/${defaultRoomId}/roomPlan`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          APP_ID: "BOOKONE_WEB_APP",
          accept: "application/json",
        },
      }
    );
    const { data } = await res;
    setPlanData(data);
  };

  useEffect(() => {
    roomPlanResponse();
  }, []);

  console.log(dropdownPlan);

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
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full backdrop-blur-sm">
            <div className="relative my-6 mx-auto max-w-3xl w-full">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex justify-between bg-blue-500 items-center p-2 px-3">
                  <h3 className="text-white text-xl">
                    Add Or Update Plans For Deluxe Room
                  </h3>
                  <RiCloseFill
                    className="text-white h-6 w-6 text-bold"
                    onClick={() => setShowModal(false)}
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
                          console.log(dropdownPlan);
                          if (dropdownPlan === false) {
                            setDropdownPlan(true);
                          } else {
                            setDropdownPlan(false);
                          }
                        }}
                      >
                        {planDataDetail.name ? planDataDetail.name : "Plan"}
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
                      {dropdownPlan == true ? (
                        <div>
                          {planData.map((val, i) => {
                            let effDate = new Date(val.effectiveDate)
                              .toLocaleDateString()
                              .split("/")
                              .join("-");
                            let exDate = new Date(val.expiryDate)
                              .toLocaleDateString()
                              .split("/")
                              .join("-");
                            return (
                              <div key={i} className="py-1" role="none">
                                <a
                                  onClick={() => {
                                    setPlanDataDetail(val);
                                    setDaysOfWeek(val.dayOfTheWeekList);
                                    setDropdownPlan(!dropdownPlan);
                                  }}
                                  href="#"
                                  className="text-gray-700 rounded-lg hover:bg-blue-400 hover:text-white hover:mx-3 block px-4 py-2 text-sm"
                                  role="menuitem"
                                  tabIndex="-1"
                                  id="menu-item-0"
                                >
                                  {val.name}
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        "YES"
                      )}
                    </div>

                    <div className="mx-3 flex flex-wrap w-96 gap-2 mt-3">
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder={
                            planDataDetail.code ? planDataDetail.code : "code"
                          }
                          name=""
                          disabled
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder={
                            planDataDetail.name ? planDataDetail.name : "Name"
                          }
                          name=""
                          disabled
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder={
                            planDataDetail.description
                              ? planDataDetail.description
                              : "Description"
                          }
                          name=""
                          disabled
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          placeholder={
                            planDataDetail.minimumOccupancy
                              ? planDataDetail.minimumOccupancy
                              : "Min Occupancy"
                          }
                          id=""
                          name=""
                          disabled
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder={
                            planDataDetail.maximumOccupancy
                              ? planDataDetail.maximumOccupancy
                              : "Max Occupancy"
                          }
                          name=""
                          disabled
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder={
                            planDataDetail.extraChargePerPerson
                              ? planDataDetail.extraChargePerPerson
                              : "Extra Charge Per Person"
                          }
                          name=""
                          disabled
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder={
                            planDataDetail.noOfChildren
                              ? planDataDetail.noOfChildren
                              : "No of Child"
                          }
                          name=""
                          disabled
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder={
                            planDataDetail.extraChargePerChild3To5yrs
                              ? planDataDetail.extraChargePerChild3To5yrs
                              : "Extra Charge Per Person (3-5 yrs)"
                          }
                          name=""
                          disabled
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 px-2 w-44 rounded-md"
                          type="text"
                          id=""
                          placeholder={
                            planDataDetail.extraChargePerChild
                              ? planDataDetail.extraChargePerChild
                              : "Extra Charge Per Child"
                          }
                          name=""
                          disabled
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
                      {daysOfWeek.map((val3, k) => {
                        return (
                          <>
                            {daysOfWeek ? (
                              <div key={k} className="w-40">
                                <input
                                  type="checkbox"
                                  name=""
                                  value=""
                                  className=""
                                  checked={val3 && "defaultChecked"}
                                ></input>
                                <span className="text-base ml-2 font-normal">
                                  {val3}
                                </span>
                              </div>
                            ) : (
                              <h4>DAYS OF WEEk</h4>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-3 ml-1 px-4 py-2">
                    <div
                      onClick={() => {
                        setRateShow(true);
                        setRestrictionShow(false);
                      }}
                      className="flex gap-1"
                    >
                      <input
                        checked={rateShow === true ? true : false}
                        type="radio"
                      />
                      <label>Rate</label>
                    </div>
                    <div
                      onClick={() => {
                        setRestrictionShow(true);
                        setRateShow(false);
                      }}
                      className="flex gap-1"
                    >
                      <input
                        checked={restrictionShow === true ? true : false}
                        type="radio"
                      />
                      <label>Restrictions</label>
                    </div>
                  </div>

                  {restrictionShow == true && (
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
                            value={planDataDetail.maximumLengthOfStay}
                          />
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
                            value={planDataDetail.minimumLengthOfStay}
                          />
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
                            {planDataDetail.status}
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
                            {planDataDetail.restriction}
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
                  )}

                  {rateShow == true && (
                    <div className="mx-6 flex flex-wrap gap-2 border-2 px-3 py-1 pb-2 rounded-lg mb-3">
                      <div>
                        <span>Currency</span>
                        <div>
                          <button
                            onClick={() => setCurrencyDropDown(true)}
                            type="button"
                            className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-xs font-base text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                            aria-expanded="true"
                            aria-haspopup="true"
                          >
                            {planDataDetail.currencyCode}
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

                        {currencyDropDown === true && (
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
                                  onClick={() => setCurrencyDropDown(!true)}
                                  href="#"
                                  className="text-gray-700 hover:bg-blue-400 hover:text-white hover:mx-3 block px-4 py-2 text-sm"
                                  role="menuitem"
                                  tabIndex="-1"
                                  id="menu-item-0"
                                >
                                  Plan
                                </a>
                                <a
                                  href="#"
                                  className="text-gray-700 hover:bg-blue-400 hover:text-white hover:mx-3 block px-4 py-2 text-sm"
                                  role="menuitem"
                                  tabIndex="-1"
                                  id="menu-item-0"
                                >
                                  Plan
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <span>Room Standard Price</span>
                        <div>
                          <input
                            type="number"
                            className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                            name="quantity"
                            min="1"
                            value={"2000"}
                            disabled
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
                            value={planDataDetail.deviationFromStandardPlan}
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
                            value={planDataDetail.amount}
                          ></input>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-700 text-white active:bg-emerald-600 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
