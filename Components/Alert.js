/** @jsx jsx */
import React, { useState, useEffect, useRef } from "react";
import { jsx, css } from "@emotion/core";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation, useReducedMotion } from "framer-motion";

const Alert = ({ addressAlert }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const container = css`
    opacity: ${addressAlert.alert ? `1` : `0`};
    padding: 0 100px;
    height: ${addressAlert.alert ? `100px` : `0px`};
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    transition: all 0.3s ease-in-out;
  `;

  const innerContainer = css`
    height: 100%;
    width: 80%;
    background: red;
    text-align: center;
    color: dark-red;
    font-weight: 100;
  `;
  return (
    <div css={container}>
      <div css={innerContainer}>
        <h1>{addressAlert.message}</h1>
      </div>
    </div>
  );
};

export default Alert;
