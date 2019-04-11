"use strict";
const request = require("request-promise");

async function findVehicles() {

  try {

    const personRequestComplete = await request({
      url: 'https://swapi.co/api/people/1',
      json: true
    });

    if (personRequestComplete) {
      const person = personRequestComplete;
      console.log(`${person.name} owns these rides:`)

      const personsVehicles = person.vehicles
      const vehicles = personsVehicles.map(vehicle => {
        return request({
          url: vehicle,
          json: true
        })
      })

      const allVehiclesComplete = await Promise.all(vehicles)

      if (allVehiclesComplete) {
        allVehiclesComplete.map(vehicle => {
          console.log(vehicle.name)
        })
      }
    }

  } catch (err) {
    console.error(Error(`Something bad happened: ${err}`))
  }
}

findVehicles();
