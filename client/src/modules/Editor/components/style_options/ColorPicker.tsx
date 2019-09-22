import React, {FunctionComponent, useState} from 'react';
import {TwitterPicker} from "react-color";

const popover = {
    position: "absolute",
    zIndex: 10
} as React.CSSProperties;

const cover = {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 0
} as React.CSSProperties;

export const ColorPicker: FunctionComponent<any> = ({ color, onChange, label}) => {

    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

    const toggleColorPicker = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setShowColorPicker(!showColorPicker);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center'}}>
            <label className="styles__color-label ant-form-item-label">
                {label + ":"}
            </label>
            <div
                className="styles__color-swatch"
                onClick={toggleColorPicker}
                style={{ background: color || "#1890ff" }}
            >
                {showColorPicker && (
                    <TwitterPicker
                        color={color}
                        onChange={onChange}
                        style={{ position: "absolute", top: "35px" }}
                    />
                )}
            </div>
            {showColorPicker && <div style={cover} onClick={toggleColorPicker} />}
        </div>
    )
}