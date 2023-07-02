import { createContext, useContext, useState } from "react";
import { Message } from "../lib/validators/message";
import { nanoid } from "nanoid";

export const MessagesContext = createContext<{
	messages: Message[];
	addMessage: (message: Message) => void;
	removeMessage: (id: string) => void;
}>({
	messages: [],
	addMessage: () => {},
	removeMessage: () => {},
});

export function MessagesProvider({ children }: { children: React.ReactNode }) {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: nanoid(),
			content: `Hello, I'm a GPT assistant. What can I do for you?`,
			isUser: false,
		},
	]);

	const addMessage = (message: Message) => {
		setMessages((prev) => [...prev, message]);
	};

	const removeMessage = (id: string) => {
		setMessages((prev) => prev.filter((msg) => msg.id !== id));
	};

	return (
		<MessagesContext.Provider
			value={{
				messages,
				addMessage,
				removeMessage,
			}}
		>
			{children}
		</MessagesContext.Provider>
	);
}
