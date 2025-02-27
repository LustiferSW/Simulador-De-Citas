const OPENAI_API_KEY = "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"; // Reemplaza con tu clave de API de OpenAI

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
async function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  const chatMessages = document.getElementById("chat-messages");

  // Mostrar el mensaje del usuario
  if (userInput.trim() !== "") {
    chatMessages.innerHTML += `<div class="user-message">Tú: ${userInput}</div>`;
    document.getElementById("user-input").value = ""; // Limpiar el campo de texto

    // Simular la respuesta de Alex usando OpenAI
    try {
      const alexResponse = await getAlexResponse(userInput);
      chatMessages.innerHTML += `<div class="alex-message">Alex: ${alexResponse}</div>`;
    } catch (error) {
      console.error("Error al obtener la respuesta de Alex:", error);
      chatMessages.innerHTML += `<div class="alex-message">Alex: ¡Ups! Algo salió mal. Inténtalo de nuevo.</div>`;
    }

    chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar el chat hacia abajo
  }
}

// Función para obtener la respuesta de Alex usando OpenAI
async function getAlexResponse(userInput) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // Usa el modelo GPT-3.5
      messages: [
        {
          role: "system",
          content: "Eres Alex, una compañera de universidad amigable y divertida. Responde de manera natural y simpática.",
        },
        {
          role: "user",
          content: userInput,
        },
      ],
      max_tokens: 100, // Límite de longitud de la respuesta
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
