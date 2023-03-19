import React, { useEffect } from "react";
import axios from "axios";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const InputFile = (props) => {
    return (
        <Dragger
            {...{
                accept: ".mp4",
                customRequest: async (params) => {
                    const bodyFormData = new FormData();
                    bodyFormData.append("title", "temp");
                    bodyFormData.append("video", params.file);

                    const { data } = await axios.post(
                        "/api/videos",
                        bodyFormData,
                        {
                            headers: {
                                accept: "application/json",
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                    params.onSuccess(data.video.url);
                    props.setSource(data.video.url);
                    props.setFile(params.file);
                },
                onChange(info) {
                    const { status } = info.file;
                    if (status !== "uploading") {
                        console.log(info.file, info.fileList);
                    }
                    if (status === "done") {
                        message.success(
                            `${info.file.name} file uploaded successfully.`
                        );
                    } else if (status === "error") {
                        message.error(`${info.file.name} file upload failed.`);
                    }
                },
                onDrop(e) {
                    console.log("Dropped files", e.dataTransfer.files);
                },
                maxCount: 1,
            }}
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Select file to upload</p>
        </Dragger>
    );
};

export default InputFile;
