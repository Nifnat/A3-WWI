import { DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import React, { useState, useEffect } from "react";

function AdminRoles() {
  const [selectedUser, setSelectedUser] = useState("Select User");
  const [usersList, setUsersList] = useState([]);

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

  function selectUser(user) {
    if (user.name === selectedUser) {
      setSelectedUser("Select User");
    } else {
      setSelectedUser(user.name);
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
    </div>
  );
}

export default AdminRoles;
