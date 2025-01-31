
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Send, Phone, Video, MoreVertical } from "lucide-react";

export const  CompanyMessages= () => {
  const [messages, setMessages] = React.useState([
    { id: 1, text: "Hey, how are you?", sender: "other", time: "9:41 AM" },
    { id: 2, text: "I'm good, thanks! How about you?", sender: "self", time: "9:42 AM" },
    { id: 3, text: "Just working on some new projects. It's been quite busy lately!", sender: "other", time: "9:45 AM" },
    { id: 4, text: "That sounds interesting! What kind of projects?", sender: "self", time: "9:47 AM" },
    { id: 5, text: "Mostly web development stuff. Working with React and some new UI libraries.", sender: "other", time: "9:50 AM" }
  ]);
  
  const [newMessage, setNewMessage] = React.useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        text: newMessage,
        sender: "self",
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      }]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen max-h-[600px] overflow-hidden">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r bg-gray-50/50">
        <div className="p-4 border-b">
          <Input placeholder="Search conversations..." className="w-full" />
        </div>
        <ScrollArea className="h-[calc(100%-73px)]">
          {[1, 2, 3, 4, 5].map((contact) => (
            <div
              key={contact}
              className="flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer border-b"
            >
              <Avatar>
                <AvatarImage src={`/api/placeholder/32/32`} />
                <AvatarFallback>U{contact}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="font-medium truncate">User {contact}</p>
                  <span className="text-xs text-gray-500">9:41 AM</span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  Latest message preview...
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`/api/placeholder/32/32`} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">John Doe</h3>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'self' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] ${
                    message.sender === 'self'
                      ? 'bg-blue-500 text-white rounded-l-lg rounded-tr-lg'
                      : 'bg-gray-100 rounded-r-lg rounded-tl-lg'
                  } p-3`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs ${
                    message.sender === 'self' ? 'text-blue-100' : 'text-gray-500'
                  } mt-1`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <Card className="p-4 m-4 mt-0">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!newMessage.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
