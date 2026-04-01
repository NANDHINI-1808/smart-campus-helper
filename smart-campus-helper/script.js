// --- SIMULATED LOGIN ---
let users = [{email:"user@example.com", password:"1234"}]; // sample user

function loginWithEmail(){
  const email=document.getElementById("email").value.trim();
  const pass=document.getElementById("password").value.trim();
  const user=users.find(u=>u.email===email && u.password===pass);
  if(user){ showMenu(); alert("Login successful!"); }
  else alert("Invalid email or password");
}

function signupWithEmail(){
  const email=document.getElementById("email").value.trim();
  const pass=document.getElementById("password").value.trim();
  if(!email||!pass){ alert("Enter email and password"); return; }
  users.push({email, password:pass});
  alert("Sign up successful! Please login."); 
}

function loginWithGoogle(){ alert("Google login clicked (simulate)"); showMenu(); }
function loginWithGitHub(){ alert("GitHub login clicked (simulate)"); showMenu(); }
function loginWithFacebook(){ alert("Facebook login clicked (simulate)"); showMenu(); }

// --- SHOW MENU ---
function showMenu(){
  document.getElementById("loginPage").style.display="none";
  document.getElementById("menuPage").style.display="block";
  document.getElementById("featurePanels").style.display="none";
  speakText("Welcome to Smart Campus Helper v2. Please select a feature.");
}

// --- OPEN FEATURE ---
function openFeature(feature){
  document.getElementById("menuPage").style.display="none";
  document.getElementById("featurePanels").style.display="block";

  let panels = ["complaintsCard","lostCard","interCard","intraCard","notesCard","chatCard"];
  panels.forEach(p => document.getElementById(p).style.display="none");

  if(feature==="complaints") document.getElementById("complaintsCard").style.display="block";
  if(feature==="lost") document.getElementById("lostCard").style.display="block";
  if(feature==="inter") document.getElementById("interCard").style.display="block";
  if(feature==="intra") document.getElementById("intraCard").style.display="block";
  if(feature==="notes") document.getElementById("notesCard").style.display="block";
  if(feature==="chat") document.getElementById("chatCard").style.display="block";
}

// --- SPEECH ---
function speakText(text){ const utter=new SpeechSynthesisUtterance(text); speechSynthesis.speak(utter); }

// --- DASHBOARD FEATURES ---
// Complaints
let complaints=[]; 
function addComplaint(){ 
  let val=document.getElementById("input").value.trim(); 
  if(!val){alert("Enter something"); return;} 
  complaints.push(val); showComplaints(); document.getElementById("input").value=""; 
}
function showComplaints(){ let list=document.getElementById("list"); list.innerHTML=""; complaints.forEach((c,i)=>{ let li=document.createElement("li"); li.innerText="📢 "+c; list.appendChild(li); }); }
function readComplaints(){ complaints.forEach(c=>speakText(c)); }

// Lost & Found
let lostItems=[]; 
function addLost(){ let val=document.getElementById("lostInput").value.trim(); if(!val) return; lostItems.push(val); showLost(); document.getElementById("lostInput").value=""; }
function showLost(){ let list=document.getElementById("lostList"); list.innerHTML=""; lostItems.forEach(i=>{ let li=document.createElement("li"); li.innerText="🔍 "+i; list.appendChild(li); }); }
function readLost(){ lostItems.forEach(i=>speakText(i)); }

// Inter / Intra College Events
function saveInterEvents(){ let lines=document.getElementById("interEvents").value.trim().split("\n"); localStorage.setItem("interEvents",JSON.stringify(lines)); showInterEvents(); }
function showInterEvents(){ let lines=JSON.parse(localStorage.getItem("interEvents")||"[]"); let list=document.getElementById("interList"); list.innerHTML=""; lines.forEach(l=>{ let li=document.createElement("li"); li.innerText="🌐 "+l; list.appendChild(li); }); }
function readInterEvents(){ JSON.parse(localStorage.getItem("interEvents")||"[]").forEach(l=>speakText(l)); }

function saveIntraEvents(){ let lines=document.getElementById("intraEvents").value.trim().split("\n"); localStorage.setItem("intraEvents",JSON.stringify(lines)); showIntraEvents(); }
function showIntraEvents(){ let lines=JSON.parse(localStorage.getItem("intraEvents")||"[]"); let list=document.getElementById("intraList"); list.innerHTML=""; lines.forEach(l=>{ let li=document.createElement("li"); li.innerText="🏫 "+l; list.appendChild(li); }); }
function readIntraEvents(){ JSON.parse(localStorage.getItem("intraEvents")||"[]").forEach(l=>speakText(l)); }

// Notes Maker
function saveNotes(){ let val=document.getElementById("notesInput").value.trim(); localStorage.setItem("myNotes",val); showNotes(); }
function showNotes(){ let val=localStorage.getItem("myNotes")||""; let list=document.getElementById("notesList"); list.innerHTML=""; if(val){ let li=document.createElement("li"); li.innerText=val; list.appendChild(li); } }
function readNotes(){ let val=localStorage.getItem("myNotes")||""; if(val) speakText(val); }

// Chat with Friends
let chat=[]; 
function sendMessage(){ let val=document.getElementById("friendInput").value.trim(); if(!val) return; chat.push(val); showChat(); document.getElementById("friendInput").value=""; }
function showChat(){ let list=document.getElementById("chatList"); list.innerHTML=""; chat.forEach(m=>{ let li=document.createElement("li"); li.innerText="💬 "+m; list.appendChild(li); }); }
function readChat(){ chat.forEach(m=>speakText(m)); }

// Load stored data
showInterEvents(); showIntraEvents(); showNotes();