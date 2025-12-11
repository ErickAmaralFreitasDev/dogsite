import React from "react";
import { useParams } from 'react-router-dom';
import Feed from "../Feed/Feed";
import { UserContext } from "../../UserContext";
import Head from '../Helper/Head';

const UserProfile = () => {
    const { user } = useParams(); 
    const userContext = React.useContext(UserContext);
    const currentUser = userContext?.user;
    
    const profileUsername = user || currentUser?.username || '';
    
    return (
        <section className="container mainSection">
            <Head
                key={`head-${profileUsername}`} 
                title={profileUsername ? ` ${profileUsername}` : 'Perfil'} 
                description={` ${profileUsername}`}
            />
            <h1 className="title">{profileUsername}</h1>
            <Feed userId={currentUser?.id} />
        </section>
    );
};

export default UserProfile;