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
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

try:
    # Test the API key by listing available models
    genai.configure(api_key=api_key)
    print("Available models:", [m.name for m in genai.list_models()])
except Exception as e:
    print(f"Error configuring Gemini API: {str(e)}")
    raise

# Initialize the database
init_db()

@app.route("/chat", methods=["POST"])
def chat():
    try:
        # Get and validate the input
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data received"}), 400
            
        user_message = data.get("message", "").strip()
        if not user_message:
            return jsonify({"error": "Empty message"}), 400
        
        print(f"Received message: {user_message}")    
        save_message("user", user_message)

        try:
            # Initialize the chat model
            model = genai.GenerativeModel('gemini-pro-latest')
            chat = model.start_chat()
            
            print("Sending message to chat...")
            response = chat.send_message(user_message)
            print(f"Response received type: {type(response)}")
            print(f"Response content: {response}")
            
            if hasattr(response, 'text'):
                ai_reply = response.text.strip()
                if ai_reply:
                    print(f"AI Reply: {ai_reply}")
                    save_message("assistant", ai_reply)
                    return jsonify({"reply": ai_reply})
                else:
                    print("Empty response text received")
                    return jsonify({"error": "Empty response from AI"}), 500
            else:
                print(f"Response has no text attribute. Available attributes: {dir(response)}")
                return jsonify({"error": "Invalid response format"}), 500
            
        except Exception as model_error:
            print(f"Model error: {str(model_error)}")
            print(f"Model error type: {type(model_error)}")
            print(f"Model error details: {traceback.format_exc()}")
            return jsonify({"error": f"AI model error: {str(model_error)}"}), 500
            
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error in chat endpoint:\n{error_details}")
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@app.route("/history", methods=["GET"])
def history():
    return jsonify(get_history())

if __name__ == "__main__":
    app.run(debug=True)
