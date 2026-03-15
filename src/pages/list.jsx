import { useEffect, useState } from "react";

export default function List(){

  const [data,setData] = useState([]);

  useEffect(()=>{

    fetch("https://backend.jotish.in/backend_dev/gettabledata.php",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username:"test",
        password:"123456"
      })
    })
    .then(res=>res.json())
    .then(res=>{
      setData(res.data || [])
    });

  },[]);

  return(

    <div className="p-10">

      <h1 className="text-2xl mb-6">Employee List</h1>

      <table className="w-full border">

        <thead className="bg-gray-200">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Salary</th>
          </tr>
        </thead>

        <tbody>

        {data.map((item,index)=>(
          <tr key={index} className="border">
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.city}</td>
            <td>{item.salary}</td>
          </tr>
        ))}

        </tbody>

      </table>

    </div>
  )
}
