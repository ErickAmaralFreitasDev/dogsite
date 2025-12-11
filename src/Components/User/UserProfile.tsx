import React from "react";
import { useParams, Route, Routes } from 'react-router-dom';
import Feed from "../Feed/Feed";
import { UserContext } from "../../UserContext";

const UserProfile = () => {
    const context = React.useContext(UserContext);
    const { user } = context!;

    return (
        <section className="container mainSection">
            <h1 className="title">{user?.username}</h1>
            <Feed userId={user?.id} />
        </section>
    );
};

export default UserProfile;