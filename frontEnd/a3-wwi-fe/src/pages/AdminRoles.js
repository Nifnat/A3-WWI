import { DropdownButton, Table, FormCheck, Button } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import React, { useState, useEffect } from "react";

function AdminRoles() {
  const [selectedUser, setSelectedUser] = useState("Select User");
  const [usersList, setUsersList] = useState([]);
  const [userRoles, setUserRoles] = useState([]);

  const armaRoles = require("../common/roles.json");

  useEffect(() => {
    console.log(armaRoles);
    let apiResponse = doApiCall();
    if (apiResponse.statusCode === 200) {
      setUsersList(apiResponse.body);
    } else {
      setUsersList([]);
    }
  }, []);

  function doApiCall() {
    return {
      statusCode: 200,
      body: [
        { name: "Jeff", steamID: "01234456789" },
        { name: "Lilly", steamID: "09876543210" },
      ],
    };
  }

  function doApiCallRoles(user) {
    return {
      statusCode: 200,
      body: ["SR_1", "SR_2", "CO_1", "air_1", "CM"],
    };
  }

  function doApiCallUpdate() {
    return {
      statusCode: 200,
      body: "Success",
    };
  }

  function selectUser(user) {
    if (user.name === selectedUser) {
      setSelectedUser("Select User");
      setUserRoles([]);
    } else {
      setSelectedUser(user.name);
      setUserRoles(doApiCallRoles(user.steamID));
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
