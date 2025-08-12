import React, { useState } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [ids, setIds] = useState([]);
  const [vocab, setVocab] = useState({});
  const [reverseVocab, setReverseVocab] = useState({});
  const [decodedText, setDecodedText] = useState("");

  // Tokenizer: Assigns a number to each unique character
  const tokenize = () => {
    if (!text.trim()) {
      alert("Please enter some text first!");
      return;
    }
    
    const chars = text.split("");
    const newVocab = { ...vocab };
    let nextId = Object.keys(newVocab).length + 1;

    const tokenIds = chars.map((char) => {
      if (!(char in newVocab)) {
        newVocab[char] = nextId++;
      }
      return newVocab[char];
    });

    setVocab(newVocab);
    setReverseVocab(
      Object.fromEntries(Object.entries(newVocab).map(([k, v]) => [v, k]))
    );
    setIds(tokenIds);
  };

  // Detokenizer: Converts IDs back to text
  const detokenize = () => {
    const decoded = ids.map((id) => reverseVocab[id] || "").join("");
    setDecodedText(decoded);
  };

  // Clear all data
  const clearAll = () => {
    setText("");
    setIds([]);
    setVocab({});
    setReverseVocab({});
    setDecodedText("");
  };

  return (
    <div style={{ 
      padding: "20px", 
      fontFamily: "Arial, sans-serif", 
      maxWidth: "600px", 
      margin: "0 auto"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Custom Tokenizer
      </h1>
      
      <p style={{ textAlign: "center", marginBottom: "30px", color: "#666" }}>
        Convert text to tokens and vice versa
      </p>

      {/* Input Section */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
          Enter your text:
        </label>
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type text here..."
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px"
          }}
        />
        <div style={{ marginTop: "10px" }}>
          <button 
            onClick={tokenize}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              fontSize: "14px",
              cursor: "pointer",
              marginRight: "10px"
            }}
          >
            Tokenize
          </button>
          <button 
            onClick={clearAll}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              fontSize: "14px",
              cursor: "pointer"
            }}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Token Output */}
      {ids.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Token IDs:</h3>
          <div style={{
            backgroundColor: "#f8f9fa",
            padding: "10px",
            borderRadius: "4px",
            fontFamily: "monospace",
            fontSize: "14px",
            border: "1px solid #dee2e6"
          }}>
            {JSON.stringify(ids)}
          </div>
          <button 
            onClick={detokenize}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              fontSize: "14px",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            Detokenize
          </button>
        </div>
      )}

      {/* Detokenizer Output */}
      {decodedText && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Decoded Text:</h3>
          <div style={{
            backgroundColor: "#f8f9fa",
            padding: "10px",
            borderRadius: "4px",
            fontSize: "14px",
            border: "1px solid #dee2e6"
          }}>
            {decodedText}
          </div>
        </div>
      )}

      {/* Vocabulary */}
      {Object.keys(vocab).length > 0 && (
        <div>
          <h3>Vocabulary:</h3>
          <div style={{
            backgroundColor: "#f8f9fa",
            padding: "10px",
            borderRadius: "4px",
            fontFamily: "monospace",
            fontSize: "12px",
            maxHeight: "200px",
            overflowY: "auto",
            border: "1px solid #dee2e6"
          }}>
            {JSON.stringify(vocab, null, 2)}
          </div>
          <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
            Total unique characters: <strong>{Object.keys(vocab).length}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default App;