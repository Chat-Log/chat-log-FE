import Swal from "sweetalert2";

export const Alert = ({ title, errMsg, icon, image }) => {
  Swal.fire({
    imageUrl: image,
    icon: icon,
    imageHeight: "50px",
    imageWidth: "50px",
    title: title,
    text: errMsg,
    padding: 24,
    confirmButtonText: "확인",
    confirmButtonColor: "#676cf8",
  });
};
