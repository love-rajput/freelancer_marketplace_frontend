 // frontend/script.js
const socket = io();
const msgInput = document.getElementById('msgInput');
const messagesUl = document.getElementById('messages');

function renderMessages(messages) {
  messagesUl.innerHTML = '';
  messages.forEach(msg => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${msg.text}</span>
      <button onclick="editMessage(${msg.id}, '${msg.text}')">Edit</button>
      <button onclick="deleteMessage(${msg.id})">Delete</button>
    `;
    messagesUl.appendChild(li);
  });
}

async function loadMessages() {
  const res = await fetch('/messages');
  const msgs = await res.json();
  renderMessages(msgs);
}

async function sendMessage() {
  const text = msgInput.value;
  if (!text) return;
  await fetch('/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  msgInput.value = '';
}

async function deleteMessage(id) {
  await fetch(`/messages/${id}`, { method: 'DELETE' });
}

async function editMessage(id, oldText) {
  const newText = prompt("Edit your message", oldText);
  if (newText) {
    await fetch(`/messages/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newText })
    });
  }
}

socket.on('message', msg => loadMessages());
socket.on('update', msg => loadMessages());
socket.on('delete', id => loadMessages());

loadMessages();
