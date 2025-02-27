function startGame() {
  const genderSelection = document.querySelector('input[name="gender"]:checked').value;
  let characterGender;

  if (genderSelection === "aleatorio") {
    const random = Math.random();
    characterGender = random < 0.33 ? "hombre" : random < 0.66 ? "mujer" : "no binario";
  } else {
    characterGender = genderSelection;
  }

  // Ocultar la creación de personaje y mostrar el juego
  document.getElementById("character-creation").style.display = "none";
  document.getElementById("game").style.display = "block";

  // Mostrar la información del personaje
  document.getElementById("character-info").innerText = `Tu personaje es Alex, una compañera de universidad.`;
}

// Función para enviar mensajes
function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  const chatMessages = document.getElementById("chat-messages");

  // Mostrar el mensaje del usuario
  if (userInput.trim() !== "") {
    chatMessages.innerHTML += `<div class="user-message">Tú: ${userInput}</div>`;
    document.getElementById("user-input").value = ""; // Limpiar el campo de texto

    // Simular la respuesta de Alex
    setTimeout(() => {
      const alexResponse = getAlexResponse(userInput);
      chatMessages.innerHTML += `<div class="alex-message">Alex: ${alexResponse}</div>`;
      chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar el chat hacia abajo
    }, 1000); // Retraso de 1 segundo para simular que Alex está "pensando"
  }
}

// Función para generar respuestas de Alex
function getAlexResponse(userInput) {
  const responses = [
    "¡Hola! ¿Cómo estás?",
    "¿Qué tal tus clases?",
    "Me encanta la programación, ¿y a ti?",
    "¿Has hecho algún proyecto interesante últimamente?",
    "¡Claro! Podemos trabajar juntos en eso.",
    "¿Te gustaría tomar un café después de clase?",
    "Jajaja, ¡qué gracioso!",
    "No sé, ¿tú qué opinas?",
    "¡Eso suena genial!",
    "¿En qué asignatura necesitas ayuda?",
  ];

  // Seleccionar una respuesta aleatoria
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}