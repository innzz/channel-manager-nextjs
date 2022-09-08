import React from "react";
import { useEffect } from "react";

const MMT = () => {
  useEffect(() => {
    let data = {
      count: "1",
      channelManagerUpdateType: "Plan_Update",
      lastRetrivedTimeStamp: "2022-09-05 14:54:21.0",
      propertyDetails: [
        {
          bookoneId: "1000103589",
          name: "Hotel Icon",
          totalNoOfRooms: "0",
          noOfAvailable: "12",
          noOfBooked: "0",
          date: "null",
          roomTypeDetails: [
            {
              bookoneId: "45000309195",
              name: "Deluxe Room",
              minLengthOfStay: "0",
              maxLengthOfStay: "0",
              roomPlanDetails: [
                {
                  code: "990001677793",
                  name: " DLX MAP",
                  effectiveDate: "2022-11-02",
                  expiryDate: "2022-11-15",
                  description: "Best Available Rate",
                  amount: "650",
                  currency: "INR",
                  status: "Open",
                  restriction: "",
                  minimumOccupancy: "0",
                  maximumOccupancy: "2",
                  minAdvancedBookingOffset: "",
                  maxAdvancedBookingOffset: "",
                  extraChargePerChild3To5yr: "",
                  extraChargePerPerson: "150",
                  extraChargePerChild: "125",
                  minimumLengthOfStay: "1",
                  maximumLengthOfStay: "550",
                  dayOfTheWeekList: [],
                },
                {
                  code: "990001677795",
                  name: "SUT AP",
                  effectiveDate: "2022-11-15",
                  expiryDate: "2022-11-29",
                  description: "Best Available Rate",
                  amount: "675",
                  currency: "INR",
                  status: "Open",
                  restriction: "",
                  minimumOccupancy: "0",
                  maximumOccupancy: "4",
                  minAdvancedBookingOffset: "",
                  maxAdvancedBookingOffset: "",
                  extraChargePerChild3To5yr: "",
                  extraChargePerPerson: "125",
                  extraChargePerChild: "110",
                  minimumLengthOfStay: "1",
                  maximumLengthOfStay: "550",
                  dayOfTheWeekList: [],
                },
              ],
              availabilities: [
                {
                  startDate: "2022-11-15",
                  endDate: "2022-11-29",
                  noOfAvailable: "11",
                  status: "Open",
                  restriction: "",
                },
              ],
            },
          ],
        },
      ],
    };
    fetch(
      "https://testapi.bookonelocal.co.nz/api-mmt-goibibo/api/mmt/invokeMmtARI",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
          "channel-token": "9h7td8zz9o",
          "bearer-token": "0e092c03ef",
        },
        // Authorization: " bearer-token : 0e092c03ef",
        body: JSON.stringify(data),
      }
    )
      .then((res) => res)
      .then((resJson) => {
        console.log(resJson.status);
      });
  }, []);
  return (
    <div>
      <h1>MMT POST Request</h1>
      <div className="firstContainer">
        <input type="text" name="name" />
      </div>
    </div>
  );
};

export default MMT;
