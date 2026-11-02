const SUPABASE_URL = "https://tiuoehemwirrvhmectgp.supabase.co";
const SUPABASE_KEY = "sb_publishable_InJSLYIDKR-h8T2rqTsAJQ_gYjpavNv";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const sezioni = ["Dashboard", "Scuola", "Sport", "Finanze", "Obiettivi", "Progetti", "Knowledge", "AI Assistant"];
const menu = document.getElementById("menu");
const contenuto = document.getElementById("contenuto");

function mostra(nome) {
  contenuto.innerHTML = `<h1>${nome}</h1><p>Sezione in costruzione.</p>`;
}

function mostraApp() {
  menu.innerHTML = "";
  sezioni.forEach(nome => {
    const b = document.createElement("button");
    b.textContent = nome;
    b.onclick = () => mostra(nome);
    menu.appendChild(b);
  });
  const esci = document.createElement("button");
  esci.textContent = "Esci";
  esci.onclick = () => db.auth.signOut();
  menu.appendChild(esci);
  mostra("Dashboard");
}

function mostraLogin() {
  menu.innerHTML = "";
  contenuto.innerHTML = `
    <h1>Accedi</h1>
    <input id="email" type="email" placeholder="Email" autocomplete="username">
    <input id="password" type="password" placeholder="Password" autocomplete="current-password">
    <button id="entra">Entra</button>
    <p id="errore"></p>`;
  document.getElementById("entra").onclick = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const { error } = await db.auth.signInWithPassword({ email, password });
    if (error) {
      document.getElementById("errore").textContent = "Email o password non corretti.";
    }
  };
}

db.auth.onAuthStateChange((evento, sessione) => {
  if (evento === "TOKEN_REFRESHED") return;
  if (sessione) {
    mostraApp();
  } else {
    mostraLogin();
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}