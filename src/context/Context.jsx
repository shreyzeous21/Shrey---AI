/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import runChat from "../config/main_ai";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentInput, setRecentInput] = useState("");
  const [prevInput, setPrevInput] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const delayReply = (idx, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * idx);
  };
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };
  const onSent = async (write) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (write !== undefined) {
      setRecentInput(write);
      setPrevInput((prev) => [...prev, input]);
      response = await runChat(write);
    } else {
      setRecentInput(input);
      setPrevInput((prev) => [...prev, input]);
      response = await runChat(input);
    }

    let responseArr = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArr.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArr[i];
      } else {
        newResponse += "<br>" + responseArr[i] + "</br>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArr = newResponse2.split(" ");
    for (let i = 0; i < newResponseArr.length; i++) {
      const nextWord = newResponseArr[i];
      delayReply(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };
  const contextValue = {
    prevInput,
    setPrevInput,
    onSent,
    setRecentInput,
    recentInput,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
