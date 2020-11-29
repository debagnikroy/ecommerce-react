import React from 'react';
import {API} from '../config';
import Layout from "./Layout";

const Home = () =>{
    return(
        <Layout title="Home" description="Node React Ecommerce App">
            {API}
        </Layout>
    )
};


export default Home;
