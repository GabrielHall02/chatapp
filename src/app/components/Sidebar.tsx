import { FC } from "react";

const Sidebar: FC = ({}) => {
	return (
		<div className="flex-shrink-0 overflow-x-hidden h-screen w-64 flex flex-col bg-gray-500">
			<div className="shadow-xl items-center flex flex-row pl-3">
				<div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500"></div>
				<div className="flex flex-col py-4 px-4 gap-1">
					<div className="flex flex-row items-center gap-3">
						<p className="font-semibold text-gray-200">
							GPT ChatBot
						</p>
						<div className="flex items-center justify-center w-2 h-2 rounded-full bg-green-400"></div>
					</div>
					<p className="text-gray-200">bot is online</p>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
