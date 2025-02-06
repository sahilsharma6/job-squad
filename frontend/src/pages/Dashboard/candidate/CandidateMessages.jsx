import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Send, Phone, Video, MoreVertical, Search, Menu } from "lucide-react";

export const CandidateMessages = () => {
  const [messages, setMessages] = React.useState([
    { id: 1, text: "Hey, how are you?", sender: "other", time: "9:41 AM" },
    { id: 2, text: "I'm good, thanks! How about you?", sender: "self", time: "9:42 AM" },
    { id: 3, text: "Just working on some new projects. It's been quite busy lately!", sender: "other", time: "9:45 AM" },
    { id: 4, text: "That sounds interesting! What kind of projects?", sender: "self", time: "9:47 AM" },
    { id: 5, text: "Mostly web development stuff. Working with React and some new UI libraries.", sender: "other", time: "9:50 AM" }
  ]);
  
  const [newMessage, setNewMessage] = React.useState("");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    <div className="flex flex-col h-screen max-h-[600px] bg-gray-50 relative">
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <aside
          className={`
            w-full md:w-80 bg-white absolute md:relative inset-y-0 left-0
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 z-30
          `}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-10"
                />
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              {[1, 2, 3, 4, 5].map((contact) => (
                <div
                  key={contact}
                  className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b"
                  onClick={() => setIsSidebarOpen(false)}
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
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col w-full bg-white">
          {/* Header */}
          <header className="flex items-center gap-4 p-4 border-b bg-white">
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-3 flex-1">
              <Avatar>
                <AvatarImage src={`/api/placeholder/32/32`} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </header>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 max-w-3xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'self' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-[85%] md:max-w-[70%] shadow-sm
                      ${message.sender === 'self'
                        ? 'bg-blue-500 text-white rounded-l-lg rounded-tr-lg'
                        : 'bg-gray-100 rounded-r-lg rounded-tl-lg'
                      } p-3
                    `}
                  >
                    <p className="text-sm md:text-base">{message.text}</p>
                    <p className={`text-xs ${
                      message.sender === 'self' ? 'text-blue-100' : 'text-gray-500'
                    } mt-1`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center gap-3">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={handleSend} 
                disabled={!newMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CandidateMessages;