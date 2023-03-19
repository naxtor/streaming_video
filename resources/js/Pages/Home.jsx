import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Input, Modal, Row, Space } from "antd";
import InputFile from "../Components/InputFile";

const { Meta } = Card;
const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: "Asia/Jakarta",
};

function Home() {
    const [videos, setVideos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState({});

    function getVideos() {
        axios.get("/api/videos").then(({ data }) => {
            setVideos(data.videos.filter((vid) => vid.title !== "temp"));
        });
        setIsModalOpen(false);
    }

    function deleteVideo() {
        axios.delete(`/api/videos/${selectedVideo.id}`).then(({ data }) => {
            return getVideos();
        });
    }

    function editVideo() {
        const bodyFormData = new FormData();
        bodyFormData.append("title", selectedVideo.title);
        bodyFormData.append("video", selectedVideo.file);
        axios
            .post(`/api/videos/${selectedVideo.id}`, bodyFormData, {
                headers: {
                    accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(({ data }) => {
                return getVideos();
            });
    }

    // initialize data
    useEffect(() => {
        getVideos();
    }, []);

    // cleanup
    useEffect(() => {
        if (!isModalOpen) {
            console.log("clear");
            setSelectedVideo({});
        }
    }, [isModalOpen]);

    return videos.length > 0 ? (
        <div className="h-wrapper">
            {videos.map((vid) => (
                <Card
                    hoverable
                    style={{
                        width: 240,
                        marginBottom: "10px",
                        alignSelf: "center",
                    }}
                    cover={
                        <video
                            className="h-video"
                            key={new Date().getTime().toString(36)}
                            loop={true}
                            autoPlay={true}
                            muted
                        >
                            <source src={vid.url} type="video/mp4" />
                            Sorry, your browser doesn't support embedded videos.
                        </video>
                    }
                    onClick={() => {
                        setIsModalOpen(true);
                        setSelectedVideo(vid);
                    }}
                >
                    <Meta
                        title={vid.title}
                        description={new Intl.DateTimeFormat(
                            "en-US",
                            options
                        ).format(new Date(vid.created_at))}
                    />
                </Card>
            ))}
            <Modal
                title="Edit Video"
                width={900}
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>,
                    <Button
                        key="link"
                        type="primary"
                        onClick={() => deleteVideo()}
                        danger
                    >
                        Delete
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => editVideo()}
                    >
                        Submit
                    </Button>,
                ]}
            >
                <Row justify={"center"} gutter={[16, 16]}>
                    <Col span={8}>
                        <video
                            className="h-video"
                            key={
                                selectedVideo.id +
                                new Date().getTime().toString(36)
                            }
                            loop={true}
                            autoPlay={true}
                            controls={true}
                            muted
                        >
                            <source src={selectedVideo.url} type="video/mp4" />
                            Sorry, your browser doesn't support embedded videos.
                        </video>
                    </Col>
                    <Col span={12}>
                        <Space direction="vertical">
                            <Input
                                value={selectedVideo.title}
                                placeholder="Input file name..."
                                onChange={(e) =>
                                    setSelectedVideo({
                                        ...selectedVideo,
                                        title: e.target.value,
                                    })
                                }
                            />
                            <InputFile
                                setSource={(url) =>
                                    setSelectedVideo({
                                        ...selectedVideo,
                                        url: url,
                                        id: url,
                                    })
                                }
                                setFile={(file) =>
                                    setSelectedVideo({
                                        ...selectedVideo,
                                        file: file,
                                    })
                                }
                            />
                        </Space>
                    </Col>
                </Row>
            </Modal>
        </div>
    ) : null;
}

export default Home;
