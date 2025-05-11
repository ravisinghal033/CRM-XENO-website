"use client";
import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatbotWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");

    try {
      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama3-70b-8192",
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              ...messages,
              { role: "user", content: userMsg },
            ],
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.choices) {
        throw new Error("Invalid response from Groq");
      }

      const botReply = data.choices?.[0]?.message?.content || "No response.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botReply },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error contacting Groq API." },
      ]);
    }
  };

  // return (

  //   <div
  //     style={{
  //       position: "fixed",
  //       bottom: 20,
  //       right: 20,
  //       width: 260,
  //       height: 450,
  //       backgroundColor: "#000000",
  //       border: "1px solid #ccc",
  //       borderRadius: 10,
  //       fontFamily: "sans-serif",
  //       boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  //       display: "flex",
  //       flexDirection: "column",
  //       zIndex: 9999,
  //     }}
  //   >
  //     <div
  //       style={{
  //         height: 300,
  //         overflowY: "auto",
  //         padding: 10,
  //         borderBottom: "1px solid #ddd",
  //       }}
  //     >
  //       {messages.map((msg, idx) => (
  //         <div key={idx} style={{ marginBottom: 10 }}>
  //           <strong>{msg.role === "user" ? "You" : "Bot"}:</strong>{" "}
  //           <span style={{ whiteSpace: "pre-wrap" }}>{msg.content}</span>
  //         </div>
  //       ))}
  //       <div ref={messagesEndRef} />
  //     </div>

  //     <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
  //       <input
  //         type="text"
  //         placeholder="Type a message..."
  //         value={input}
  //         onChange={(e) => setInput(e.target.value)}
  //         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
  //         style={{
  //           flex: 1,
  //           padding: 10,
  //           border: "none",
  //           borderRight: "1px solid #ddd",
  //           outline: "none",
  //           color: "#000",
  //           borderBottomRightRadius: 10,
  //           borderBottomLeftRadius: 10,
  //         }}
  //       />
  //       <button
  //         onClick={sendMessage}
  //         style={{
  //           padding: "10px 16px",
  //           background: "#007bff",
  //           color: "white",
  //           border: "none",
  //           cursor: "pointer",
  //           borderBottomRightRadius: 10,
  //           borderBottomLeftRadius: 10,
  //         }}
  //       >
  //         Send
  //       </button>
  //     </div>
  //   </div>
  // );

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 240,
        height: 350,
        backgroundColor: "#000000",
        border: "1px solid #ccc",
        borderRadius: 20,
        fontFamily: "sans-serif",
        boxShadow: "0 0 15px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        zIndex: 9999,
      }}
    >
      {/* Chat messages container */}
      <div
        style={{
          flex: 1, // take available space
          overflowY: "auto",
          padding: 10,
          borderBottom: "1px solid #ddd",
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 10 }}>
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong>{" "}
            <span style={{ whiteSpace: "pre-wrap" }}>{msg.content}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar fixed to bottom */}
      <div
        style={{
                display: "flex",
              borderTop: "1px solid #ddd",
             padding: 6,
           backgroundColor: "#fff",
           borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          boxSizing: "border-box",
        }}
      >
        {/* <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{
            flex: 1,
            padding: 8,
            border: "1px solid #ccc",
            borderRadius: 8,
            marginRight: 6,
            outline: "none",
            color: "#000",
          }}
        /> */}
         <input
    type="text"
    placeholder="Type a message..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    style={{
      flex: 1,
      padding: "6px 8px",
      border: "1px solid #ccc",
      borderRadius: 8,
      outline: "none",
      fontSize: 12,
      color: "#000",
      boxSizing: "border-box",
    }}
  />
        {/* <button
          onClick={sendMessage}
          style={{
            padding: "6px 10px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Send
        </button> */}
         <button
    onClick={sendMessage}
    style={{
      marginLeft: 4,
      padding: "6px 8px",
      background: "#007bff",
      color: "white",
      border: "none",
      borderRadius: 8,
      fontSize: 12,
      cursor: "pointer",
      flexShrink: 0,
    }}
  >
    Send
  </button>
      </div>
    </div>
  );
}