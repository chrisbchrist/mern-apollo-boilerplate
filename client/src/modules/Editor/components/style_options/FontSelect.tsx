import React, {FunctionComponent, useState} from 'react';
import {Select} from "antd";

const { Option } = Select;

interface FontSelectProps {
    font: string;
    onChange: (val: string) => void;
    options: string[];
}

export const FontSelect: FunctionComponent<any> = ({font, onChange, options}) => {

    return (
        <div>
            <label className="styles__color-label ant-form-item-label">Font:</label>
            <Select
                placeholder="Font"
                onChange={onChange}
                className="styles__font-select"
                style={{ fontFamily: font }}
                value={font}
            >
                {options.map((font: string, index: number) => (
                    <Option
                        key={font + index}
                        value={font}
                        style={{ fontFamily: font }}
                    >
                        {font}
                    </Option>
                ))}
            </Select>
        </div>
    )
}