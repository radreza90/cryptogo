import Image from "next/image";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Example from "../components/application-ui/page-examples/home-screens/full_width_with_sidebar";
import MyHead from "../components/custom/head";
import Main from "../components/custom/main";

export default function App() {
  const router = useRouter();
  return (
    <>
      <MyHead />
      <Main>
        <Example />
        <button onClick={() => router.push("/panel/dashboard")}>
          fsgfgfdg
        </button>
      </Main>
    </>
  );
}
