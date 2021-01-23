import { Table } from "react-bootstrap";
import React, { useState, useEffect } from "react";

function Home() {
  const [roles, setRoles] = useState([]);
  let steamID = "Jeff";

  useEffect(() => {
    let apiResponse = doApiCall();
    if (apiResponse.statusCode === 200) {
      setRoles(apiResponse.body);
    } else {
      setRoles([]);
    }
  }, []);

  function doApiCall() {
    return { statusCode: 200, body: ["SR_1", "SR_2", "SF_1", "SF_2", "co"] };
  }

  //Probably a better way to designate the duplicate roles
  function getName(role) {
    switch (role) {
      case "co":
        return "Commander";
      case "rto":
        return "???";
      case "JFO":
        return "???";
      case "CM":
        return "Combat Medic";
      case "SR_1":
        return "Sniper (1)";
      case "SR_2":
        return "Sniper (2)";
      case "SF_1":
        return "Operator (1)";
      case "SF_2":
        return "Operator (2)";
      case "SF_3":
        return "Operator (3)";
      case "SF_4":
        return "Operator (4)";
      case "CO_1":
        return "Armour Commander (1)";
      case "GN_1":
        return "Armour Gunner (1)";
      case "DR_1":
        return "Armour Driver (1)";
      case "LO_1":
        return "Armour Loader (1)";
      case "CO_2":
        return "Armour Commander (2)";
      case "GN_2":
        return "Armour Gunner (2)";
      case "DR_2":
        return "Armour Driver (2)";
      case "LO_2":
        return "Armour Loader (2)";
      case "air_1":
        return "Pilot (1)";
      case "Air_2":
        return "Pilot (2)";
      case "Air_3":
        return "Pilot (3)";
      case "cop_1":
        return "Co-pilot (1)";
      case "Cop_2":
        return "Co-pilot (2)";
      case "Cop_3":
        return "Co-pilot (3)";
      default:
        return "Unkown";
    }
  }

  function getName2(role) {
    var MyArray = role.split('_');
    if (MyArray.length >1){
      switch (MyArray[0]) {
        case "SR":
          return `Sniper ${MyArray[1]}`;
        case "SF":
          return `Operator ${MyArray[1]}`;
        case "CO":
          return `Armour Commander ${MyArray[1]}`;
        case "GN":
          return `Armour Gunner ${MyArray[1]}`;
        case "DR":
          return `Armour Driver ${MyArray[1]}`;
        case "LO":
          return `Armour Loader ${MyArray[1]}`;
        case "air":
          return `Pilot ${MyArray[1]}`;
        case "cop":
          return `Co-pilot ${MyArray[1]}`;
        default:
          return "Unkown";
      }
    }else {
      switch (role) {
        case "co":
          return "Commander";
        case "rto":
          return "???";
        case "JFO":
          return "???";
        case "CM":
          return "Combat Medic";
        default:
          return "Unkown";
      }
    }
  }

  return (
    <div>
      <h1>Your Roles</h1>
      <h2>SteamID: {steamID}</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Abreviation</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => {
            return (
              <tr>
                <td>{role}</td>
                <td>{getName2(role)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Home;
