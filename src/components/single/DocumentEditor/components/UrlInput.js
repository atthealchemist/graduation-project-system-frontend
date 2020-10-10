import React from "react";

export const UrlInput = ({url, onChange}) => {
    const [value, setValue] = React.useState(url)

    const handleInputChange = (event) => {
        const newUrl = event.target.value;
        setValue(newUrl);
        onChange(newUrl);
    };

    const handleInputClick = (event) => event.stopPropagation();

    return (
        <input
            value={value}
            onClick={handleInputClick}
            style={{
                marginTop: '5px',
                boxSizing: 'border-box',
            }}
            onChange={handleInputChange}
        />
    )
}