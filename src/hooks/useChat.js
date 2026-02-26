import { useState, useCallback } from 'react'
import { getMockAIResponse } from '../mock/mockAI'

export function useChat(initialMessages = [], onHtmlUpdate) {
  const [messages, setMessages] = useState(initialMessages)
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback(async (text, attachments = []) => {
    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text,
      attachments,
      timestamp: Date.now(),
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await getMockAIResponse(text)
      const aiMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: response.text,
        html: response.html,
        timestamp: Date.now(),
      }
      setMessages(prev => [...prev, aiMessage])

      if (response.html && onHtmlUpdate) {
        onHtmlUpdate(response.html)
      }
    } finally {
      setIsLoading(false)
    }
  }, [onHtmlUpdate])

  return { messages, isLoading, sendMessage, setMessages }
}
