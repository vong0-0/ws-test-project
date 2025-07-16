# Module E - Mobile Web Service

## Competitor information

- Name: Vongsouvan Chanthasone
- Nationality: Laos
- Seat Number: 01

## About this module

In this module, competitor will create a mobile website that provide essential Lyon services data.The website queries the dynamic data via a mock API server. The website will provide the following essential Lyon services data: Carkparks, Events, and Weather.

## Note for Judges

If the browser does not support getting the current location, or if the user denies location permission, please note that we have already prepared the source code for you to manually set the location.

Please go to:

```base
src/services/api.js
```

Inside the `getCarpark` function, you will see these variables:

```JavaScript
const currentLocation = await getCurrentLocation() // <== remove this function;
const userLatitude = currentLocation.latitude; // <=== you can manually set
const userLongitude = currentLocation.longitude; // <=== you can manually set
```

You can replace these default values (`currentLocation.latitude` for latitude and `currentLocation.longitude` for longitude) with any coodinates you prefer for testing purpose
