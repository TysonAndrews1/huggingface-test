import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
//replace with the proper URL for whichever AI you are using
const API_KEY = "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"

function App() {
    const [userInput, setUserInput] = useState("");
    const [response, setResponse] = useState("");

    const sendMessage = async () => {
        console.log(userInput);
        
        if (!userInput) return;

        try {
            const res = await axios.post(
                API_URL,
                { inputs: userInput},
                { headers: { Authorization: `Bearer ${API_KEY}` } }
            );
            console.log(res);
            
            setResponse(res.data[0].summary_text || "No response");
        } catch (error) {
            console.error("Error:", error);
            setResponse("Error fetching response");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Hugging Face AI Chat</h2>
            <textarea
                rows="4"
                cols="50"
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
            />
            <br />
            <button onClick={sendMessage}>Send</button>
            <p><strong>Response:</strong> {response}</p>
        </div>
    );
}

export default App;
