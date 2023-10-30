const emojiIcon = document.getElementById('emoji-icon');
const emojiList = document.getElementById('emoji-list');
const messageInput = document.getElementById('message');

fetch('https://emoji-api.com/emojis?access_key=c8c894c9db6c83b7bfcd8cb84cad5bb52fcbb340')
  .then(response => response.json())
  .then(data => {
    data.forEach(emoji => {
      const button = document.createElement('button');
      button.innerHTML = emoji.character;
      button.addEventListener('click', () => {

        messageInput.value += emoji.character;
      });
      emojiList.appendChild(button);
    });
  })
  .catch(error => {
    console.log('Erro ao obter emojis:', error);
});

emojiIcon.addEventListener('click', () => {
  emojiList.style.display = emojiList.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', function(event) {
  if (!emojiIcon.contains(event.target) && !emojiList.contains(event.target)) {
    emojiList.style.display = 'none';
  }
});
