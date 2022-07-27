import Head from 'next/head'
import Image from 'next/image'
import Featured from '../components/Featured'
import FoodList from '../components/FoodList'
// import styles from '../styles/Home.module.css'
import axios from "axios";
import { useState } from 'react';
import Add from '../components/Add';
import AddButton from '../components/AddButton';
import { useSession, signIn, signOut } from "next-auth/react"
import StatusList from '../components/StatusList';
import AddStatus from '../components/AddStatus';
import { parseCookies } from "nookies"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import SearchBar from '../components/SearchBar';

export default function Home({foodList, statusList, admin}) {

  const [close, setClose] = useState(true);
  const [close2, setClose2] = useState(true);
  
  const cookies = parseCookies()
  const router = useRouter()
  const [userState, setUserState] = useState("")

  const { data: session } = useSession()
  console.log(session, cookies.token)
  const dispatch = useDispatch()

  const profile = useSelector((state) => state.profile)
  const {loading,error,dbUser} = profile

  const user = dbUser
    ? dbUser
    : cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : ""

  return (
    < >
      <Head>
        <title>Make your Own dish</title>
        <meta name="description" content="food recipes" />
        <link rel="icon" href="/img/logo.png" />
      </Head>
      <SearchBar foodList={foodList}/>
      {/* <Featured/> */}
      {/* {admin && <AddButton setClose={setClose}/>} */}
      {dbUser && <AddButton setClose={setClose} name="Add New Recipe"/>}
      {dbUser && <AddButton setClose={setClose2} name="Add New Status"/>}
      <StatusList statusList={statusList}/>
      <FoodList foodList={foodList}/>
      {!close && <Add dbUser={dbUser} setClose={setClose}/>}
      {!close2 && <AddStatus dbUser={dbUser} setClose={setClose2}/>}
    </>
  )
}

export const getServerSideProps = async (ctx)=>{

  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if(myCookie.token === process.env.TOKEN){
    admin = true;
  }
  const productRes = await axios.get("http://localhost:3000/api/products");
  const statusRes = await axios.get("http://localhost:3000/api/statuses");
  return{
      props:{
          foodList:productRes.data,
          statusList:statusRes.data, 
          admin
      },
  }
}
