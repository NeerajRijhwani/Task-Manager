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
let addTask=document.querySelector("#add-task")
let addTaskPopup=document.querySelector(".addtaskPopup")
let closeTaskPopup=document.querySelector("#close-add-task")
closeTaskPopup.addEventListener("click",()=>{
    addTaskPopup.style.display="none"
})
addTask.addEventListener("click",()=>{
addTaskPopup.style.display="flex"
})
let task_image=document.querySelector("#task-image");
// console.log(task_image.files)
task_image.addEventListener("change",()=>{

    if(task_image.files)
    {
        console.log(task_image.value);
        let icon=document.querySelector(".upload-icon")
        icon.src=URL.createObjectURL(task_image.files[0])
    
    }
})
let task_submit=document.querySelector("#task-submit")
task_submit.addEventListener("click",()=>{
    window.location.reload()
})