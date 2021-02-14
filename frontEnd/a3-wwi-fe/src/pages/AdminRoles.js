import {
  DropdownButton,
  Table,
  FormCheck,
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import React, { useState, useEffect } from "react";

function AdminRoles() {
  const [selectedUser, setSelectedUser] = useState("Select User");
  const [usersList, setUsersList] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [newUserSteamID, setNewUserSteamID] = useState("");

  const armaRoles = require("../common/roles.json");

  useEffect(() => {
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
  }, []);

  function updateUsersRoles() {
    const steam_ID = selectedUser;
    let roles = userRoles;

    roles = roles.length ? '"' + roles.join('","') + '"' : "";
    console.log(roles);

    fetch("http://localhost:8000/role", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SteamID: steam_ID,
        GameRole: roles,
      }),
    });
  }

  //temp measure, should not be setting directly via body, but as a POC setting is done by body, no error handling is present.
  function selectUser(user) {
    if (user.name === selectedUser) {
      setSelectedUser("Select User");
      setUserRoles([]);
    } else {
      setSelectedUser(user.name);
      async function getRolesByID() {
        await fetch("http://localhost:8000/role/" + selectedUser)
          .then((response) => response.json())
          .then((jsonData) => {
            console.log(jsonData);
            if (jsonData["role"]["Game_Role"] != null) {
              setUserRoles(
                jsonData["role"]["Game_Role"].replaceAll('"', "").split(",")
              );
            } else {
              setUserRoles([]);
            }
          });
      }
      getRolesByID(user.steam_ID);
    }
  }

  function selectRole(role) {
    if (userRoles.includes(role)) {
      setUserRoles(userRoles.filter((i) => i !== role));
    } else {
      setUserRoles([...userRoles, role]);
    }
  }

  async function submitNewUser() {
    console.log(newUserSteamID);
    let dbresponse = await fetch("http://localhost:8000/role", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SteamID: newUserSteamID,
      }),
    });

    console.log(dbresponse);
    if (dbresponse.status === 200) {
      setNewUserSteamID("");
    } else {
      setNewUserSteamID("Error");
    }
  }

  async function deleteUser() {
    console.log(newUserSteamID);
    let dbresponse = await fetch("http://localhost:8000/role", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SteamID: newUserSteamID,
      }),
    });

    console.log(dbresponse);
    if (dbresponse.status === 200) {
      setNewUserSteamID("");
    } else {
      setNewUserSteamID("Error");
    }
  }

  return (
    <div>
      <h1>Admin Roles</h1>
      <div>
        <h2>Add/Remove user from the database</h2>
        <Form>
          <FormGroup>
            <FormLabel>SteamID</FormLabel>
            <FormControl
              as="input"
              placeholder="Enter SteamID64"
              onChange={(e) => setNewUserSteamID(e.target.value)}
              value={newUserSteamID}
            ></FormControl>
          </FormGroup>
          <Button
            onClick={() => {
              submitNewUser();
            }}
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              deleteUser();
            }}
          >
            Delete
          </Button>
        </Form>
      </div>

      <h2>Change User Roles</h2>
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
      <Button onClick={() => updateUsersRoles()}>Submit</Button>
    </div>
  );
}

export default AdminRoles;
