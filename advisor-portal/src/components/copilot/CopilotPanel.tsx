import React, { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  Button,
  Avatar,
  Stack,
  Chip,
  Fade,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from '@mui/material';
import {
  Close as CloseIcon,
  Minimize as MinimizeIcon,
  Send as SendIcon,
  SmartToy as CopilotIcon,
  Person as PersonIcon,
  History as HistoryIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { mockProducts } from '../../data/marketingData';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'copilot';
  timestamp: Date;
  suggestions?: string[];
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  lastModified: Date;
}

interface CopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

export const CopilotPanel = forwardRef<any, CopilotPanelProps>(({
  isOpen,
  onClose,
  onMinimize
}, ref) => {
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Prudential Copilot. I can help you with product information, coverage details, and answer questions about our insurance offerings. What would you like to know?',
      sender: 'copilot',
      timestamp: new Date(),
      suggestions: [
        'Tell me about Term Life products',
        'What riders are available?',
        'Show me Universal Life features',
        'Compare product coverage amounts'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [panelHeight] = useState(window.innerHeight - 100); // Fixed height, no dragging
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  
  // Dynamic width calculation - fixed widths for right-aligned panel
  const getCurrentPanelWidth = useCallback(() => isHistoryOpen ? 600 : 400, [isHistoryOpen]);
  const getHistorySidebarWidth = useCallback(() => 200, []);
  
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Chat history utility functions
  const getChatSessions = (): ChatSession[] => {
    const stored = localStorage.getItem('chatSessions');
    return stored ? JSON.parse(stored) : [];
  };

  const saveChatSessions = (sessions: ChatSession[]) => {
    localStorage.setItem('chatSessions', JSON.stringify(sessions));
  };

  const generateSessionTitle = (messages: Message[]): string => {
    const firstUserMessage = messages.find(m => m.sender === 'user');
    if (firstUserMessage) {
      return firstUserMessage.text.substring(0, 50) + (firstUserMessage.text.length > 50 ? '...' : '');
    }
    return `Chat ${new Date().toLocaleDateString()}`;
  };

  const saveCurrentSession = useCallback(() => {
    if (messages.length <= 1) return; // Don't save if only welcome message
    
    const sessions = getChatSessions();
    const sessionTitle = generateSessionTitle(messages);
    
    const sessionData: ChatSession = {
      id: currentSessionId || Date.now().toString(),
      title: sessionTitle,
      messages: messages,
      createdAt: new Date(),
      lastModified: new Date()
    };

    const existingIndex = sessions.findIndex(s => s.id === sessionData.id);
    if (existingIndex >= 0) {
      sessions[existingIndex] = sessionData;
    } else {
      sessions.unshift(sessionData);
    }

    // Keep only last 10 sessions
    const trimmedSessions = sessions.slice(0, 10);
    saveChatSessions(trimmedSessions);
    
    if (!currentSessionId) {
      setCurrentSessionId(sessionData.id);
    }
  }, [messages, currentSessionId]);

  const startNewSession = () => {
    if (messages.length > 1) {
      saveCurrentSession();
    }
    
    setCurrentSessionId('');
    setMessages([{
      id: '1',
      text: 'Hello! I\'m your Prudential Copilot. I can help you with product information, coverage details, and answer questions about our insurance offerings. What would you like to know?',
      sender: 'copilot',
      timestamp: new Date(),
      suggestions: [
        'Tell me about Term Life products',
        'What riders are available?',
        'Show me Universal Life features',
        'Compare product coverage amounts'
      ]
    }]);
  };

  const loadSession = (sessionId: string) => {
    const sessions = getChatSessions();
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setMessages(session.messages);
      setIsHistoryOpen(false); // Close history panel after loading
    }
  };

  const deleteSession = (sessionId: string) => {
    const sessions = getChatSessions();
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    setChatSessions(updatedSessions);
    saveChatSessions(updatedSessions);
  };

  const loadChatSessions = () => {
    const sessions = getChatSessions();
    setChatSessions(sessions);
  };

  const toggleHistory = () => {
    if (!isHistoryOpen) {
      loadChatSessions(); // Refresh sessions when opening
    }
    setIsHistoryOpen(!isHistoryOpen);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Save session when messages change
  useEffect(() => {
    if (messages.length > 1) {
      const timeoutId = setTimeout(() => {
        saveCurrentSession();
      }, 1000); // Debounce saves
      
      return () => clearTimeout(timeoutId);
    }
  }, [messages, saveCurrentSession]);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    startNewSession,
    loadSession,
    saveCurrentSession,
    toggleHistory
  }));

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate copilot thinking time
    setTimeout(() => {
      const response = generateCopilotResponse(text.trim());
      const copilotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'copilot',
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, copilotMessage]);
      setIsTyping(false);
    }, 1500);
  }, []);

  const generateCopilotResponse = (query: string): { text: string; suggestions?: string[] } => {
    const lowerQuery = query.toLowerCase();

    // Product-specific queries
    if (lowerQuery.includes('term life') || lowerQuery.includes('term insurance')) {
      const termProducts = mockProducts.filter(p => p.productType === 'Term Life');
      return {
        text: `We offer ${termProducts.length} Term Life products. Our most popular is **PruLife Term Select** with:\n\n• 10, 15, 20, 30-year level premiums\n• Coverage from $100K to $10M\n• Conversion options without medical exam\n• Competitive rates for all risk classes\n\nWould you like to know more about specific features or other term products?`,
        suggestions: ['Show term life rates', 'Compare term lengths', 'What are conversion options?']
      };
    }

    if (lowerQuery.includes('whole life')) {
      return {
        text: `**PruLife Whole Life Pro** offers:\n\n• Guaranteed death benefit for life\n• Guaranteed cash value growth\n• Dividend potential\n• Policy loans available\n• Coverage from $50K to $25M\n\nPerfect for estate planning and conservative investors. The cash value grows tax-deferred and you can access it through loans.`,
        suggestions: ['How do dividends work?', 'Tell me about cash value', 'What are policy loans?']
      };
    }

    if (lowerQuery.includes('universal life') || lowerQuery.includes('ul')) {
      return {
        text: `We have several Universal Life options:\n\n**PruLife Universal Advantage:**\n• Flexible premium payments\n• Adjustable death benefit\n• Multiple investment options\n• Coverage up to $50M\n\n**PruLife Index Advantage:**\n• Market upside participation\n• 0% floor protection\n• Multiple index options\n\nWhich type interests you more - traditional UL or indexed UL?`,
        suggestions: ['Explain indexed universal life', 'What are investment options?', 'How flexible are premiums?']
      };
    }

    if (lowerQuery.includes('rider') || lowerQuery.includes('benefit')) {
      return {
        text: `Popular riders include:\n\n• **Waiver of Premium** - Premium payments waived if disabled\n• **Accidental Death Benefit** - Double indemnity for accidents\n• **Long-Term Care Rider** - Accelerated benefits for LTC expenses\n• **Chronic Illness Rider** - Benefits for chronic conditions\n• **Child Term Rider** - Coverage for children with conversion options\n\nMost riders are available across our product line. Which rider interests you?`,
        suggestions: ['How much do riders cost?', 'Tell me about LTC rider', 'What is waiver of premium?']
      };
    }

    if (lowerQuery.includes('coverage') || lowerQuery.includes('amount') || lowerQuery.includes('limit')) {
      return {
        text: `Our coverage amounts vary by product:\n\n• **Term Life**: $100K - $10M\n• **Whole Life**: $50K - $25M\n• **Universal Life**: $100K - $50M\n• **Variable UL**: $250K - $100M\n• **Guaranteed Issue**: $5K - $50K\n\nCoverage depends on age, health, and financial underwriting. What coverage amount are you considering?`,
        suggestions: ['How is coverage determined?', 'What affects premium rates?', 'Tell me about underwriting']
      };
    }

    if (lowerQuery.includes('age') || lowerQuery.includes('qualify') || lowerQuery.includes('eligible')) {
      return {
        text: `Age requirements by product:\n\n• **Term Life**: Ages 18-75\n• **Whole Life**: Ages 0-85\n• **Universal Life**: Ages 18-80\n• **Guaranteed Issue**: Ages 50-85\n\nMost products have medical underwriting, but we offer simplified issue and guaranteed issue options for easier qualification.`,
        suggestions: ['What is simplified issue?', 'Tell me about medical exams', 'How does underwriting work?']
      };
    }

    if (lowerQuery.includes('premium') || lowerQuery.includes('cost') || lowerQuery.includes('price')) {
      return {
        text: `Premium structures vary:\n\n• **Level Premiums**: Fixed for term period or life\n• **Flexible Premiums**: Adjust payments in UL products\n• **Single Premium**: One-time payment option\n\nPremiums depend on age, health, coverage amount, and product type. Would you like information about a specific product's pricing?`,
        suggestions: ['Get term life quote', 'Compare premium structures', 'What affects premium costs?']
      };
    }

    // General/default responses
    if (lowerQuery.includes('help') || lowerQuery.includes('what can you do')) {
      return {
        text: `I can help you with:\n\n• Product information and features\n• Coverage amounts and age ranges\n• Rider benefits and costs\n• Underwriting requirements\n• Premium structures\n• Product comparisons\n\nJust ask me anything about our life insurance products!`,
        suggestions: ['Show all products', 'Compare whole life vs term', 'What riders are available?']
      };
    }

    // Fallback response
    return {
      text: `I'd be happy to help you with that! I have information about all our life insurance products including Term Life, Whole Life, Universal Life, and Variable Universal Life. \n\nCould you be more specific about what you'd like to know? For example, are you interested in a particular product type, coverage amount, or specific features?`,
      suggestions: ['Show all products', 'Tell me about Term Life', 'What riders are available?', 'Compare products']
    };
  };


  if (!isOpen) return null;

  return (
    <Fade in={isOpen}>
      <Paper
        ref={panelRef}
        elevation={8}
        sx={{
          position: 'fixed',
          right: 0,
          top: 64, // Below the header
          width: getCurrentPanelWidth(),
          height: panelHeight,
          zIndex: 1300,
          display: 'flex',
          flexDirection: 'row',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '8px 0 0 8px', // Rounded on left side only
          overflow: 'hidden',
          transition: 'width 0.3s ease',
          boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* History Sidebar */}
        {isHistoryOpen && (
          <Box
            sx={{
              width: getHistorySidebarWidth(),
              bgcolor: 'grey.50',
              borderRight: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              minWidth: 250, // Prevent sidebar from getting too narrow
              maxWidth: 350  // Prevent sidebar from getting too wide
            }}
          >
            {/* History Header */}
            <Box
              sx={{
                p: 2,
                bgcolor: 'grey.100',
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600, textAlign: 'center' }}>
                Chat History
              </Typography>
            </Box>

            {/* Sessions List */}
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              {chatSessions.length === 0 ? (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    No chat history
                  </Typography>
                </Box>
              ) : (
                <List dense sx={{ p: 0 }}>
                  {chatSessions.slice(0, 10).map((session) => (
                    <ListItem key={session.id} disablePadding>
                      <ListItemButton
                        onClick={() => loadSession(session.id)}
                        selected={session.id === currentSessionId}
                        sx={{
                          px: 1.5,
                          py: 1,
                          '&.Mui-selected': {
                            bgcolor: 'primary.light',
                            color: 'primary.contrastText',
                          },
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                              {session.title.length > 35 ? session.title.substring(0, 35) + '...' : session.title}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                              {new Date(session.lastModified).toLocaleDateString()} • {session.messages.length} msgs
                            </Typography>
                          }
                        />
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSession(session.id);
                          }}
                          sx={{ ml: 1, opacity: 0.7 }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Box>
        )}

        {/* Main Chat Panel */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              bgcolor: '#003f7f',
              color: 'white',
              userSelect: 'none'
            }}
          >
            <IconButton
              size="small"
              onClick={toggleHistory}
              sx={{ 
                color: 'inherit', 
                mr: 1,
                bgcolor: isHistoryOpen ? 'rgba(255,255,255,0.2)' : 'transparent'
              }}
              title="Chat History"
            >
              <HistoryIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => { startNewSession(); setIsHistoryOpen(false); }}
              sx={{ color: 'inherit', mr: 1 }}
              title="New Chat"
            >
              <AddIcon />
            </IconButton>
            <CopilotIcon sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Prudential Copilot
            </Typography>
            <IconButton size="small" onClick={onMinimize} sx={{ color: 'inherit', mr: 1 }}>
              <MinimizeIcon />
            </IconButton>
            <IconButton size="small" onClick={onClose} sx={{ color: 'inherit' }}>
              <CloseIcon />
            </IconButton>
          </Box>

        {/* Messages Area */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {messages.map((message) => (
            <Box key={message.id}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 1
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, maxWidth: '80%' }}>
                  {message.sender === 'copilot' && (
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#003f7f' }}>
                      <CopilotIcon fontSize="small" />
                    </Avatar>
                  )}
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      bgcolor: message.sender === 'user' ? '#003f7f' : 'grey.100',
                      color: message.sender === 'user' ? 'white' : 'text.primary',
                      borderRadius: 2,
                      maxWidth: '100%'
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                      {message.text}
                    </Typography>
                  </Paper>
                  {message.sender === 'user' && (
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      <PersonIcon fontSize="small" />
                    </Avatar>
                  )}
                </Box>
              </Box>
              
              {/* Suggestions */}
              {message.suggestions && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, ml: message.sender === 'copilot' ? 5 : 0 }}>
                  {message.suggestions.map((suggestion, index) => (
                    <Chip
                      key={index}
                      label={suggestion}
                      size="small"
                      variant="outlined"
                      onClick={() => handleSendMessage(suggestion)}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#003f7f' }}>
                <CopilotIcon fontSize="small" />
              </Avatar>
              <Paper elevation={1} sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={16} />
                  <Typography variant="body2" color="text.secondary">
                    Thinking...
                  </Typography>
                </Box>
              </Paper>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        <Divider />

        {/* Input Area */}
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              placeholder="Ask me about products, coverage, riders..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(inputText);
                }
              }}
              variant="outlined"
              size="small"
              multiline
              maxRows={3}
            />
            <Button
              variant="contained"
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim() || isTyping}
              sx={{ minWidth: 48, bgcolor: '#003f7f' }}
            >
              <SendIcon />
            </Button>
          </Stack>
        </Box>
        </Box>
      </Paper>
    </Fade>
  );
});