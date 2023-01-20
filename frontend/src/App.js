import "./App.css";
import React, { useState } from "react";
import Layout from "./components/Layout";
import WeightLogger from "./components/WeightLogger";
import UserSelector from "./components/UserSelector";

/**
 * POTENTIAL FUTURE IMPROVEMENTS:
 *  1. Fix callback so UserList does not re-render needlessly
 *  2. Style this shit
 *  3. Ability to delete a user
 *  4. Ability to select a date when logging new weight
 *  5. Ability to go back to user selection
 *  6. Ability to delete a logged weight
 */

function App() {
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);

  let userSelected = (userId) => {
    setSelectedUserId(userId);
    setIsUserSelected(true);
  };

  return (
    <div className="App">
      <Layout>
        {isUserSelected === false ? (
          <UserSelector userSelected={userSelected} />
        ) : (
          <WeightLogger userId={selectedUserId} />
        )}
      </Layout>
    </div>
  );
}

export default App;
