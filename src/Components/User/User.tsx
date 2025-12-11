import React from "react";
import UserHeader from "./UserHeader";
import { Route, Routes } from "react-router-dom";
import Feed from "../Feed/Feed";
import UserPhotoPost from "./UserPhotoPost";
import UserStats from "./UserStats";
import { UserContext } from "../../UserContext";
import NotFound from "../NotFound";
import Head from "../Helper/Head";

const User = () => {

    const context = React.useContext(UserContext);
    const { user } = context!;
    
    return <section className='container'>
        <Head
            title='Conta'
        />
        <UserHeader />
        <Routes>
            <Route path="/" element={<Feed userId={user?.id} />} />
            <Route path="/posts" element={<UserPhotoPost />} />
            <Route path="/estatisticas" element={<UserStats />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </section>;
};

export default User;