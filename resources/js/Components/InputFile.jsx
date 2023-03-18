import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://wlboclpxbdewmwwfndrd.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsYm9jbHB4YmRld213d2ZuZHJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ4MDExOTUsImV4cCI6MTk5MDM3NzE5NX0.vuGq_Wc7qrzwN_9_Qd2GOxYS99qZzYaFGEq9SN9Z2JU"
);
const bucketName = "streaming-video";

const { Dragger } = Upload;

const InputFile = (props) => {
    return (
        <Dragger
            {...{
                accept: ".mp4",
                customRequest: async (params) => {
                    const { data, error } = await supabase.storage
                        .from(bucketName)
                        .upload(`public/${params.file.name}.mp4`, params.file, {
                            cacheControl: "3600",
                            upsert: true,
                        });
                    const path = data.path;
                    const response = await supabase.storage
                        .from(bucketName)
                        .getPublicUrl(path);

                    if (!error) {
                        props.setSource(response.data.publicUrl);
                        params.onSuccess(data);
                    } else {
                        params.onError(error);
                    }
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
