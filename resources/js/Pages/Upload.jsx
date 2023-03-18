import React, { useEffect, useState } from "react";
import { Card, Input, Space } from "antd";
import InputFile from "../Components/InputFile";

function Upload() {
    const [title, setTitle] = useState("");
    const [source, setSource] = useState("");

    return (
        <div className="if-container">
            <Card
                title="Upload Video"
                className="if-card"
                style={{ width: 700 }}
            >
                <Space direction="vertical">
                    <Input
                        placeholder="Input file name..."
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <InputFile title={title} setSource={setSource} />
                    {source ? (
                        <video
                            key={source}
                            width="320"
                            height="240"
                            loop="true"
                            autoplay="autoplay"
                            muted
                        >
                            <source src={source} type="video/mp4" />
                            Sorry, your browser doesn't support embedded videos.
                        </video>
                    ) : null}
                </Space>
            </Card>
        </div>
    );
}

export default Upload;
