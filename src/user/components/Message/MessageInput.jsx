import { useState } from "react";

export default function MessageInput({ onSend, onTyping }) {
  const [text, setText] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSend(text);
      setText("");
    } else {
      onTyping();
    }
  };

  return (
    <div className="p-3 bg-gray-900 flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 p-2 rounded bg-gray-700 text-white"
      />
      <button
        onClick={() => {
          onSend(text);
          setText("");
        }}
        className="bg-violet-500 px-4 rounded"
      >
        Send
      </button>
    </div>
  );
}
