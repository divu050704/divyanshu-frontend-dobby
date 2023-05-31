import React from "react"
import "./css/Home.css"

export default function Home(props){
  const [data,setData] = React.useState([])
  const [search,setSearch] = React.useState("")
  React.useEffect(() => {
    async function get(){
      const d = await fetch("https://divyanshu-backend-dobby.divu050704.repl.co/data",{credentials: "include"})
      
    setData(await d.json())
    }
    get()
  },[])
  const images = data.map((element) => {
    let reg = new RegExp(`${search}`, 'gi')
    // testing the values
    if (reg.test(element.name))
    return(
      <div key={element._id} >
        <p>{element.name}</p>
      <img src={"https://divyanshu-backend-dobby.divu050704.repl.co/"+element.fileName} alt={element.fileName}  width="500"/><br />
        </div>
    )
  })
  return(
    <div className="Home">
      <nav className="navbar" style={{marginBottom: "5%"}}>
        <font>Image Uploader</font>
      </nav>
      <button onClick={() => {
        fetch("https://divyanshu-backend-dobby.divu050704.repl.co/logout",{credentials: "include"})
        .then(() => window.location.reload())
      }} >Logout</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={props.handleUploadOpen}>Upload</button><br />
      <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search"/><br />
      {images}
    </div>
  )
}