export const PropertyData = async(propertyId)=>{
    let propertyDataReq = await fetch(
        `https://api.bookonelocal.in/channel-integration/api/channelManager/property/${propertyId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenRes}`,
            "Content-Type": "application/json",
            APP_ID: "BOOKONE_WEB_APP",
          },
        }
      );
    let propertyDataRes = propertyDataReq.json();
    let propertyDataResponse = propertyDataRes;
    return propertyDataResponse;

}