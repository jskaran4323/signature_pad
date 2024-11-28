document.addEventListener("DOMContentLoaded",()=>{
  const generateButton=document.getElementById("generate-btn")
  const passwordOutput=document.getElementById("password-output")

 generateButton.addEventListener('click', async()=>{
  const length=parseInt(document.getElementById('length').value)
  if(isNaN(length)||length<6||length>128){
    alert("choose the lenght between 6 to 128")
    return;
  }
  try{
    const csrfToken= document.querySelector("meta[name='csrf-token']").getAttribute("content")
    const response= await fetch("/generate_password",{
      method: "POST",
    headers:{
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    body:JSON.stringify({length})  
    })
    if (response.ok) {
      const data= await response.json();
      passwordOutput.textContent=data.password;
    }
    else{
      alert("failed to generate the password");
    }

    

  } 
  catch(error){
    console.error("error generating password:", error);
    
  }
 })



})