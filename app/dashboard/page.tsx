"use client"
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation, useQuery } from 'convex/react';
import React, { useEffect } from 'react'
import { api } from '@/convex/_generated/api';
import { mutation } from '@/convex/_generated/server';
import Header from './_components/Header';
import FileList from './_components/FileList';
const page = () => {

  const {user}:any  = useKindeBrowserClient();
  // const getUser = useQuery(api.user.getUser, {email: user?.email});
  const convex = useConvex();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if(user){
      checkUser();
      
    }


  }, [user])

  const checkUser = async() => {

    const result = await convex.query(api.user.getUser, {email:user?.email});

    if(!result?.length){
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture
      }).then(resp=>{
        console.log(resp)
      })
  }


  }
  return (
    <div className='p-8'>
      <Header/>
      <FileList/>
    </div>
  )
}

export default page