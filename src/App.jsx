import './App.css'
import React from "react"
import LoginSignup from "./components/LoginSignup"
import Home from "./components/Home"
import Upload from "./components/Upload"
export default function App() {
  const [loginComponent, setLoginComponent] = React.useState(false)
  const [uploadOpen, setUploadOpen ] = React.useState(false)
  React.useState(() => {
    fetch("https://divyanshu-backend-dobby.divu050704.repl.co/verify", {credentials: "include"})
    .then(last => last.json())
    .then(res => res.valid ? setLoginComponent(false) : setLoginComponent(true))
  }, [])
  const handleUploadOpen = () => setUploadOpen(prev => !prev)
  if (loginComponent ){
    return (
      <main>{<LoginSignup />}</main>
    )
  }
  else{
    if (uploadOpen){
      return <main> {<Upload />}</main>
    }
    else{
      return(
        <main>{<Home handleUploadOpen={handleUploadOpen}/>}</main>
      )
    }
  }
}
