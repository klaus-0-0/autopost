import React, { useState } from 'react';
import config from "../config"
function Aiassistant() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Add user message
        const userMessage = { role: 'user', content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(`${config.apiUrl}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.reply) {
                setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
            } else {
                throw new Error('No reply from server');
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages([...newMessages, {
                role: 'assistant',
                content: `Error: ${error.message}. Please check if the backend server is running.`
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-transparent shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className=" text-xl font-bold text-gray-800">AI Content Assistant</h2>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto mb-4">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                        <p>Start chatting to generate content ideas</p>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-3 p-3 rounded-lg max-w-[90%] ${msg.role === 'user'
                                    ? 'bg-blue-500 text-white ml-auto'
                                    : 'bg-gray-100 text-gray-800 mr-auto'
                                }`}
                        >
                            <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                        </div>
                    ))
                )}
                {isLoading && (
                    <div className="p-3 rounded-lg bg-gray-100 text-gray-600 max-w-[90%] mr-auto">
                        <div className="flex items-center gap-2 text-sm">
                            <span>Thinking</span>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask for content ideas..."
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                    disabled={isLoading}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                />
                <button
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-400 text-sm cursor-pointer"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Aiassistant;