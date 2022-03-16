import {Select, Space} from 'antd';
import React, {useState} from "react";
import {getSearchQueriesFromLocalData, setSearchQueryInLocalData} from "../../Services/ImageServices";

const {Option} = Select;

interface SearchFieldProps {
    search: (value: string | undefined) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({search}) => {
    const [searchValue, setSearchValue] = useState<string>()
    const data = getSearchQueriesFromLocalData()

    const handleSearch = (value: string | undefined) => {
        setSearchValue(value)
        if (value) {
            if(!data.filter(key => key === value).length) {
                data.unshift(value)
            }
            setSearchQueryInLocalData(data)
        }
        search(value)
    };


    return (
        <Space
            direction="vertical"
            style={{
                width: '100%',
                display:"flex",
            }}
        >
            <Select
                style={{
                    width: '300px',
                }}
                showSearch
                size="large"
                placeholder="Search images..."
                value={searchValue}
                showArrow
                allowClear
                autoClearSearchValue={false}
                onClear={() => handleSearch(undefined)}
                onChange={(value) => handleSearch(value)}
                filterOption={false}
                onSearch={value => setSearchValue(value)}
                onKeyDown={key => key.key === "Enter" && handleSearch(searchValue)}
                notFoundContent={null}
            >
                { data.map(value =>
                    <Option key={value}>{value}</Option>
                )}
            </Select>
        </Space>
    );
}

export default SearchField;