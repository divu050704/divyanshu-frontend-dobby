import React from "react"
import axios from "axios"
import "./css/Upload.css"

export default function Uplaod(){
  const [name, setName ] = React.useState("")
  const [file, setFile ] = React.useState("")
  let fileName = ""
  async function sendFile(formData) {
    const res = await axios.post(
      "https://divyanshu-backend-dobby.divu050704.repl.co/upload/",
      formData,
      {}
    );
    
    return res;
  }
  async function sendData() {
    
    const res = await axios.post(
      "https://divyanshu-backend-dobby.divu050704.repl.co/save/",
      ({fileName: fileName, name: name}),
      {withCredentials: true}
    );

    return res;
  }
  async function Submit() {
    const formData = new FormData();
      formData.append("file", file);
      fileName = ((await sendFile(formData)).data.fileName);
      if (fileName === "not Created") {
        alert("Please Select a file");
      }
      else {
        const res = await sendData();
        res.data.Status ? alert("Saved") : alert("File already exists")
        
        window.location.reload()
      }
  }
  return(
    <div className="Upload">
      <nav className="navbar" style={{marginBottom: "5%"}}>
        <font>Image Uploader</font>
      </nav>
      <button onClick={() => window.location.reload()}>Home</button>
      <br />
      <label htmlFor="name">Name</label><br />
      <input id="name" type="text" value={name} onChange={(event) => setName(event.target.value)}></input><br />
      <input
              id="file-input"
              type="file"
              onChange={(event) => {
                setFile(event.target.files[0])
                                     
              }}
              accept="image/*"
            /><br />
      <button onClick={Submit} >Uplaod</button><br />
    </div>
  )
}