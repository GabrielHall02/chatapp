"use client";

import { FC, HTMLAttributes, useContext } from "react";
import { MessagesContext } from "../context/messages";
import { useSearchParams } from 'next/navigation'

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
    const searchParams = useSearchParams()
    const username = searchParams.get("username")
    const firstLetter = username?.charAt(0).toUpperCase()

	const messages = useContext(MessagesContext);
	const reverseMessages = [...messages.messages].reverse();

	return (
		<div
			{...props}
			className="flex flex-col-reverse gap-3 overflow-y-auto h-full"
		>
			<div className="flex-1 flex-grow" />
			{reverseMessages.map((message) => (
				<div key={message.id} className="chat-message">
					<div
						className={
							message.isUser
								? "flex items-end justify-end"
								: "flex items-end flex-row-reverse justify-end"
						}
					>
						<div
							className={
								message.isUser
									? "flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden rounded-lg bg-blue-600 text-white"
									: "flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden rounded-lg bg-gray-200 text-gray-900"
							}
						>
							<p className="px-4 py-2">{message.content}</p>
						</div>
						<div
							className={
								message.isUser
									? "flex items-center justify-center w-10 h-10 rounded-full bg-gray-300"
									: "flex items-center justify-center w-10 h-10 rounded-full bg-green-500"
							}
						>{message.isUser ? firstLetter : ""}</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ChatMessages;
