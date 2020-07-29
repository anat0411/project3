import React from "react";
import { Redirect } from "react-router-dom";
import contextLogin from "../../contexts/contextLogin";

class ProtectedRoute extends React.Component {
  render() {
    const { cookies } = this.props;

    const user = cookies.get("user");
    if (user) {
      contextLogin._currentValue = true;
    }
    const Component = this.props.component;
    const isAuthenticated = contextLogin._currentValue;
    console.log(isAuthenticated);

    return isAuthenticated ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  }
}

export default withCookies(ProtectedRoute);
