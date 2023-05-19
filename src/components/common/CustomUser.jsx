import React from "react";

import { Avatar } from "antd";
import { IMAGES } from "../../constants";

export const CustomUser = () => {
  return (
    <>
      <Avatar src={IMAGES.me} size="large"></Avatar>
    </>
  );
};
