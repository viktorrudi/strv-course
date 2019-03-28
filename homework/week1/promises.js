"use strict";
const request = require("request-promise");

let SWAPILookup = (url) => {
  return new Promise((resolve, reject) => {
    resolve(request(url))
  })
}

// Or create promise with async:
// let SWAPILookup = async (url) => request(url);

SWAPILookup("https://swapi.co/api/people/1")
  .then(data => {
    let person = JSON.parse(data)
    console.log(`${person.name} owns these rides:`)
    return person
  })
  .then(selectedPerson => {
    let personsVehicles = selectedPerson.vehicles
    if (personsVehicles.length > 0) {
      personsVehicles.map(vehicle => {
        SWAPILookup(vehicle).then(foundVehicles => {
          let foundVehicle = JSON.parse(foundVehicles)
          console.log(foundVehicle.name)
        });
      });
    } else {
      console.log(`None 😞`)
    }
  })
  .catch(err => {
   console.error(Error(err))
  })