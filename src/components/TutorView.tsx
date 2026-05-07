import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Languages, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '../types';

export default function TutorView() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Olá! Eu sou seu Tutor de Inglês com IA. Como posso te ajudar a praticar hoje? Podemos conversar, traduzir frases ou explicar gramática!",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are a helpful, friendly English learning tutor for a language app called EnglishNow. 
          Your goal is to help Portuguese speakers learn English. 
          - ALWAYS respond in Portuguese when explaining things, but use English for examples and practice.
          - Keep responses relatively concise. 
          - If the user makes a mistake in English, gently correct them using Portuguese explanations. 
          - Suggest exercises or explain grammar concepts in Portuguese. 
          - Use a supportive and encouraging tone.`
        }
      });

      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...history, { role: 'user', parts: [{ text: input }] }],
        config: {
          systemInstruction: `You are a helpful English tutor for Portuguese speakers. Your app is called EnglishNow. Explain concepts in Portuguese. Keep it concise.`
        }
      });

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: result.text || "Desculpe, não consegui processar isso. Pode tentar novamente?",
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Gemini error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Ops, algo deu errado no meu processamento de linguagem. Por favor, tente mais tarde!",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto border-x border-brand-border bg-brand-bg">
      {/* Header */}
      <div className="p-6 border-b border-brand-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary/20 rounded-xl flex items-center justify-center text-brand-primary">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg">Tutor IA</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 bg-brand-success rounded-full animate-pulse" />
              <span className="text-xs text-slate-400">Online e pronto para ajudar</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400"><Sparkles className="w-5 h-5" /></button>
          <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400"><Info className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`
                w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center
                ${msg.role === 'user' ? 'bg-brand-primary' : 'bg-brand-surface-light border border-white/10'}
              `}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-brand-primary" />}
              </div>
              <div className={`
                p-4 rounded-2xl text-sm leading-relaxed
                ${msg.role === 'user' ? 'bg-brand-primary text-white rounded-tr-none' : 'glass-card border-brand-primary/10 rounded-tl-none'}
              `}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-lg bg-brand-surface-light border border-white/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-brand-primary" />
              </div>
              <div className="p-4 rounded-2xl glass-card border-brand-primary/10 rounded-tl-none flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-brand-primary" />
                <span className="text-xs text-slate-400 font-medium">O assistente está pensando...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-brand-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte-me: 'Explique o Simple Past' ou 'Como se diz olá?'"
            className="flex-1 bg-brand-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary placeholder:text-slate-500"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="btn-primary flex items-center justify-center w-12 h-12 p-0 rounded-xl"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-3 text-[10px] text-center text-slate-500 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
          <Languages className="w-3 h-3" />
          Desenvolvido com Gemini AI Studio
        </p>
      </div>
    </div>
  );
}
