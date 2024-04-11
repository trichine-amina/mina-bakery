
function finduser(email)
{
    const users= JSON.parse(localStorage.getItem("users")) || [];
    for( let i =0 ; i< users.length ; i++)
    {
        if(users[i].email === email)
        {
            return users[i];
        }
    }
    return null;

}

function getcurrentuser()
{
    return JSON.parse(localStorage.getItem("currentuser"));
}

function logout(event)
{
    localStorage.removeItem("currentuser");
    window.location.assign("login.html");
}
let loockedinterval = null;

function checklockedstate () 
{

    
    const loginattempts = parseInt(localStorage.getItem("loginattempts")) || 0;
    
    if(loginattempts>2 )
    {
       const form = document.getElementById("login");
       const loocked = document.getElementById("loocked");
       let  loockedtime = parseInt(localStorage.getItem("loockedtime"));
       
      if(loockedtime)
      {
        console.log("time exictes");
        if(loockedinterval== null)
        {
            loockedinterval = setInterval(()=>
            {
                  const currenttime = Date.now();
                  const remaingtime= loockedtime - currenttime;
                  console.log(remaingtime/1000);
                  if(remaingtime>0)
                  {
                     loocked.innerHTML = `Too many retries. Pleasetry again after:<span class="numbers">${Math.floor(remaingtime/1000)}</span> Seconds.` ; 
                     form.style.display="none";
                     loocked.style.display="block";
                  }
            
                else
              {
                clearInterval(loockedinterval);
                loockedinterval= null
                localStorage.setItem("loockedtime",null);
                localStorage.setItem("loginattempts", loginattempts-1);
                form.style.display="flex";
                loocked.style.display = "none";
              }
            }
          , 1000)
            ;
        }
    }
    else
       {
        console.log("no time");
          loockedtime = Date.now() +30000
          localStorage.setItem("loockedtime", loockedtime);
          loockedinterval = setInterval(()=>
        {
             
              const remaingtime= loockedtime - Date.now();
              if(remaingtime>0)
              {
                 loocked.innerHTML = `Too many retries. Please try again after :<span class="numbers">${Math.floor(remaingtime/1000)}</span> Seconds.` ; ;
                 form.style.display="none"; 
                 loocked.style.display="block";
              }
        
            else
              {
                clearInterval(loockedinterval);
                loockedinterval= null;
                localStorage.setItem("loockedtime",null);
                localStorage.setItem("loginattempts", loginattempts-1);
                form.style.display="flex";
                loocked.style.display = "none";
             }
        }
      , 1000);
       };
     
  }
}


function login(event)
{
event.preventDefault(); 

 
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;
   const user = finduser(email);
   const errormsg= document.querySelector(".errormsg");
   errormsg.classList.remove("show");
   if(user && user.password===password)
   {
    localStorage.setItem("currentuser",JSON.stringify(user));
    localStorage.setItem("loginattempts" , null);
    window.location.replace("home.html");
   }
   else
   {
    errormsg.textContent="email or password incorrect";
    errormsg.classList.add("show");
    let loginattempts = parseInt(localStorage.getItem("loginattempts")) || 0;
     loginattempts++;
    localStorage.setItem("loginattempts" , JSON.stringify(loginattempts));
    
   }
   checklockedstate () ;
}

function registre(event)
{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password1 = document.getElementById("password1").value;
    const errormsg = document.querySelector(".errormsg");
    event.preventDefault();
    errormsg.classList.remove("show")
   if(finduser(email)=== null)
   {
    if(password=== password1)
    {
   let users = JSON.parse(localStorage.getItem("users")) || [];
   users.push({email , password});
  localStorage.setItem("users",JSON.stringify(users));
   window.location.replace("login.html");
   }
   else
   {

     errormsg.textContent="Passwords must match!";
     errormsg.classList.add("show");

     }
}

   else{
    errormsg.textContent="User already exists";
    errormsg.classList.add("show");
   }
}
console.log("script loaded");

const singupform=document.getElementById("singupform");
const loginform= document.getElementById("login");
const orderform = document.getElementById("order");
if(singupform)
{
    if(getcurrentuser())
{
window.location.assign("home.html");
}
    console.log("seting event");
   singupform.addEventListener("submit",registre);
}
else if (loginform)
{
    if(getcurrentuser())
{
    window.location.assign("home.html");
}
    else
    {
    loginform.addEventListener("submit",login);
    checklockedstate () ;
    }
}
else {
  const currentuser = getcurrentuser();
if(!currentuser)
{
window.location.assign("login.html");
}
else{
  document.getElementById("logout").addEventListener("click",logout);
document.querySelector("#user p").textContent=`User:${currentuser.email}`

}

}


