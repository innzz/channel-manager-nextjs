export const UpdateRatesAndAvailablity = async(data,token)=>{
    let updateRatesAndAvailablityRes = await fetch(
        `https://api.bookonelocal.in/api-bookone/api/availability/updateAvailability`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            APP_ID: "BOOKONE_WEB_APP",
          },
          body: JSON.stringify(data),
        }
      );
     let updateRatesAndAvailablityResponse = updateRatesAndAvailablityRes.json();
      return updateRatesAndAvailablityResponse
}