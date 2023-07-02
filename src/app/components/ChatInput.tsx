"use client";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { FC, HTMLAttributes, useContext, useRef, useState } from "react";
import TextAreaAutosize from "react-textarea-autosize";
import { Message } from "../lib/validators/message";
import { MessagesContext } from "../context/messages";
import { Loader2, CornerDownLeft } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

interface chatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<chatInputProps> = ({ className, ...props }) => {
	const [message, setMessage] = useState<string>("");
	const { addMessage, removeMessage } = useContext(MessagesContext);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const { mutate: sendMessage, isLoading } = useMutation({
		mutationFn: async (message: Message) => {
			const response = await fetch("/api/message", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ messages: [message] }),
			});

			if (!response.ok) throw new Error();

			return response.body;
		},
		onMutate(message: Message) {
			// Optimistic update. This will add the message to the UI before the request is completed
			addMessage(message);
		},
		onSuccess: async (stream) => {
			// onSuccess returns a ReadableStream. It needs to be parsed to get the message
			if (!stream) throw new Error("No stream found");

			const id = nanoid();
			const responseMessage: Message = {
				id,
				isUser: false,
				content: "",
			};

			// Converting the stream to a JSON object
			const reader = stream.getReader();
			const decoder = new TextDecoder();
			let done = false;

			while (!done) {
				const { value, done: _done } = await reader.read();
				done = _done;
				if (value) {
					const decoded = decoder.decode(value);
					console.log(decoded);
					// Parse string to JSON to update the message content
					const json = JSON.parse(decoded);
					responseMessage.content = json.message.content;
					addMessage(responseMessage);
					setMessage("");

					setTimeout(() => {
						textareaRef.current?.focus();
					}, 10);
				}
			}
		},
		onError: (_, message) => {
			toast.error("Something went wrong, please try again");
			removeMessage(message.id);
			textareaRef.current?.focus();
		},
	});

	return (
		<div {...props}>
			<div>
				<Toaster position="top-right" reverseOrder={false} />
			</div>
			<div className=" relative flex-1 overflow-hidden rounded-lg border-none outline-none">
				<TextAreaAutosize
					ref={textareaRef}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							const msg = {
								id: nanoid(),
								isUser: true,
								content: message,
							};
							sendMessage(msg);
						}
					}}
					rows={2}
					disabled={isLoading}
					maxRows={4}
					autoFocus
					placeholder="Type a message"
					className="peer disabled:opacity-50 w-full h-full p-4 text-gray-800 bg-zinc-100 border-none outline-none resize-none rounded-lg shadow-sm peer-focus:shadow-md"
				/>
				<div className="absolute inset-y-0 right-0 flex py-4 pr-1.5">
					<kbd className="inline-flex items-center rounded border bg-white border-gray-200 px-1 font-sans text-xs text-gray-400">
						{isLoading ? (
							<Loader2 className="w-3 h-3 animate-spin" />
						) : (
							<CornerDownLeft className="w-3 h-3" />
						)}
					</kbd>
				</div>
			</div>
		</div>
	);
};

export default ChatInput;
