import React, { useState } from 'react';
import { Users, Send } from 'lucide-react';

const ChatSection: React.FC = () => {
  const [groupName, setGroupName] = useState('Study Group');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        {isEditing ? (
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            onBlur={() => setIsEditing(false)}
            className="bg-white/30 rounded px-2 py-1 text-white"
            autoFocus
          />
        ) : (
          <h3 className="text-xl font-semibold text-white" onClick={() => setIsEditing(true)}>
            {groupName}
          </h3>
        )}
        <button className="text-white hover:text-orange-300 flex items-center">
          <Users size={24} className="mr-2" />
          <span className="text-sm">Add friend</span>
        </button>
      </div>
      <div className="flex-grow bg-white/20 rounded-lg p-4 mb-4 overflow-y-auto">
        {/* Chat messages will go here */}
        <p className="text-white">Welcome to the chat!</p>
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow bg-white/30 rounded-l-lg px-4 py-2 text-white placeholder-white/70"
        />
        <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-r-lg px-4 py-2">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
