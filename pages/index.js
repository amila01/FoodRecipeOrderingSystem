import Head from 'next/head'
import Image from 'next/image'
import Featured from '../components/Featured'
import FoodList from '../components/FoodList'
// import styles from '../styles/Home.module.css'
import axios from "axios";
import { useState } from 'react';
import Add from '../components/Add';
import AddButton from '../components/AddButton';

export default function Home({foodList, admin}) {

  const [close, setClose] = useState(true);

  return (
    < >
      <Head>
        <title>Make your Own dish</title>
        <meta name="description" content="food recipes" />
        <link rel="icon" href="/img/logo.png" />
      </Head>
      <Featured/>
      {admin && <AddButton setClose={setClose}/>}
      <FoodList foodList={foodList}/>
      {!close && <Add setClose={setClose}/>}
    </>
  )
}

export const getServerSideProps = async (ctx)=>{

  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if(myCookie.token === process.env.TOKEN){
    admin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products");
  return{
      props:{
          foodList:res.data,
          admin
      },
  }
}
