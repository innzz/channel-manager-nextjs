export const getPropertyIdAPI = (testCrs) =>
  `https://api.bookonelocal.in/channel-integration/api/channelManager/property/${testCrs}`;

export const getPropertyIdAndRoomIdAPI = (testCrs, roomIdWithSevenDaysData) =>
  `https://api.bookonelocal.in/api-bookone/api/availability/getNext7daysRatesAndAvailabilityForRoom?PropertyId=${testCrs}&RoomId=${roomIdWithSevenDaysData}`;
