const status = document.getElementById("status");
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

const ws = new WebSocket("ws://localhost:5000");

function setStatus(value) {
  status.innerHTML = value;
}

function printMessage(value) {
  const p = document.createElement("p");
  p.innerHTML = value;
  messages.appendChild(p);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  ws.send(input.value);
  input.value = "";
});

ws.onopen = () => setStatus("ONLINE");

ws.onclose = () => setStatus("DISCONNECTED");

ws.onmessage = (response) => printMessage(response.data);
