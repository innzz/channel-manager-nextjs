
export const DataByDates = async (body,token)=>{
    let datePickerDataRes = await fetch(
        `https://api.bookonelocal.in/api-bookone/api/availability/getRatesAndAvailabilityForRoomByDate`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            APP_ID: "BOOKONE_WEB_APP",
          },
          body: JSON.stringify(body),
        }
      );
      let datePickerDataResponse = await datePickerDataRes.json();
      let datePickerDataResponseJson = datePickerDataResponse;
      return datePickerDataResponseJson
}