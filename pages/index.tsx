import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Login from "./login";
import Home from "../components/home";
import dynamic from "next/dynamic";

const Loader = dynamic(() => import("@/components/Loader"), { ssr: false });

const Index = () => {
  const { user, error, isLoading } = useUser();
  
  if (isLoading) return <Loader />;
  if (user) return <Home />
  if (error) return <div>{error.message}</div>;

  return <Login />;
};

export default Index;
