import  { useState } from "react";

const App = () => {
  const [nameInput, setNameInput] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const sendRequest = async () => {
    try {
      const response = await fetch("http://localhost:3000/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nameInput }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.table(data);
      setResponseMessage(JSON.stringify(data.rows[0][1])+JSON.stringify(data.rows[0][2]));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Enter Your Name:</h1>
      <input
        type="text"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <button onClick={sendRequest}>Submit</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default App;