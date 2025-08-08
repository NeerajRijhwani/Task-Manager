let password=document.querySelector("#Password")
let email=document.querySelector("#email")
let login=document.querySelector("#LoginButton")
let p=document.querySelectorAll("p")
let errorPopup=document.querySelector(".errorPopup")
let errormessage=document.querySelector("#errormessage")
let closeerror=document.querySelector("#closeError")
login.addEventListener("click",()=>{
   if(email.value==""||password.value==""){
    errorPopup.style.display="flex"
    errormessage.innerText="All Fields Are Required"
   }
else{
      fetch("http://localhost:8000/api/v1/users/login",{
         method:"POST",
         headers:{
            "Content-Type":"application/json"
         },
         body:JSON.stringify({
         email:email.value,
         password:password.value
         })
      })
      .then(async (res)=>{
         const data=await res.json();
         console.log(data.message)
         if(!res.ok)
            throw new Error(data.message)
      })
      .catch((err)=>{
      console.log("error",err.message);
      errorPopup.style.display="flex";
      errormessage.innerText=err;
   });
}
})
closeerror.addEventListener("click",()=>{
    errorPopup.style.display="none"
})