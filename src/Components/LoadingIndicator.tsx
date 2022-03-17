import { Spin, Space} from 'antd';
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