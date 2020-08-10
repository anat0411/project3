import React from "react";

const contextUserInfo = React.createContext({ userName: "" });
console.log(contextUserInfo._currentValue);

export default contextUserInfo;
