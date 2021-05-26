import React from 'react'
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: grey;
`;

export const Spinner = ({ loading }) => {
    return (
        <SyncLoader color={"#515C5A"} loading={loading} size={15} css={override} />
    )
}
