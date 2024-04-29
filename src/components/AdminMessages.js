import React, { useState, useEffect } from "react";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = () => {
    fetch("https://mb-be-norbert.onrender.com/messages", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.messages);
      })
      .catch((error) => console.error("Error:", error));
  };

  const deleteMessage = (messageId) => {
    fetch(`https://mb-be-norbert.onrender.com/messages/${messageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.message === "Message removed successfully") {
          fetchMessages();
        } else {
          console.error("Error:", data.error);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <section id="messages">
      <div className="title1">
        <h2 className="h2">Messages from users</h2>

        {messages.length > 0 ? (
          <svg id="notificationsOn" width="23"
          height="23"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.58333 12.9165C2.58333 10.7637 3.06232 8.78852 4.02031 6.99095C4.97829 5.19338 6.26458 3.70258 7.87916 2.51855L9.39687 4.58522C8.1052 5.53244 7.07725 6.72724 6.31302 8.1696C5.54878 9.61196 5.16666 11.1942 5.16666 12.9165H2.58333ZM25.8333 12.9165C25.8333 11.1942 25.4512 9.61196 24.687 8.1696C23.9227 6.72724 22.8948 5.53244 21.6031 4.58522L23.1208 2.51855C24.7354 3.70258 26.0217 5.19338 26.9797 6.99095C27.9377 8.78852 28.4167 10.7637 28.4167 12.9165H25.8333ZM5.16666 24.5415V21.9581H7.75V12.9165C7.75 11.1297 8.28819 9.54199 9.36458 8.15345C10.441 6.76491 11.8403 5.85536 13.5625 5.4248V4.52064C13.5625 3.98244 13.7509 3.52498 14.1276 3.14824C14.5043 2.77151 14.9618 2.58314 15.5 2.58314C16.0382 2.58314 16.4957 2.77151 16.8724 3.14824C17.2491 3.52498 17.4375 3.98244 17.4375 4.52064V5.4248C19.1597 5.85536 20.559 6.76491 21.6354 8.15345C22.7118 9.54199 23.25 11.1297 23.25 12.9165V21.9581H25.8333V24.5415H5.16666ZM15.5 28.4165C14.7896 28.4165 14.1814 28.1635 13.6755 27.6576C13.1696 27.1517 12.9167 26.5436 12.9167 25.8331H18.0833C18.0833 26.5436 17.8304 27.1517 17.3245 27.6576C16.8186 28.1635 16.2104 28.4165 15.5 28.4165ZM10.3333 21.9581H20.6667V12.9165C20.6667 11.4956 20.1608 10.2793 19.149 9.26751C18.1371 8.25571 16.9208 7.7498 15.5 7.7498C14.0792 7.7498 12.8628 8.25571 11.851 9.26751C10.8392 10.2793 10.3333 11.4956 10.3333 12.9165V21.9581Z"
            fill="#FCA311"
          />
        </svg>
        ) : (
          <svg id="notificationsOff" width="19"
          height="20"
          viewBox="0 0 19 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 17V15H2.375V8C2.375 6.61667 2.86979 5.3875 3.85938 4.3125C4.84896 3.2375 6.13542 2.53333 7.71875 2.2V1.5C7.71875 1.08333 7.89193 0.729167 8.23828 0.4375C8.58464 0.145833 9.00521 0 9.5 0C9.99479 0 10.4154 0.145833 10.7617 0.4375C11.1081 0.729167 11.2812 1.08333 11.2812 1.5V2.2C12.8646 2.53333 14.151 3.2375 15.1406 4.3125C16.1302 5.3875 16.625 6.61667 16.625 8V15H19V17H0ZM9.5 20C8.84687 20 8.28776 19.8042 7.82266 19.4125C7.35755 19.0208 7.125 18.55 7.125 18H11.875C11.875 18.55 11.6424 19.0208 11.1773 19.4125C10.7122 19.8042 10.1531 20 9.5 20ZM4.75 15H14.25V8C14.25 6.9 13.7849 5.95833 12.8547 5.175C11.9245 4.39167 10.8063 4 9.5 4C8.19375 4 7.07552 4.39167 6.14531 5.175C5.2151 5.95833 4.75 6.9 4.75 8V15Z"
            fill="#DCC9AA"
          />
        </svg>
        )}

      </div>
      <div className="contents" id="messages-container">
  {messages.length > 0 ? (
    messages.map((message) => (
      <div key={message._id}>
        <h3>{message.name}</h3>
        <p>{message.message}</p>
        <button
          style={{
            color: "#fca311",
            background: "#0e0e0e",
            padding: "5px 40px",
            borderStyle: "none",
            borderRadius: "50px",
            border: "1px solid #fca311",
            marginBottom: "30px",
          }}
          className="delete"
          onClick={() => deleteMessage(message._id)}
        >
          Delete
        </button>
      </div>
    ))
  ) : (
    <h1 style={{ color: "#fca311", fontSize: "2em" }}>
      ! Oops your inbox is empty
    </h1>
  )}
</div>
</section>
);
};

export default AdminMessages;
