import { Button, Drawer } from "antd";

export const CustomDrawer = ({ title, size, onClose, open, contents }) => {
  return (
    <>
      <Drawer title={title} placement="right" size={size} onClose={onClose} open={open} extra={<Button onClick={onClose}>닫기</Button>}>
        {contents}
      </Drawer>
    </>
  );
};
