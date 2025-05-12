import dayjs from 'dayjs';

export const parseFlightString = flightString => {
  const flightRegex =
    /([A-Za-z\s]+)\(([A-Z]+)\)-([A-Za-z\s]+)\(([A-Z]+)\)\s+([A-Za-z\s]+)\s+([A-Z0-9]+)\s+(\d{2}\.\d{2}\.\d{4})\s+(\d{2}:\d{2})\s+(\d{2}:\d{2})\s+([A-Za-z\s]+)/;

  const match = flightString.match(flightRegex);

  if (match) {
    const formattedDate = dayjs(match[7], 'DD.MM.YYYY')
      .locale('nl')
      .format('DD MMMM YYYY');

    return {
      from: `${match[1].trim()} (${match[2]})`,
      to: `${match[3].trim()} (${match[4]})`,
      airline: match[5].trim(),
      flightNumber: match[6].trim(),
      date: formattedDate, // Dutch formatted date
      takeOffTime: match[8],
      landingTime: match[9],
      class: match[10].trim()
    };
  }

  return null;
};

export const parseFlightData = flightData => {
  if (!flightData || typeof flightData !== 'string') {
    return null;
  }

  const flightRegex =
    /([A-Za-z\s]+)\((\w+)\)-([A-Za-z\s]+)\((\w+)\)\s+([A-Za-z\s]+)\s+([A-Za-z0-9]+)\s+(\d{2}\.\d{2}\.\d{4})\s+(\d{2}:\d{2})\s+(\d{2}:\d{2})\s+([A-Za-z\s]+)/;
  const match = flightData.match(flightRegex);

  if (!match) {
    return null; // Return null if it doesn't match
  }

  const [
    ,
    departureCity,
    departureCode,
    arrivalCity,
    arrivalCode,
    flightName,
    flightNumber,
    departureDate,
    departureTime,
    arrivalTime,
    flightClass
  ] = match;

  const formattedDepartureDate = new Date(
    departureDate.split('.').reverse().join('-')
  ).toLocaleDateString('nl-NL', {
    day: '2-digit',
    month: 'long', // Change to 'short' for "mrt" instead of "maart"
    year: 'numeric'
  });

  return {
    departureCity: `${departureCity.trim()} (${departureCode})`,
    arrivalCity: `${arrivalCity.trim()} (${arrivalCode})`,
    flightName: flightName.trim(),
    flightNumber: flightNumber.trim(),
    departureDate: formattedDepartureDate, // Dutch formatted date
    departureTime: departureTime.trim(),
    arrivalTime: arrivalTime.trim(),
    class: flightClass.trim(),
    cityDepCode: departureCode,
    cityArrCode: arrivalCode
  };
};
