import React from "react";
import Head from "../Helper/Head";
import useFetch from "../../Hooks/useFetch";
import { GET_STATS } from "../../Hooks/api";
import { UserContext } from "../../UserContext";
import { Loading } from "../Helper/Loading";
import { Errorp } from "../Helper/Errorp";
import UserStatsGraphs from "./UserStatsGraphs";

interface PhotoWithAccess {
  id: number;
  title: string;
  acessos: string; 
}

const UserStats = () => {

    const { user: photosArray, error, loading, request } = useFetch<PhotoWithAccess>();
    const userContext = React.useContext(UserContext);
    const token = userContext?.user?.token;

    React.useEffect(() => {

        async function getData() {
            if (!token) {
                console.error('Token não disponível');
                return;
            }
            const {url, options} = GET_STATS({token});
            await request (url, options)
        }
        if (token) {
            getData();
        }
    }, [request, token]);

    if (loading) return <Loading/>
    if (error) return <Errorp />
    if (photosArray && Array.isArray(photosArray)) {
        console.log('✅ UserStats - Array de fotos recebido:', photosArray.length, 'fotos');
    return <div>
        <Head
            title='Estatísticas'
        />
        <UserStatsGraphs user={photosArray}/>
    </div>;
    }
    else return null;
};

export default UserStats;
