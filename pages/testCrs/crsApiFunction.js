import axios from "axios";
import { getPropertyIdAPI, getPropertyIdAndRoomIdAPI } from "./crsApi";

export const getPropertyAPIFunc = async (testCrs, tokenRes) => {
  const res = await axios.get(`${getPropertyIdAPI(testCrs)}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${tokenRes}`,
      "Content-Type": "application/json",
      APP_ID: "BOOKONE_WEB_APP",
    },
  });
  const { data } = await res;
  return data;
};

export const getSevenDaysDataOfRoomFunc = async (
  testCrs,
  roomIdWithSevenDaysData,
  tokenRes
) => {
  const res = await axios.get(
    `${getPropertyIdAndRoomIdAPI(testCrs, roomIdWithSevenDaysData)}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokenRes}`,
        "Content-Type": "application/json",
        APP_ID: "BOOKONE_WEB_APP",
      },
    }
  );
  const { data } = await res;
  return data;
};
