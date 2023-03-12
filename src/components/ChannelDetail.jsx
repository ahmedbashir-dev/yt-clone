import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { fetchFromApi } from "../utils/fetchFromApi";
const ChannelDetail = () => {
	const [channelDetail, setChannelDetail] = useState(null);
	const [videos, setVideos] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchResults = async () => {
			const data = await fetchFromApi(`channels?part=snippet&id=${id}`);

			setChannelDetail(data?.items[0]);

			const videosData = await fetchFromApi(
				`search?channelId=${id}&part=snippet%2Cid&order=date`
			);

			setVideos(videosData?.items);
		};

		fetchResults();
	}, [id]);
	return (
		<Box minHeight="95vh">
			<Box>
				<div
					style={{ zIndex: 10, height: "300px" }}
					className="channel-background-gradient"
				/>
				<ChannelCard channelDetail={channelDetail} marginTop='-93px' />
			</Box>
      <Box
        display="flex"
        p="2"
      >
        <Box sx={{mr:{sm: '100px'}}} />
          <Videos videos={videos} />
        
      </Box>
		</Box>
	);
};

export default ChannelDetail;
