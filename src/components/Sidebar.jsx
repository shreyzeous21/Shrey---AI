/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import menu from "../assets/menu.svg";
import plus from "../assets/plus.svg";
import message from "../assets/message.svg";
import question from "../assets/question.svg";
import history from "../assets/history.svg";
import setting from "../assets/setting.svg";
import "./components.css";
import { useContext, useState } from "react";
import { Context } from "../context/Context";

const Sidebar = () => {
  const [nav, setNav] = useState(false);
  const { onSent, prevInput, setRecentInput, newChat } = useContext(Context);
  const loadWrite = async (write) => {
    setRecentInput(write);
    await onSent(write);
  };
  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setNav((prev) => !prev)}
          src={menu}
          alt=""
          className="menu"
        />
        <div onClick={() => newChat()} className="new_chat">
          <img src={plus} alt="" />
          {nav ? <p>New Chat</p> : null}
        </div>
        {nav ? (
          <div className="recent">
            <p className="recent_title">Recent</p>
            {prevInput.map((item, idx) => {
              return (
                <div onClick={() => loadWrite(item)} className="recent_entry">
                  <img src={message} alt="" />
                  <p>{item.slice(0, 18)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom_item recent_entry">
          <img src={question} alt="" />
          {nav ? <p>Help</p> : null}
        </div>
        <div className="bottom_item recent_entry">
          <img src={history} alt="" />
          {nav ? <p>Activity</p> : null}
        </div>
        <div className="bottom_item recent_entry">
          <img src={setting} alt="" />
          {nav ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
