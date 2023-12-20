import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { supabaseApp } from "utils";
import router from "next/router";
import { Button, TextInput } from "@mantine/core";
import { IoRefresh } from "react-icons/io5";
import { ClimbingBoxLoader } from "react-spinners";
import Fuse from "fuse.js";

const NewsAggregator = () => {
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		setLoading(true);
		const url = process.env.baseUrl + "v1/api/getNewsFeeds";
		const response = await axios.post(url);
		const channels = await supabaseApp.from("News-Channels").select("*");
		setLoading(false);
		setFeeds(response.data);
		return { feeds: response.data, channels: channels.data };
	};
	const { data, isLoading } = useQuery(["newsChannelsFeeds"], fetchData);

	const [feeds, setFeeds] = useState(data?.feeds ? data.feeds : []);
	const [channel, setChannel] = useState(
		router?.query?.channel?.replaceAll("-", " ")
	);

	const filterData = (name) => {
		let results = [];
		const fuse = new Fuse(data.feeds, {
			includeScore: false,
			keys: ["title", "link", "description"],
		});
		const result = fuse?.search(name);
		result.forEach((item) => results.push(item.item));
		setFeeds(results);
	};

	const handleSearch = (e) => {
		let results = [];
		const val = e.target.value;
		const fuse = new Fuse(data.feeds, {
			includeScore: false,
			keys: ["title", "feeds", "link", "description"],
		});
		if (fuse && val) {
			const result = fuse?.search(val);
			result.forEach((item) => results.push(item.item));
			setFeeds(results);
		} else {
			setFeeds(data.feeds);
		}
	};
	return (
		<div className="px-20 py-10 relative w-10/12 mx-auto">
			<div className="bg-white border-l border-black fixed right-0 w-72 bottom-5 top-0 z-30 overflow-y-auto py-1">
				<p className="font-bold text-md px-2 py-3">News Channels</p>
				<hr className="border-1 border-black my-1" />
				{data?.channels?.map((item) => {
					return (
						<div
							onClick={() => {
								setChannel(item.name);
								router.push(
									`/projects/news-aggregator?channel=${item.name?.replaceAll(
										" ",
										"-"
									)}`
								);
								filterData(item.name);
							}}
							className="cursor-pointer hover:bg-gray-100 flex justify-start items-center gap-2 p-2 overflow-y-scroll hover:scale-50 scale-100"
						>
							<img
								src={item.image}
								className="w-6 h-6 rounded-full object-cover"
							/>
							<p className="font-semibold">{item.name}</p>
						</div>
					);
				})}
			</div>
			<div className="h-screen w-10/12">
				<div className="flex flex-row justify-between items-center w-full mx-auto gap-10">
					<TextInput
						color="dark"
						variant="filled"
						name="search"
						placeholder="Search the topic"
						onChange={handleSearch}
						classNames={{
							input: "border-2 border-black mx-4 focus:border-black",
							root: "focus:border-black w-80",
						}}
					/>
					<Button
						leftIcon={<IoRefresh size={18} color="black" />}
						color="dark"
						variant="outline"
						onClick={fetchData}
					>
						Refresh
					</Button>
				</div>
				{loading ? (
					<div className="mx-auto w-10/12">
						<ClimbingBoxLoader color="#000000" size={24} />{" "}
					</div>
				) : (
					feeds?.map((item) => {
						return (
							<div className="flex flex-wrap justify-between items-start">
								{item.feeds.map((feed) => {
									return (
										<div className="border-2 border-black m-2 w-96 hover:bg-gray-200">
											<div className="flex justify-start gap-1 items-center p-2">
												<img
													src={item.image}
													className="rounded-full w-10 h-10"
												/>
												<p className="font-bold text-xs">{item.title}</p>
											</div>
											<hr className="border-1 border-black" />
											<div className="p-2">
												<a href={feed.link} target="_blank">
													<p className="text-2xl font-semibold my-2">
														{feed.title}
													</p>
													{feed?.enclosure?.url && (
														<img
															width={"auto"}
															height={50}
															src={feed?.enclosure?.url}
														/>
													)}
													<p>{feed.content}</p>
												</a>
											</div>
										</div>
									);
								})}
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};
export default NewsAggregator;
