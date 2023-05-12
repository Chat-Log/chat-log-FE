import React from "react";

import { Avatar } from "antd";
import { IMAGES } from "../../constants";

const AntdUser = () => {
  return (
    <>
      <Avatar src={IMAGES.me} size="large"></Avatar>
    </>
  );
};

export default AntdUser;
