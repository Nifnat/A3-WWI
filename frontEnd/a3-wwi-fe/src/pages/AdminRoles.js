import { DropdownButton, Table, FormCheck, Button } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import React, { useState, useEffect } from "react";

function AdminRoles() {
  const [selectedUser, setSelectedUser] = useState("Select User");
  const [usersList, setUsersList] = useState([]);
  const [userRoles, setUserRoles] = useState([]);

  const armaRoles = require("../common/roles.json");

  useEffect(() => {
    setUsersList([]);
    async function getUsers() {
      await fetch("http://localhost:8000/users")
        .then(response => response.json())
        .then((jsonData) => {
          let steam_ID_arr = [];
          for(let i = 0; i < jsonData['Steam_IDs'].length; i++) {
            // If you want name + steam ID then you need to add name to db or use ID to get name
            steam_ID_arr.push({
              name: jsonData['Steam_IDs'][i]['Steam_ID'].toString(),
              steam_ID: jsonData['Steam_IDs'][i]['Steam_ID'].toString()
            });
          }
          setUsersList(steam_ID_arr);
        });
    }

    getUsers();
  }, []);

  function doApiCallUpdate() {
    return {
      statusCode: 200,
      body: "Success",
    };
  }
  //temp measure, should not be setting directly via body, but as a POC setting is done by body, no error handling is present.
  function selectUser(user) {
    if (user.name === selectedUser) {
      setSelectedUser("Select User");
      setUserRoles([]);
    } else {
      async function getRolesByID(steam_ID) {
        await fetch("http://localhost:8000/role/" + steam_ID)
          .then(response => response.json())
          .then((jsonData) => {
            setUserRoles(jsonData['role']['Game_Role'].replaceAll('"', '').split(','));
          });
      }
      setSelectedUser(user.name);
      getRolesByID(user.steam_ID)
    }
  }

  function selectRole(role) {
    if (userRoles.includes(role)) {
      setUserRoles(userRoles.filter((i) => i !== role));
    } else {
      console.log("Miss");
      setUserRoles([...userRoles, role]);
    }
  }

  return (
    <div>
      <h1>Admin Roles</h1>
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
            <th>Selected</th>
          </tr>
        </thead>
        <tbody>
          {armaRoles.map((role) => {
            return (
              <tr>
                <td>{role.abbreviation}</td>
                <td>{role.Name}</td>
                <FormCheck
                  id={role.abbreviation + "Checkbox"}
                  checked={userRoles.includes(role.abbreviation) ? true : false}
                  onChange={() => selectRole(role.abbreviation)}
                />
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button onclick={() => doApiCallUpdate()}>Submit</Button>
    </div>
  );
}

export default AdminRoles;
