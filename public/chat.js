const socket = io();

socket.on("connect", () => {
    console.log("WebSocket Connected");
});

socket.on("message", (message) => {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");

    if (message.sender === username) {
        messageDiv.classList.add("sent");
    } else {
        messageDiv.classList.add("received");
    }

    messageDiv.innerHTML = `<span class="sender-name">${message.sender}</span>: ${message.text}`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
});


document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message');

    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage(); 
        }
    });
});


function sendMessage() {
    const messageText = document.getElementById("message").value;

    if (messageText) {
        socket.emit("message", { sender: username, text: messageText });
        document.getElementById("message").value = "";
    }
}
