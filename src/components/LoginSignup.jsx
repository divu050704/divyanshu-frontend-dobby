import React from "react"
import sha256 from "../sha256"
import "./css/LoginSignup.css"
export default function LoginSignup(){
  const [uname, setUname] = React.useState("")
  const [passwd, setPasswd] = React.useState("")
  const [confirmPasswd, setConfirmPasswd] = React.useState("")
  const [isLogin, setIsLogin] = React.useState(true)
  const Submit = (type) =>{
    if (type === "login"){
      if (uname.trim() !== "" && passwd.trim() !== ""){
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({username: uname.trim(), password: sha256(passwd.trim())}),
          credentials: 'include',
        };    
        fetch("https://divyanshu-backend-dobby.divu050704.repl.co/login",requestOptions)
        .then(res => res.json())
        .then(last => {
          last.login ? window.location.reload()  : alert("Wrong username or passwd")
        })
      }
      else{
        alert("All fields are required")
      }
      
    }
    else{
      if (passwd.trim() === confirmPasswd.trim() && uname.trim()!=="" && passwd.trim()!=="" && confirmPasswd.trim()){
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({username: uname.trim(), password: sha256(passwd.trim())}),
          
        };
        fetch("https://divyanshu-backend-dobby.divu050704.repl.co/signup",requestOptions)
          .then(res=>res.json())
          .then((last) => {
            if (last.Created){
              alert("Account Created")
            }
            else{
              alert("Account Already exists")
            }
          })
      }
      else if (uname.trim() === "" || passwd.trim() !== "" || confirmPasswd.trim() === ""){
        alert("All fields are required")
      }
      else{
        alert("Passwords don't match!!")
      }
    }
  }
  if (isLogin){
  return(
    <div className="LoginSignup">
      <nav className="navbar" >
        <font>Image Uploader</font>
      </nav>
      <label htmlFor="uname" >Username</label><br />
      <input  id="uname" value={uname} onChange={(event) => setUname(event.target.value)} type="text" /><br />
      <label htmlFor="passwd">Password</label><br />
      <input id="passwd" value={passwd} onChange={(event) => setPasswd(event.target.value)} type="password" /> <br />
      <button onClick={() => Submit("login")} >Login </button><br />
      <font>Don't have an account <span onClick={() => setIsLogin(false)}>SignUp</span></font>
    </div>
  )}
  return(
    <div className="LoginSignup">
       <nav className="navbar" >
        <font>Image Uploader</font>
      </nav>
      <label htmlFor="uname" >Username</label><br />
      <input  id="uname" value={uname} onChange={(event) => setUname(event.target.value)} type="text" /><br />
      <label htmlFor="passwd">Password</label><br />
      <input id="passwd" value={passwd} onChange={(event) => setPasswd(event.target.value)} type="password" /> <br />
      <label htmlFor="confirm-passwd">Confirm Password</label><br />
      <input id="confirm-passwd" value={confirmPasswd} onChange={(event) => setConfirmPasswd(event.target.value)} type="password" /> <br />
      <button onClick={() => Submit("signup")} >SignUp </button><br />
      <font>Already have an account? <span onClick={() => setIsLogin(true)} >Login</span> </font>
    </div>
  )
}