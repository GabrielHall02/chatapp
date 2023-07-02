import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";
import ChatMessages from "../components/ChatMessages";
export default function Chat() {
	return (
		<div className="overflow-hidden w-full h-full relative flex z-0">
			<Sidebar />
			<div className="relative bg-gray shadow mx-auto px-10 py-20 h-screen justify-center flex-1 overflow-hidden">
				<ChatMessages className="flex-1"></ChatMessages>
				<ChatInput />
			</div>
		</div>
	);


}
