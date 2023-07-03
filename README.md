## Getting Started

First, run the server:

```bash
docker-compose up
# or
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the home page.

You should see a page that where you will need to input an username. Here you can enter any username i.e. `test` and you will be redirected to the chat page.

> Note: Sometimes the server takes a while to start, so if you get an error, just wait a few seconds and try again.

After you have entered a username, you will be redirected to the chat page. Here you will be able to interact with a chatbot. You can type in the input field and press enter to send a message. The chatbot will respond to your message.


## Technical Details
This app was developed using `nextjs 13`, `typescript`, and `tailwindcss`.

### Backend
The webapp doesn't use a database. This means that the messages won't be stored if the page is refreshed.

There is only one `api endpoint` which is `/api/message`. This endpoint is used to send messages to the chatbot.
It takes as arguments an object `messages: [message]`.
And returns the response from openAI API.

Message is a type that has the following properties:

```ts
    id: z.string(),
    isUser: z.boolean(),
    content: z.string()
```
> Note: I'm using openAI node package to interact with the openAI API. 

The openAI API offers the possibility to change the behaviour of the bot. For this to happen there is an initial prompt that is sent from the `system`. This prompt is stored in `/helpers/constants/chatbot-prompts.ts`.
I didn't explore this much as the general behaviour of the bot was good enough for the requirements of this challenge.

### Frontend

In the **client side**, the comunication with the api is made using `react-query`. More information [here](https://tanstack.com/query/v3/docs/react/quick-start).

As onSuccess (from react-query) returns a `stream`, it is needed to convert it into readable JSON data and then update the message context and consequently update the UI.

> Note: The openAI API takes some time to respond, the text-area is disabled while the request is being made to prevent errors.

To handle possible errors  I'm using `toast` from `react-hot-toast`.