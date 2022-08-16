import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import getAllMessages from "../../services/pubsub/get-all-message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import { getUserFromLocalStorage } from "../../services/getUserFromLocalStorage";
import ClearIcon from "@mui/icons-material/Clear";
import "./Header.css";

function Header({ logoutOfBnB }) {
  let [messages, setMessages] = useState([]);
  const getNotificationFromLocalStorage = () => {
    const localUserNotifications = localStorage.getItem("userNotifications");
    return localUserNotifications ? JSON.parse(localUserNotifications) : false;
  };
  const setNotificationFromLocalStorage = (messages = []) => {
    const notifications = getNotificationFromLocalStorage() || [];
    notifications.push(...messages);
    localStorage.setItem("userNotifications", JSON.stringify(notifications));
    setMessages(notifications);
  };
  const handleNotificationMessages = async () => {
    const response = await getAllMessages({
      userNotificationToken: getUserFromLocalStorage()["customerNo"],
    });
    const newMessages = response.messages.map((item, index) => ({
      ...item,
      index,
    }));
    setNotificationFromLocalStorage(newMessages);
  };
  useEffect(() => {
    setNotificationFromLocalStorage([]);
  }, []);
  const handleLogo = category => {
    switch (category) {
      case "food": {
        return <LocalDiningIcon />;
      }
      case "booking": {
        return <ScheduleIcon />;
      }
      case "tour": {
        return <LocalAirportIcon />;
      }
      default: {
        return <NotificationsIcon />;
      }
    }
  };
  return (
    <>
      {getUserFromLocalStorage() != undefined ? (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/" style={{ fontWeight: "bold" }}>
              Bed and Breakfast
            </a>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul
                className="navbar-nav mr-auto mt-2 mt-lg-0"
                style={{ marginLeft: "10px" }}
              >
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/user-dashboard"
                    style={{ marginLeft: "10px" }}
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/bookroom"
                    style={{ marginLeft: "10px" }}
                  >
                    Book Room
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/order-food">
                    Order Food
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/booktour">
                    Book Tour
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/feedback">
                    View Feedback
                  </a>
                </li>
                <li className="nav-item">
                  <p className="nav-link" href="/feedback">
                    Customer No: {getUserFromLocalStorage()["customerNo"]}
                  </p>
                </li>
              </ul>
            </div>
            <Dropdown onToggle={handleNotificationMessages}>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <NotificationsIcon />
              </Dropdown.Toggle>

              <Dropdown.Menu
                variant="dark"
                align="start"
                style={{
                  fontSize: "0.9rem",
                }}
              >
                {messages.length === 0 ? (
                  <Dropdown.Item variant="dark">
                    <p style={{ wordBreak: "break-word" }}>
                      <i
                        className="bi bi-bell-slash"
                        style={{ fontSize: "1rem" }}
                      ></i>
                      {" No new Notification"}
                    </p>
                  </Dropdown.Item>
                ) : (
                  messages.map(({ message, category }) => (
                    <Dropdown.Item variant="dark">
                      <p style={{ wordBreak: "break-word" }}>
                        {handleLogo(category)}
                        {" " + message}``
                      </p>
                    </Dropdown.Item>
                  ))
                )}
                {messages.length > 0 ? (
                  <Dropdown.Item variant="dark" style={{ textAlign: "center" }}>
                    <p
                      style={{ wordBreak: "break-word" }}
                      onClick={() => {
                        localStorage.setItem("userNotifications", false);
                        setNotificationFromLocalStorage([]);
                      }}
                    >
                      {" Clear All "}
                      <span>
                        <ClearIcon />
                      </span>
                    </p>
                  </Dropdown.Item>
                ) : (
                  ""
                )}
              </Dropdown.Menu>
            </Dropdown>

            <DropdownButton
              id="dropdown-basic-button"
              title={getUserFromLocalStorage()["firstName"]}
              variant="Secondary"
            >
              <Dropdown.Item href="/user-dashboard">My dashboard</Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  console.log("Logging out");
                  logoutOfBnB();
                }}
              >
                Log out
              </Dropdown.Item>
            </DropdownButton>
          </nav>
        </div>
      ) : (
        <h1>Welcome guest user</h1>
      )}
    </>
  );
}
export default Header;
