export const socialLoginTitle = "Please login with the following options"
export const emptyCommentList = "Not found any comment yet!"
export const authInfo = "Please login for make and see comments!"

export const logoutSuccess = "Logout successfully"
export const loginSuccessMsg = "Login process successfully completed"
export const registerSuccessMsg = "Register process successfully completed"
export const loginErrorMsg = "Something went wrong! Please try again"

export const socialEmailButtonConfig = {
  text: "Email",
  icon: "envelope-square",
  iconFormat: name => `fa fa-${name}`,
  style: { background: "#3b5998" },
  activeStyle: { background: "#293e69" }
};

export const SAD_EMOJI = [55357, 56864];
export const HAPPY_EMOJI = [55357, 56832];
export const NEUTRAL_EMOJI = [55357, 56848];

export const people = [
  "Stephanie",
  "John",
  "Steve",
  "Anna",
  "Margaret",
  "Felix",
  "Chris",
  "Jamie",
  "Rose",
  "Bob",
  "Vanessa",
  "9lad",
  "Bridget",
  "Sebastian",
  "Richard",
];

export const nameBadgeStyles = {
  fontSize: "0.8rem",
  height: 40,
  borderRadius: 20,
  cursor: "pointer",
};

export const adminEmail = "turan@turan.com"

export const isUserAdmin = () => localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData")).isAdmin || false

export const prepareUserData = data => ({
  name: data.user.displayName || data.user.name || "Noname User",
  displayName: makeShowName(data.user.displayName || data.user.name || "Noname User"),
  token: data.credential && data.credential.accessToken ||data.user.refreshToken || null,
  email: data.user.email || null,
  uid: data.user.uid || null,
  isAdmin: data.user.email === adminEmail
})

export const prepareUserDataWithEmail = user => ({
  name: user.displayName || user.name || "Noname User",
  displayName: makeShowName(user.displayName || user.name || "Noname User"),
  token: user.refreshToken && user.refreshToken || null,
  email: user.email || null,
  uid: user.uid || null,
  isAdmin: user.email === adminEmail
})

const makeShowName = name => {
  if(!name) return  "Noname U."
  let arr = name.split(" ")
  return `${arr[0]} ${arr[1].charAt(0)}.`
}