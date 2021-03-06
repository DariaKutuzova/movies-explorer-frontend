import React from "react";
import {Navigate} from "react-router-dom";

function ReversedProtectedRoute({element: Component, ...props}) {
    return (
        props.loggedIn === null ? null :
            props.loggedIn ? <Navigate to="/movies"/> : <Component {...props} />
    );
}

export default ReversedProtectedRoute;
