import { DropdownButton, Table } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import React, { useState, useEffect } from "react";

function Home() {
  const [selectedUser, setSelectedUser] = useState("Select User");
  const [usersList, setUsersList] = useState([]);
  const [roles, setRoles] = useState([]);
  let steamID = "";

  useEffect(() => {
    setRoles([]);
    async function getRolesByID() {
      await fetch("http://localhost:8000/role/" + steamID)
        .then((response) => response.json())
        .then((jsonData) => {
          console.log(jsonData);
          setRoles(
            jsonData["role"]["Game_Role"].replaceAll('"', "").split(",")
          );
        });
    }
    if (steamID !== "") {
      getRolesByID();
    }

    setUsersList([]);
    async function getUsers() {
      await fetch("http://localhost:8000/users")
        .then((response) => response.json())
        .then((jsonData) => {
          let steam_ID_arr = [];
          for (let i = 0; i < jsonData["Steam_IDs"].length; i++) {
            // If you want name + steam ID then you need to add name to db or use ID to get name
            steam_ID_arr.push({
              name: jsonData["Steam_IDs"][i]["Steam_ID"].toString(),
              steam_ID: jsonData["Steam_IDs"][i]["Steam_ID"].toString(),
            });
          }
          setUsersList(steam_ID_arr);
        });
    }
    getUsers();
  }, [steamID]);

  function getName(role) {
    var roleSplit = role.split("_");
    if (roleSplit.length > 1) {
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
        case "AIR":
          return `Pilot ${roleSplit[1]}`;
        case "COP":
          return `Co-pilot ${roleSplit[1]}`;
        default:
          return "Unkown";
      }
    } else {
      switch (role) {
        case "CO":
          return "Commander";
        case "RTO":
          return "???";
        case "JFO":
          return "???";
        case "CM":
          return "Combat Medic";
        case "EXA":
          return "Extended Arsenal";
        default:
          return "Unkown";
      }
    }
  }

  function selectUser(user) {
    if (user.name === selectedUser) {
      setSelectedUser("Select User");
      steamID = "";
      setRoles([]);
    } else {
      setSelectedUser(user.name);
      steamID = user.steam_ID;
      setRoles([]);
      async function getRolesByID() {
        await fetch("http://localhost:8000/role/" + steamID)
          .then((response) => response.json())
          .then((jsonData) => {
            setRoles(
              jsonData["role"]["Game_Role"].replaceAll('"', "").split(",")
            );
          });
      }
      if (steamID !== "") {
        getRolesByID();
      }
    }
  }

  return (
    <div>
      <h1>Your Roles</h1>
      <DropdownButton title={selectedUser}>
        {usersList.map((user) => {
          return (
            <DropdownItem onClick={() => selectUser(user)}>
              {user.name}
            </DropdownItem>
          );
        })}
      </DropdownButton>
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
