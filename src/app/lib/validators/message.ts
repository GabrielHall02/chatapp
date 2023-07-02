import {z} from "zod";

export const MessageSchema = z.object({
    id: z.string(),
    isUser: z.boolean(),
    content: z.string()
});

// array validator
export const messagesSchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;