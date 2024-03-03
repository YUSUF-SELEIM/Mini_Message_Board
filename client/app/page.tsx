'use client';
import { User } from "@nextui-org/user";
import { Spinner } from "@nextui-org/spinner";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import Form from "../components/form";
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function Home() {
	const [messages, setMessages] = useState([]);
	const [islLoading, setIsLoading] = useState(true);

	const fetchData = () => {
		setIsLoading(true);
		axios.get('https://mini-message-board-orpin.vercel.app/api/')
			.then(res => setMessages(res.data))
			.catch(error => console.error('Error:', error))
			.finally(() => setIsLoading(false));
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<CardContainer className="w-full md:w-auto inter-var">
				<CardBody className="w-[100%] bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] md:w-[50rem] h-auto rounded-xl p-3 md:p-6 border  ">
					<CardItem
						translateZ="50"
						className="text-xl mx-auto font-bold text-neutral-600 dark:text-white"
					>
						Mini Message Board
					</CardItem>

					<CardItem
						className="w-full mt-4 md:px-4 dark:text-white"
					>
						{islLoading ? <Spinner className="w-full h-[250px] mx-auto" size="lg" /> :
							<div className="md:h-[290px] h-[190px] overflow-auto">
								{messages.map((message: { text: string, user: string, added: string }, index: number) => (
									<div key={index} className="md:px-3 py-2 flex justify-between items-center">
										<User
											name={message.user}
											description={message.text}
										/>
										<div className="text-xs italic ">
											{(() => {
												const messageTimestamp = new Date(message.added).getTime();
												const currentTimestamp = new Date().getTime();
												const differenceInSeconds = Math.floor((currentTimestamp - messageTimestamp) / 1000);
												const minutes = Math.floor(differenceInSeconds / 60);
												const hours = Math.floor(minutes / 60);
												let timestampString = '';

												if (hours > 0) {
													timestampString = `${hours} hour${hours > 1 ? 's' : ''} ago`;
												} else if (minutes > 0) {
													timestampString = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
												} else {
													timestampString = 'Just now';
												}

												return timestampString;
											})()}
										</div>
									</div>
								))}
							</div>
						}
					</CardItem>
					<div className="flex justify-between items-center mt-10">
						<CardItem
							translateZ={20}
							translateX={-20}
							as="button"
							className="w-full px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
						>
							<Form></Form>
						</CardItem>
					</div>
				</CardBody>
			</CardContainer>
		</div>
	);
}
