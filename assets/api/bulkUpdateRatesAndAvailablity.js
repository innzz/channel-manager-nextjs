export const bulkUpdateRatesAndAvailablity = async(data,token)=>{
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
      return updatedResponse;
}