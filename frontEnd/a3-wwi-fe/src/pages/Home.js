import { Table } from "react-bootstrap";
import React, { useState, useEffect } from "react";

function Home() {
  const [roles, setRoles] = useState([]);
  let steamID = "12345678";

  useEffect(() => {
    setRoles([]);
    async function getRolesByID() {
      await fetch("http://localhost:8000/role/" + steamID)
        .then(response => response.json())
        .then((jsonData) => {
          setRoles(jsonData['role']['Game_Role'].replaceAll('"', '').split(','));
        });
    }

    getRolesByID();
  }, [steamID]);

  function getName(role) {
    var roleSplit = role.split('_');
    if (roleSplit.length > 1){
      switch (roleSplit[0]) {
        case "SR":
          return `Sniper ${roleSplit[1]}`;
        case "SF":
          return `Operator ${roleSplit[1]}`;
        case "CO":
          return `Armour Commander ${roleSplit[1]}`;
        case "GN":
          return `Armour Gunner ${roleSplit[1]}`;
        case "DR":
          return `Armour Driver ${roleSplit[1]}`;
        case "LO":
          return `Armour Loader ${roleSplit[1]}`;
        case "air":
          return `Pilot ${roleSplit[1]}`;
        case "cop":
          return `Co-pilot ${roleSplit[1]}`;
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
                <td>{getName(role)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Home;
