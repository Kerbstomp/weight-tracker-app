import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input } from "semantic-ui-react";
import UserList from "./UserList";
import Cookies from "js-cookie";

const UserSelector = ({ userSelected }) => {
  const [users, setUsers] = useState([]);
  const [userListModalOpen, setUserListModalOpen] = useState(true);
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    getUserList();
  }, []);

  let getUserList = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/users/");
    let userList = await response.json();
    setUsers(userList);
  };

  let handleChange = (event) => {
    event.preventDefault();
    setNewUserName(event.target.value);
  };

  let onSelection = (userId) => {
    userSelected(userId);
  };

  let renderUserList = () => {
    return <UserList users={users} onSelection={onSelection} />;
  };

  let createNewUser = async () => {
    const csrfToken = Cookies.get("csrftoken");

    await fetch("http://127.0.0.1:8000/api/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFTOKEN": csrfToken,
      },
      body: JSON.stringify(newUserName),
    });
    setCreateUserModalOpen(false);
    await getUserList();
  };

  return (
    <>
      <Modal
        closeOnDimmerClick={false}
        closeOnEscape={false}
        onClose={() => setUserListModalOpen(false)}
        onOpen={() => setUserListModalOpen(true)}
        open={userListModalOpen}
      >
        <Modal.Header>Select a User</Modal.Header>
        {renderUserList()}
        <Modal.Actions>
          <Button positive onClick={() => setCreateUserModalOpen(true)}>
            Create New User
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal
        onClose={() => setCreateUserModalOpen(false)}
        onOpen={() => setCreateUserModalOpen(true)}
        open={createUserModalOpen}
      >
        <Modal.Header>Create a New User</Modal.Header>
        <Form className="new-user-form">
          <Form.Field>
            <Input
              label="Username"
              labelPosition="left"
              onChange={(event) => handleChange(event)}
              icon="users"
            />
          </Form.Field>
        </Form>
        <Modal.Actions>
          <Button positive onClick={createNewUser}>
            Create User
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default UserSelector;
