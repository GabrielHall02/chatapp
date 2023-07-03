"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function Auth() {
	const router = useRouter()
	const [input, setInput] = useState("");

	const authenticate = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		router.push("/chat?username=" + input);
		//window.location.href = "/chat?username=" + input;
	};

	return (
		<div className="flex h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500">
			<div className="flex-none w-2/12" />
			<div className="flex flex-col justify-center flex-1 w-full gap-6">
				<div className="flex flex-col gap-4">
					<p className="text-6xl text-white font-medium">Welcome</p>
					<p className="text-gray-300 text-xl">
						Set an username to get started
					</p>
				</div>
				<input
					className=" h-14 rounded-lg bg-gray-500 text-gray-200 pl-4 overflow-hidden placeholder:text-gray-700 border-none outline-none focus:outline-gray-400"
					placeholder="Username"
					onChange={(event) => setInput(event.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							authenticate(e);
						}
					}}
					autoFocus
				></input>
				<div
					className=" h-14 rounded-lg bg-green-600 text-gray-200 overflow-hidden cursor-pointer flex justify-center items-center hover:brightness-110"
					onClick={(e) => {
						authenticate(e);
					}}
				>
					Start
				</div>
			</div>
			<div className="flex-none w-6/12" />
		</div>
	);
}
