let password=document.querySelector("#Password")
let password_Container=document.querySelector("#passwordContainer")
let username=document.querySelector("#username")
let username_container=document.querySelector("#Usernamecontainer")
let eyeicon=document.querySelector("#eyeIcon")
let signup=document.querySelector("button")
let email=document.querySelector("#email")
let email_Container=document.querySelector("#emailcontainer")
let confirmPass=document.querySelector("#confirmpass")
let confirmPass_Container=document.querySelector("#confirmpasscontainer")
let p=document.querySelectorAll("p")
let messagedisplay=document.getElementById("error")
// let password=""
eyeicon.addEventListener("click",(e)=>{
   if(password.type==="password"){
    password.type="text"
    e.target.src="./images/eye.png"
   }
   else{
    password.type="password"
    e.target.src="./images/close_eye.png"
   }
})
// password.addEventListener("input",()=>{
//    password_Container.style.border="1px solid red"
//    if(password.value.length>8 )
//    {
//       password_Container.style.border="1px solid green"
//    }
// })
signup.addEventListener("click",()=>{
   let flag=true
   if(username.value=="")
   {
      username_container.style.border="1px solid red"
      p[1].style.display="block"
      flag=false
   }
   else {
     username_container.style.border="1px solid green"
    p[1].style.display="none"}
   if(password.value.length<8 )
   {
      password_Container.style.border="1px solid red"
      flag=false
       p[3].style.display="block"
   }
   else {
     password_Container.style.border="1px solid green"
       p[3].style.display="none"}

   if(confirmPass.value!=password.value||confirmPass.value=="")
   {
      confirmPass_Container.style.border="1px solid red"
       p[4].style.display="block"
      flag=false
   }
   else {
    confirmPass_Container.style.border="1px solid green"
       p[4].style.display="none"}

   if(!email.value.includes("@"))
   {
      email_Container.style.border="1px solid red"
        p[2].style.display="block"
      flag=false
   }
   else {
    email_Container.style.border="1px solid green"
        p[2].style.display="none"}
if(!flag)
{
   return
}
else{
      fetch("http://localhost:8000/api/v1/users/register",{
         method:"POST",
         headers:{
            "Content-Type":"application/json"
         },
         body:JSON.stringify({
         username:username.value,
         email:email.value,
         password:password.value
         })
      })
      .then(async (res)=>{
         const data=await res.json();
         console.log(data.message)
         messagedisplay.innerText=data.message
         messagedisplay.style.display="block"
         messagedisplay.style.color="green"
         window.location.reload()
         if(!res.ok)
            throw new Error(data.message)
      })
      .catch((err)=>{
      console.log("error",err.message);
      
      messagedisplay.style.display="block"
      messagedisplay.style.color="red"
      messagedisplay.innerText=err.message
   });
}
})