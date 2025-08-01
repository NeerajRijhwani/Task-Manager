let clock=document.querySelector(".clock")
let sidebar_events=document.querySelectorAll(".sidebar-events")
let date=new Date()
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// 
clock.children[0].innerText=days[date.getDay()]
if(date.getMonth()<10)
clock.children[1].innerText=`${date.getDate()}/0${date.getMonth()}/${date.getFullYear()}`
else
clock.children[1].innerText=`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  
sidebar_events.forEach((div)=>{
    div.addEventListener("click",()=>{
        sidebar_events.forEach((d)=>{d.classList.remove("active")})
        div.classList.add("active")
    })
})
