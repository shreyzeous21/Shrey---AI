import "./components.css";
import { useContext } from "react";
import { Context } from "../context/Context";
import avatar from "../assets/avatar.svg";
import compass from "../assets/compass.svg";
import bulb from "../assets/bulb.svg";
import message from "../assets/message.svg";
import code from "../assets/code.svg";
import galary from "../assets/galary.svg";
import mic from "../assets/mic.svg";
import send from "../assets/send.svg";
import user from "../assets/user.svg";
import ai from "../assets/ai.svg";

const Main = () => {
  const {
    onSent,
    setInput,
    input,
    loading,
    showResult,
    resultData,
    recentInput,
  } = useContext(Context);
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini | Shrey</p>
        <img src={avatar} alt="" className="" />
      </div>
      <div className="main_container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Developer.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={compass} alt="" />
              </div>
              <div className="card">
                <p>Briefly beautiful places to see on an upcoming road trip</p>
                <img src={bulb} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm</p>
                <img src={message} alt="" />
              </div>
              <div className="card">
                <p> Improve the thing</p>
                <img src={code} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result_title">
              <img src={user} alt="" />
              <p>{recentInput}</p>
            </div>
            <div className="result_data">
              <img src={ai} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main_bottom">
          <div className="search_box">
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Enter a prompt here"
            />
            <div className="">
              <img src={galary} alt="" />
              <img src={mic} alt="" />
              {input ? (
                <img onClick={() => onSent()} src={send} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom_info">Gemini shrey</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
