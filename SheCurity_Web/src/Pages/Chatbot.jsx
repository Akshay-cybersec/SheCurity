import React, { useState, useRef, useEffect } from "react";
import { Container, Card, Form, Button, InputGroup, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPaperPlane } from "react-icons/fa";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (input.trim() === "" || loading) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://6ee0-114-143-61-242.ngrok-free.app/api/chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data && data.reply) {
        const botMessage = { text: data.reply, sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((prevMessages) => [...prevMessages, { text: "Error reaching server.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: "-30px" }}>
      <Card style={{ width: "500px", height: "550px", background: "linear-gradient(135deg,rgb(74, 6, 133),rgb(132, 74, 172),rgb(74, 6, 133))" }} className="p-3 shadow-lg">
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-center">Chatbot</Card.Title>
          <div className="flex-grow-1 p-2 border rounded" style={{ height: "350px", overflowY: "auto", background: "rgba(255, 255, 255, 0.1)" }}>
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 my-1 rounded ${msg.sender === "bot" ? "bg-light" : "bg-primary text-white"}`} style={{ textAlign: msg.sender === "bot" ? "left" : "right" }}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
          <Form className="mt-3" onSubmit={(e) => e.preventDefault()}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <Button style={{ background: "linear-gradient(135deg,rgb(74, 6, 133),rgb(132, 74, 172),rgb(74, 6, 133))" }} onClick={sendMessage} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : <FaPaperPlane />}
              </Button>
            </InputGroup>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Chatbot;
