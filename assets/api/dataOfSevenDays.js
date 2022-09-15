export const DataOfSevenDays = async(propertyId,roomId,token)=>{
    let res = await fetch(
        `https://api.bookonelocal.in/api-bookone/api/availability/getNext7daysRatesAndAvailabilityForRoom?PropertyId=${propertyId}&RoomId=${roomId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            APP_ID: "BOOKONE_WEB_APP",
          },
        }
      );
      let resJson = await res.json();
      let resJsonResponse = resJson
      return resJsonResponse
}