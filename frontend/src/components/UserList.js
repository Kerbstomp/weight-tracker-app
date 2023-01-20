import React from "react";
import { Image, List, Message } from "semantic-ui-react";

const UserList = ({ users, onSelection }) => {
  let renderUserList = () => {
    if (users.length > 0) {
      const items = users.map((u) => {
        return {
          key: u.id,
          header: u.name,
          image: (
            <Image avatar src={`https://picsum.photos/seed/${u.id}/200`} />
          ),
          onClick: (e) => onSelection(u.id),
        };
      });

      return <List selection animated size="big" items={items} />;
    } else {
      return (
        <div className="new-user-form">
          <Message
            warning
            header="There are no users, please create a user to continue"
          />
        </div>
      );
    }
  };

  return <div>{renderUserList()}</div>;
};

export default UserList;
