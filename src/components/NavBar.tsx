"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, MessageSquare, Send, Bot, User, ChevronRight, Sparkles, Loader2, Copy, Check, Eraser } from 'lucide-react';
import { useAuth, SignInButton } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { UserButtonCustom } from '@/components/clerk/UserButton';
import { sendToOpenRouter, OpenRouterMessage } from '@/lib/openRouter';
import ReactMarkdown from 'react-markdown';
import "@/styles/components/NavBar.css";
type NavItem = {
    label: string;
    href: string;
};
type MessageType = 'user' | 'bot';
interface ChatMessage {
    type: MessageType;
    text: string;
    id: string;
}
type FloatingNavbarProps = {
    navItems: NavItem[];
};
export default function FloatingNavbar({ navItems }: FloatingNavbarProps) {
    const { isSignedIn, isLoaded } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            type: 'bot',
            text: 'Hello! I\'m your AI assistant. How can I help you today?\n\nYou can use **markdown** to format your messages!',
            id: 'initial-message'
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState<Record<string, boolean>>({});
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatInputRef = useRef<HTMLTextAreaElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    useEffect(() => {
        if (messagesEndRef.current && isChatOpen) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages, isChatOpen]);
    useEffect(() => {
        if (isChatOpen && chatInputRef.current) {
            setTimeout(() => {
                chatInputRef.current?.focus();
            }, 300);
        }
    }, [isChatOpen]);
    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
        if (isMobileMenuOpen)
            setIsMobileMenuOpen(false);
    };
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (isChatOpen)
            setIsChatOpen(false);
    };
    const generateId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    };
    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(prev => ({ ...prev, [id]: true }));
            setTimeout(() => {
                setIsCopied(prev => ({ ...prev, [id]: false }));
            }, 2000);
        });
    };
    const clearChat = () => {
        setChatMessages([
            {
                type: 'bot',
                text: 'Chat cleared. How else can I assist you?',
                id: generateId()
            },
        ]);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatMessage.trim() || isLoading)
            return;
        const userMsgId = generateId();
        const userMessage = {
            type: 'user' as MessageType,
            text: chatMessage.trim(),
            id: userMsgId
        };
        setChatMessages(prev => [...prev, userMessage]);
        setChatMessage('');
        setIsLoading(true);
        try {
            const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "";
            const messageHistory: OpenRouterMessage[] = chatMessages.map(msg => ({
                role: msg.type === 'user' ? 'user' : 'assistant',
                content: msg.text
            }));
            messageHistory.push({
                role: 'user',
                content: userMessage.text
            });
            const aiResponse = await sendToOpenRouter(messageHistory, apiKey);
            setChatMessages(prev => [
                ...prev,
                {
                    type: 'bot',
                    text: aiResponse,
                    id: generateId()
                }
            ]);
        }
        catch (error) {
            console.error('Error sending message:', error);
            setChatMessages(prev => [
                ...prev,
                {
                    type: 'bot',
                    text: "Sorry, I encountered an error. Please try again.",
                    id: generateId()
                }
            ]);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit();
        }
    };
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setChatMessage(e.target.value);
        if (chatInputRef.current) {
            chatInputRef.current.style.height = 'auto';
            chatInputRef.current.style.height = `${Math.min(chatInputRef.current.scrollHeight, 200)}px`;
        }
    };
    if (!isMounted) {
        return (<div className="fixed top-0 left-0 right-0 z-50 h-16 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800"/>);
    }
    return (<div className="relative w-full font-sans">
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3 md:px-6">
        <nav className="mx-auto max-w-7xl relative">
          <div className="absolute inset-0 navbar-gradient rounded-xl"></div>
          
          <div className="bg-gray-900/80 rounded-xl shadow-lg border border-gray-700 text-white flex items-center justify-between h-16 px-4 md:px-6 relative overflow-hidden navbar-glow">
            <Link href="/" className="flex items-center group transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg w-8 h-8 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
                  <Sparkles size={16} className="text-white group-hover:scale-110 transition-all duration-300"/>
                </div>
                <div className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-xl">
                  <span className="flex items-center gap-1">
                    <span className="hidden md:inline">AI</span>
                    <span>Vision</span>
                  </span>
                </div>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {navItems.map((item) => (<Link key={item.label} href={item.href} className="text-slate-200 hover:text-white text-sm font-medium relative group py-1.5">
                  <span className="transition-all duration-300 ease-out group-hover:text-white relative z-10">
                    {item.label}
                  </span>
                  <span className="absolute inset-0 h-full w-full">
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
                  </span>
                </Link>))}
            </div>

            <div className="flex items-center gap-3">
              <motion.button onClick={toggleChat} whileTap={{ scale: 0.95 }} className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-all duration-300 ${isChatOpen
            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20'
            : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}>
                <MessageSquare size={16} className={`transition-all duration-300 ${isChatOpen ? 'rotate-12' : ''}`}/>
                <span className="hidden md:inline">Chat</span>
              </motion.button>
              
              {isLoaded && (<div className="flex items-center">
                  {isSignedIn ? (<UserButtonCustom />) : (<SignInButton mode="modal">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white/5 text-sm font-medium px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 border border-white/10 flex items-center gap-1.5">
                        <span>Sign in</span>
                      </motion.button>
                    </SignInButton>)}
                </div>)}

              <motion.button className="md:hidden bg-white/5 p-2 rounded-lg text-slate-200 hover:text-white transition-all hover:bg-white/10 border border-white/10" onClick={toggleMobileMenu} whileTap={{ scale: 0.95 }}>
                <AnimatePresence mode="wait" initial={false}>
                  {isMobileMenuOpen ? (<motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X size={18}/>
                    </motion.div>) : (<motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu size={18}/>
                    </motion.div>)}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (<motion.div className="md:hidden mt-2" initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}>
                <div className="bg-gray-900/80 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
                  <div className="flex flex-col p-2 space-y-1">
                    {navItems.map((item, index) => (<motion.div key={item.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05, duration: 0.2 }}>
                        <Link href={item.href} className="text-slate-200 hover:text-white text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                          {item.label}
                          <ChevronRight size={14} className="text-slate-400"/>
                        </Link>
                      </motion.div>))}
                  </div>
                </div>
              </motion.div>)}
          </AnimatePresence>
        </nav>
      </header>

      <AnimatePresence>
        {isChatOpen && (<motion.div className="fixed top-24 md:top-20 inset-x-0 z-40 px-4 md:px-0 md:right-6 md:left-auto md:w-[450px]" initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            <div className="mx-auto max-w-md md:max-w-none relative">
              <div className="absolute -inset-10 pointer-events-none overflow-hidden opacity-50">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-500 rounded-full floating-dot"></div>
                <div className="absolute top-3/4 left-1/2 w-1 h-1 bg-purple-500 rounded-full floating-dot" style={{ animationDelay: '1s', animationDuration: '8s' }}></div>
                <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-fuchsia-500 rounded-full floating-dot" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
              </div>
              
              <div className="bg-gray-900/90 rounded-xl shadow-lg border border-gray-700 overflow-hidden relative">
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                  <h3 className="font-medium text-white flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <Bot size={16} className="text-indigo-300"/>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">AI Assistant</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <span className="flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                        </span>
                        <span>Online</span>
                      </div>
                    </div>
                  </h3>
                  <div className="flex items-center gap-1">
                    <motion.button onClick={clearChat} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/5 transition-all" title="Clear chat">
                      <Eraser size={14}/>
                    </motion.button>
                    <motion.button onClick={toggleChat} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/5 transition-all">
                      <X size={16}/>
                    </motion.button>
                  </div>
                </div>
                
                <div className="h-[350px] md:h-[500px] overflow-y-auto px-4 py-5 space-y-4">
                  <AnimatePresence initial={false}>
                    {chatMessages.map((msg) => (<motion.div key={msg.id} className={`flex items-start gap-2.5 group ${msg.type === 'bot' ? 'max-w-[85%]' : 'ml-auto max-w-[85%] flex-row-reverse'}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${msg.type === 'bot' ? 'bg-indigo-500/30' : 'bg-blue-500/30'}`}>
                          {msg.type === 'bot' ? (<Bot size={12} className="text-indigo-300"/>) : (<User size={12} className="text-blue-300"/>)}
                        </div>
                        <div className="relative">
                          <div className={`py-2.5 px-3.5 rounded-2xl text-sm ${msg.type === 'bot'
                    ? 'chat-bubble-bot text-slate-200 rounded-tl-none border border-indigo-500/20'
                    : 'chat-bubble-user text-white rounded-tr-none border border-blue-500/20'}`}>
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => copyToClipboard(msg.text, msg.id)} className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors">
                              {isCopied[msg.id] ? <Check size={10}/> : <Copy size={10}/>}
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>))}
                  </AnimatePresence>
                  
                  <AnimatePresence>
                    {isLoading && (<motion.div className="flex items-start gap-2.5 max-w-[85%]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}>
                        <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-indigo-500/30">
                          <Bot size={12} className="text-indigo-300"/>
                        </div>
                        <div className="py-2.5 px-3.5 rounded-2xl text-sm chat-bubble-bot rounded-tl-none border border-indigo-500/20">
                          <div className="flex items-center gap-2">
                            <Loader2 size={12} className="animate-spin text-indigo-400"/>
                            <span className="text-xs text-slate-300">Thinking...</span>
                          </div>
                        </div>
                      </motion.div>)}
                  </AnimatePresence>

                  <div ref={messagesEndRef}/>
                </div>
                
                <div className="p-3 border-t border-gray-700 bg-gray-900/50">
                  <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="relative">
                      <textarea ref={chatInputRef} value={chatMessage} onChange={handleInput} onKeyDown={handleKeyDown} placeholder="Message AI Assistant..." className="w-full bg-gray-800/50 text-white placeholder-slate-400 rounded-lg py-2.5 px-3.5 pr-12 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 border border-gray-600 resize-none text-sm transition-all duration-200 max-h-[200px]" style={{ minHeight: '44px' }}/>
                      <motion.button type="submit" disabled={!chatMessage.trim() || isLoading} whileHover={chatMessage.trim() && !isLoading ? { scale: 1.05 } : {}} whileTap={chatMessage.trim() && !isLoading ? { scale: 0.95 } : {}} className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${chatMessage.trim() && !isLoading
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40'
                : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'}`}>
                        {isLoading ? (<Loader2 size={14} className="animate-spin"/>) : (<Send size={14}/>)}
                      </motion.button>
                    </div>
                    <div className="mt-2 text-xs text-slate-500 text-center">
                      Press Enter to send • Shift+Enter for new line
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>)}
      </AnimatePresence>
    </div>);
}
