import React, { useEffect, useState } from "react";
import axios from "axios";
import { Space } from "antd";

function Home() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get("/api/videos").then(({ data }) => {
            setVideos(data.videos.filter((vid) => vid.title !== "temp"));
        });
    }, []);

    return videos.length > 0 ? (
        <div className="h-wrapper">
            {videos.map((vid, i) => (
                <video
                    className="h-video"
                    key={i}
                    loop={true}
                    autoPlay={true}
                    muted
                >
                    <source src={vid.url} type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
                </video>
            ))}
        </div>
    ) : null;
}

export default Home;
