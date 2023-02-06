import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Panel from "../../components/custom/panel/panel";

const Signal = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/panel/dashboard");
  }, []);
  return (
    <>
      <Panel pageTitle="Signal">
        <p>Signal...</p>
      </Panel>
    </>
  );
};

export default Signal;
