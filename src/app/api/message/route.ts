import { chatbotPrompt } from "@/app/helpers/constants/chatbot-prompt";
import { messagesSchema } from "@/app/lib/validators/message";
import {
	ChatGPTMessage,
} from "@/app/lib/validators/openai-stream";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export async function POST(req: Request) {
	const { messages } = await req.json();

	const parsedMessages = messagesSchema.parse(messages);

	const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => {
		return {
			role: message.isUser ? "user" : "system",
			content: message.content,
		};
	});

	outboundMessages.unshift({
		role: "system",
		content: chatbotPrompt,
	});

	// https://platform.openai.com/docs/api-reference/chat/create

	const configuration = new Configuration({
		apiKey: process.env.OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(configuration);

	const chatCompletion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: outboundMessages,
	});

	return NextResponse.json({message: chatCompletion.data.choices[0].message});
}
