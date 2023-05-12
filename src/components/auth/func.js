export function isValidEmail(email) {
  return email.match(/^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/);
}

export const isValidPassword = (pwd) => {
  return pwd.match(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,13}$/);
};

export const isValidPhoneNumber = (phonenNumber) => {
  return phonenNumber.match(/01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/);
};

export const reformatDate = (inputDate) => {
  let date = new Date(inputDate);

  let year = date.getFullYear().toString().slice(2);
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);

  let formattedDate = `${year}.${month}.${day}-${hours}:${minutes}`;

  return formattedDate;
};
