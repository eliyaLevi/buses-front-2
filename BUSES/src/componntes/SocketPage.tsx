import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001", {
  withCredentials: true,
});

interface IChet {
  userName: string;
  message: string;
  timestamp: string;
}
export const SocketPage = () => {
  const [message, setmessage] = useState<string>();
  const [messages, setMessages] = useState<IChet[]>([]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [userName, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  // const [rooms, setRooms] = useState<string[]>([]);

  useEffect(() => {
    socket.on("receiveMessage", (newMessage: IChet) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    socket.on("loadMessages", (messages: [IChet]) => {
      setMessages(messages);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const SelectRoom = () => {
    if (roomName.trim() && userName) {
      socket.emit("joinRoom", roomName);
      setCurrentRoom(roomName);
    }
    alert("כל הכבוד כוכב");
  };

  const sendMessage = () => {
    if (message!.trim()) {
      socket.emit("sendMessageToRoom", { roomName, message, userName });
    }
  };

  return (
    <>
      <div>
        <h1>Real-time Chet</h1>
        {currentRoom && (
          <>
            <div>
              {messages.map((msg, index) => (
                <div key={index}>
                  <h2>{`${msg.userName}:`}</h2>
                  <p>{msg.message}</p>

                  <p>{new Date(msg.timestamp).toLocaleTimeString()}</p>
                </div>
              ))}
            </div>
            {`room : ${roomName}`}
            {/* <label htmlFor="message">message</label> */}

            <input
              type="text"
              value={message}
              onChange={(e) => setmessage(e.target.value)}
              placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
          </>
        )}
        {!currentRoom && (
          <>
            <label htmlFor="userName">userName</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
            />
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button onClick={SelectRoom}>Send</button>
          </>
        )}
      </div>
    </>
  );
};
