const tools=[
["📱","Générateur de bio Instagram","social","Crée une bio en quelques secondes.","bio"],
["🔢","Compteur de texte","text","Compte mots, caractères et lignes.","counter"],
["🔠","Convertisseur de texte","text","Majuscules, minuscules et titre.","convert"],
["#️⃣","Générateur de hashtags","social","Crée une liste de hashtags pertinents.","hashtags"],
["▶️","Générateur de titres YouTube","creator","Trouve des idées de titres.","youtube"],
["👤","Générateur de username","social","Crée des noms d'utilisateur.","username"],
["🔐","Générateur de mot de passe","utility","Génère un mot de passe aléatoire.","password"],
["😀","Emoji Picker","social","Copie rapidement des emojis.","emoji"],
["🔗","Générateur de slug","utility","Transforme un titre en URL propre.","slug"],
["💡","Idées de contenu","creator","Génère des idées de publications.","ideas"],
["🧮","Calculatrice","utility","Effectue un calcul simple.","calculator"],
["🎨","Couleur HEX","utility","Choisis et copie une couleur HEX.","color"],
["✉️","Email professionnel","creator","Crée une adresse email de base.","email"],
["💬","Citation","creator","Génère une citation courte.","quote"],
["📅","Date & heure","utility","Affiche la date et l'heure locales.","date"],
["📝","Capitalisation","text","Met la première lettre de chaque phrase en majuscule.","capitalize"]
];
let cat="all";
const grid=document.querySelector("#grid"), search=document.querySelector("#search");
function render(){let q=(search.value||"").toLowerCase();grid.innerHTML=tools.filter(t=>(cat==="all"||t[2]===cat)&&t[1].toLowerCase().includes(q)).map(t=>`<article class="card"><div class="emoji">${t[0]}</div><h3>${t[1]}</h3><p>${t[3]}</p><button onclick="openTool('${t[4]}','${t[1]}')">Utiliser →</button></article>`).join("")}
render();search.addEventListener("input",render);
document.querySelectorAll(".chips button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".chips button").forEach(x=>x.classList.remove("active"));b.classList.add("active");cat=b.dataset.cat;render()});
const modal=document.querySelector("#modal"), body=document.querySelector("#toolBody");
function field(ph,id="input"){return `<textarea id="${id}" class="field" rows="4" placeholder="${ph}"></textarea>`}
function openTool(type,title){
let h=`<h2>${title}</h2>`;
const map={
bio:`${field("Décris ton activité, ton style ou ton sujet...")}<button class="copy" onclick="genBio()">Générer</button><div id="out" class="result"></div>`,
counter:`${field("Colle ton texte ici...")}<button class="copy" onclick="countText()">Compter</button><div id="out" class="result"></div>`,
convert:`${field("Ton texte...")}<div class="toolrow"><button class="copy" onclick="convert('upper')">MAJUSCULES</button><button class="copy" onclick="convert('lower')">minuscules</button><button class="copy" onclick="convert('title')">Titre</button></div><div id="out" class="result"></div>`,
hashtags:`${field("Sujet : football, beauté, voyage...")}<button class="copy" onclick="genHash()">Générer</button><div id="out" class="result"></div>`,
youtube:`${field("Sujet de ta vidéo...")}<button class="copy" onclick="genYT()">Générer</button><div id="out" class="result"></div>`,
username:`${field("Mot ou thème (ex : creator)...")}<button class="copy" onclick="genUser()">Générer</button><div id="out" class="result"></div>`,
password:`<input id="input" class="field" type="number" min="8" max="40" value="16" placeholder="Longueur"><button class="copy" onclick="genPass()">Générer</button><div id="out" class="result"></div>`,
emoji:`<div class="result" id="out">😀 😂 🔥 🚀 ❤️ ✨ 😎 🎯 💯 🥶 👑 💡 📱 🎬 ⚽ 🏆</div><button class="copy" onclick="copyOut()">Copier</button>`,
slug:`${field("Mon titre d'article...")}<button class="copy" onclick="genSlug()">Créer le slug</button><div id="out" class="result"></div>`,
ideas:`${field("Thème de contenu...")}<button class="copy" onclick="genIdeas()">Générer</button><div id="out" class="result"></div>`,
calculator:`<input id="input" class="field" placeholder="Ex : (125*24)+50"><button class="copy" onclick="calc()">Calculer</button><div id="out" class="result"></div>`,
color:`<input id="color" type="color" value="#6d5dfc" class="field" oninput="showColor()"><div id="out" class="result">#6D5DFC</div><button class="copy" onclick="copyOut()">Copier</button>`,
email:`${field("Prénom / nom / activité...")}<button class="copy" onclick="genEmail()">Créer</button><div id="out" class="result"></div>`,
quote:`<button class="copy" onclick="genQuote()">Nouvelle citation</button><div id="out" class="result"></div>`,
date:`<div id="out" class="result">${new Date().toLocaleString("fr-FR")}</div>`,
capitalize:`${field("Colle ton texte...")}<button class="copy" onclick="capitalize()">Transformer</button><div id="out" class="result"></div>`
};
body.innerHTML=h+(map[type]||"<p>Outil indisponible.</p>");modal.classList.add("show");if(type==="quote")genQuote()
}
function closeTool(){modal.classList.remove("show")}
modal.addEventListener("click",e=>{if(e.target===modal)closeTool()});
function val(){return document.querySelector("#input")?.value||""}
function out(x){document.querySelector("#out").textContent=x}
function copyOut(){navigator.clipboard?.writeText(document.querySelector("#out").textContent);alert("Copié !")}
function genBio(){out("✨ "+val()+"\n🎬 Créateur de contenu\n🚀 Conseils & idées\n📩 Contact en DM")}
function countText(){let x=val();out(`Mots : ${x.trim()?x.trim().split(/\s+/).length:0}\nCaractères : ${x.length}\nCaractères sans espaces : ${x.replace(/\s/g,"").length}\nLignes : ${x?x.split(/\n/).length:0}`)}
function convert(t){let x=val();out(t==="upper"?x.toUpperCase():t==="lower"?x.toLowerCase():x.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase()))}
function tags(){return ["viral","fyp","creator","contentcreator","socialmedia","tips","digitalcreator","trending","community","inspiration"]}
function genHash(){let x=val().trim().toLowerCase().replace(/[^a-z0-9à-ÿ]+/gi,"");out("#"+x+" "+tags().map(a=>"#"+a).join(" "))}
function genYT(){let x=val();out(`🔥 ${x} : 7 choses que tu dois connaître\n🚀 ${x} : le guide simple pour débuter\n💡 5 astuces sur ${x} que peu de gens connaissent`)}
function genUser(){let x=val().toLowerCase().replace(/\s+/g,"");out([x+"pro",x+"lab","the"+x,x+"hub","x"+x,""+x+"daily"].join("\n"))}
function genPass(){let n=Math.max(8,Math.min(40,Number(val())||16)),s="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*";let r="";for(let i=0;i<n;i++)r+=s[Math.floor(Math.random()*s.length)];out(r)}
function genSlug(){out(val().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""))}
function genIdeas(){let x=val();out([`5 erreurs à éviter avec ${x}`,`Guide débutant : ${x}`,`7 astuces rapides sur ${x}`,`Avant / après : ${x}`,`Les outils gratuits pour ${x}`,`FAQ : les questions sur ${x}`].join("\n"))}
function calc(){try{let e=val().replace(/[^0-9+\-*/().% ]/g,"");out(String(Function('"use strict";return ('+e+')')()))}catch{out("Expression invalide.")}}
function showColor(){out(document.querySelector("#color").value.toUpperCase())}
function genEmail(){let x=val().trim().toLowerCase().replace(/[^a-z0-9]+/g,".");out(x+"@exemple.com")}
function genQuote(){out(["Les petits progrès répétés créent de grands résultats.","Commence simple, améliore chaque jour.","La constance transforme une idée en projet."][Math.floor(Math.random()*3)])}
function capitalize(){out(val().toLowerCase().replace(/(^|[.!?]\s+)([a-zà-ÿ])/g,(m,a,b)=>a+b.toUpperCase()))}
document.querySelector("#themeBtn").onclick=()=>{document.body.classList.toggle("dark");localStorage.theme=document.body.classList.contains("dark")?"dark":"light"};if(localStorage.theme==="dark")document.body.classList.add("dark");
