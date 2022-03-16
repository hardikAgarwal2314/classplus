import { Spin, Space} from 'antd';
import {Photo} from "../Models/Photo";
import React from "react";

interface LoadingIndicatorProps {
    size:  "small" | "large" | "default";
}

const LoadingIndicator :React.FC<LoadingIndicatorProps> = ({size}) => {
    return (
        <Space size="middle">
            <Spin size={size}/>
        </Space>
    )

}

export default LoadingIndicator;