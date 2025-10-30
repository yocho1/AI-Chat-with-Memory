from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, save_message, get_history
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

# Configure Gemini API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize the database
init_db()

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    save_message("user", user_message)

    # Load chat history (memory)
    messages = get_history()

    # Prepare conversation for Gemini
    chat_context = "\n".join([f"{m['role']}: {m['content']}" for m in messages])

    # Send message to Gemini
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(chat_context)

    ai_reply = response.text.strip()
    save_message("assistant", ai_reply)

    return jsonify({"reply": ai_reply})

@app.route("/history", methods=["GET"])
def history():
    return jsonify(get_history())

if __name__ == "__main__":
    app.run(debug=True)
