const sezioni = ["Dashboard", "Scuola", "Sport", "Finanze", "Obiettivi", "Progetti", "Knowledge", "AI Assistant"];
const menu = document.getElementById("menu");
const contenuto = document.getElementById("contenuto");

function mostra(nome) {
  contenuto.innerHTML = `<h1>${nome}</h1><p>Sezione in costruzione.</p>`;
}

sezioni.forEach(nome => {
  const b = document.createElement("button");
  b.textContent = nome;
  b.onclick = () => mostra(nome);
  menu.appendChild(b);
});

mostra("Dashboard");
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}