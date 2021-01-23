import { DropdownButton, Table, FormCheck, Button } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import React, { useState, useEffect } from "react";

function AdminWeb() {
  const [selectedUser, setSelectedUser] = useState("Select User");
  const [usersList, setUsersList] = useState([]);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
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
      body: ["WebAdmin"],
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
      <h1>Admin Web</h1>
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
            <th>Permission</th>
            <th>Enabled</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Role Administration</td>
            <FormCheck
              checked={userRoles.includes("RoleAdmin") ? true : false}
              onChange={() => selectRole("RoleAdmin")}
            />
          </tr>
          <tr>
            <td>Web Administration</td>
            <FormCheck
              checked={userRoles.includes("WebAdmin") ? true : false}
              onChange={() => selectRole("WebAdmin")}
            />
          </tr>
        </tbody>
      </Table>
      <Button onclick={() => doApiCallUpdate()}>Submit</Button>
    </div>
  );
}

export default AdminWeb;
