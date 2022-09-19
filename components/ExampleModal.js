import React from "react";
import { useState } from "react";
import "antd/dist/antd.css";
import moment from "moment";
import { DatePicker, Dropdown } from "antd";
import { RiCloseFill } from "react-icons/ri";

export default function AddOrUpdatePlan(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [currentDate, setCurrentdate] = useState("");
  const [seventhDayDate, setSeventhDayDate] = useState("");
  const [dropDownPlan, setDropDownPlan] = useState(false);
  const [statusDropDown, setStatusDropDown] = useState(false);
  const [currencyDropDown, setCurrencyDropDown] = useState(false);
  const [rateShow, setRateShow] = useState(true);
  const [restrictionShow, setRestrictionShow] = useState(false);

  // console.log(props.sevenDaysDataOfRoom[0]?.roomRatePlans);
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
                    <div onClick={() => setDropDownPlan(!dropDownPlan)}>
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

                    {dropDownPlan === true && (
                      <div
                        className="absolute left-0 z-10 mt-1 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex="-1"
                      >
                        <div>
                          <div
                            className="py-1"
                            role="none"
                            onClick={() => setDropDownPlan(!dropDownPlan)}
                          >
                            <span
                              className="text-gray-700 rounded-lg hover:bg-blue-400 hover:text-white hover:mx-3 block px-4 py-2 text-sm"
                              role="menuitem"
                              tabIndex="-1"
                              id="menu-item-0"
                            >
                              Name
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mx-3 flex flex-wrap w-96 gap-2 mt-3">
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder="Code"
                          name=""
                          disabled
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder="Name"
                          name=""
                          disabled
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder="Description"
                          name=""
                          disabled
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          placeholder="Min Occupancy"
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
                          placeholder="Max Occupancy"
                          name=""
                          disabled
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder="Extra Charge Per Person"
                          name=""
                          disabled
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder="No of Child"
                          name=""
                          disabled
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 w-44 px-2 rounded-md"
                          type="text"
                          id=""
                          placeholder="Extra Charge Per Person (3-5 yrs)"
                          name=""
                          disabled
                        />
                      </div>
                      <div className="">
                        <input
                          className="border-2 border-blue-100 px-2 w-44 rounded-md"
                          type="text"
                          id=""
                          placeholder="Extra Charge Per Child"
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
                    <div
                      className="flex gap-1"
                      onClick={() => {
                        setRateShow(true);
                        setRestrictionShow(false);
                      }}
                    >
                      <input
                        type="radio"
                        checked={rateShow === true && "checked"}
                      />
                      <label>Rate</label>
                    </div>
                    <div
                      className="flex gap-1"
                      onClick={() => {
                        setRestrictionShow(true);
                        setRateShow(false);
                      }}
                    >
                      <input
                        type="radio"
                        checked={restrictionShow === true && "checked"}
                      />
                      <label>Restrictions</label>
                    </div>
                  </div>
                  {restrictionShow === true && (
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
                            onClick={() => setStatusDropDown(!statusDropDown)}
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

                        <div
                          className="absolute right-30 z-10 mt-1 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="menu-button"
                          tabIndex="-1"
                        >
                          {statusDropDown === true && (
                            <div>
                              <div
                                className="py-1"
                                role="none"
                                onClick={() => setStatusDropDown(false)}
                              >
                                <span
                                  href="#"
                                  className="text-gray-700 hover:bg-blue-400 hover:text-white hover:mx-3 block px-4 py-2 text-sm"
                                  role="menuitem"
                                  tabIndex="-1"
                                  id="menu-item-0"
                                >
                                  YES
                                </span>
                              </div>
                            </div>
                          )}
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
                  )}

                  {rateShow === true && (
                    <div className="mx-6 flex flex-wrap gap-2 border-2 px-3 py-1 pb-2 rounded-lg mb-3">
                      <div>
                        <span>Currency</span>
                        <div>
                          <button
                            type="button"
                            className="inline-flex w-40 justify-between rounded-md border border-gray-300 bg-white px-2 py-2 text-xs font-base text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                            aria-expanded="true"
                            aria-haspopup="true"
                            onClick={() =>
                              setCurrencyDropDown(!currencyDropDown)
                            }
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
                          {currencyDropDown === true && (
                            <div>
                              <div
                                className="py-1"
                                role="none"
                                onClick={() => setCurrencyDropDown(false)}
                              >
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
                          )}
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
                  )}
                </div>
                {/* {/footer/} */}
                <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                    }}
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
