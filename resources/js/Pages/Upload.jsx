import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button, Card, Input, Space } from "antd";
import InputFile from "../Components/InputFile";

function Upload() {
    const [title, setTitle] = useState("");
    const [source, setSource] = useState("");
    const [file, setFile] = useState(null);
    const [state, setState] = useState("filling");

    async function onSubmit() {
        setState("loading");
        const bodyFormData = new FormData();
        bodyFormData.append("title", title);
        bodyFormData.append("video", file);

        const { data } = await axios.post("/api/videos", bodyFormData, {
            headers: {
                accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
        });

        if (data) {
            setState("success");
        }
    }

    return (
        <div className="u-container">
            <Card
                title="Upload Video"
                className="u-card"
                style={{ width: 700 }}
            >
                <Space direction="vertical">
                    <Input
                        placeholder="Input file name..."
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    {source ? (
                        <div className="u-preview">
                            <video
                                key={source}
                                width="320"
                                height="240"
                                loop="true"
                                autoplay="autoplay"
                                muted
                            >
                                <source src={source} type="video/mp4" />
                                Sorry, your browser doesn't support embedded
                                videos.
                            </video>
                            <Button type="link" onClick={() => setSource("")}>
                                Re-upload video
                            </Button>
                        </div>
                    ) : (
                        <InputFile setSource={setSource} setFile={setFile} />
                    )}
                    <Button
                        className="u-submit"
                        type="primary"
                        disabled={!title || !source}
                        onClick={() => onSubmit()}
                    >
                        Submit
                    </Button>
                </Space>
            </Card>
        </div>
    );
}

export default Upload;
