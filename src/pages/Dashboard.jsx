import { useEffect, useState } from "react";
import API from "../services/api";
import ComplaintForm from "../components/ComplaintForm";
import ComplaintTable from "../components/ComplaintTable";
import DashboardCharts from "../components/DashboardCharts";

function Dashboard() {

  const [dashboard,setDashboard]=useState(null);
  const [refresh,setRefresh]=useState(false);

  const fetchDashboard=()=>{
    API.get("/dashboard")
    .then((res)=>{
      setDashboard(res.data);
    })
    .catch(console.log);
  }

  useEffect(()=>{
    fetchDashboard();
  },[refresh]);

  if(!dashboard){
    return <h2 style={{textAlign:"center",marginTop:"100px"}}>Loading...</h2>
  }

  return(

<div
style={{
maxWidth:"1400px",
margin:"auto",
padding:"30px"
}}
>

<h1
style={{
textAlign:"center",
color:"#1976d2",
marginBottom:"35px"
}}
>
AIVOA AI Complaint Management System
</h1>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"20px",
marginBottom:"40px"
}}
>

<Card
title="Total Complaints"
value={dashboard.total_complaints}
color="#1976d2"
/>

<Card
title="High Severity"
value={dashboard.high}
color="#d32f2f"
/>

<Card
title="Medium Severity"
value={dashboard.medium}
color="#f57c00"
/>

<Card
title="Low Severity"
value={dashboard.low}
color="#388e3c"
/>

</div>

<DashboardCharts dashboard={dashboard}/>

<ComplaintForm
refreshData={()=>{
fetchDashboard();
setRefresh(!refresh);
}}
/>

<ComplaintTable refresh={refresh}/>

</div>

  );
}

function Card({title,value,color}){

return(

<div
style={{
background:color,
padding:"25px",
borderRadius:"12px",
color:"white",
textAlign:"center",
boxShadow:"0 5px 15px rgba(0,0,0,0.2)"
}}
>

<h3>{title}</h3>

<h1>{value}</h1>

</div>

)

}

export default Dashboard;