"use strict";
const request = require("request-promise");

function findVehicles() {

  // Const to make Michal happy :D
  const personRequest = request({
    url: 'https://swapi.co/api/people/1',
    json: true
  });

  return personRequest.then(person => {

    // Write name of the person to the console
    //console.log(`${person.name} owns these rides:`)

    const personsVehicles = person.vehicles
    if (personsVehicles.length > 0) {
      // If any vehicles found
      const vehicles = personsVehicles.map(vehicle => {
        // Push all vehicle requests into array for Promise.all
        return request({
          url: vehicle,
          json: true
        })
      })
      // Make promises from each URL from the array
      console.log(2);
      return Promise.all(vehicles)
        .then(values => {
          values.map(value => {
            // Write the names of each vehicle in the console
            console.log(3);
            //console.log(value.name)
          })
        })
        console.log(4);
    } else {
      // If no vehicles found
      console.log(`None :(`)
    }
  })
  .catch(err => {
    console.error(Error(`Something bad happened: ${err}`))
  })
  console.log(5);
}

findVehicles();