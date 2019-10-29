import React, {FunctionComponent, useState} from 'react';
import {ColorPicker } from "../ColorPicker";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER_STYLES } from "../../../../../queries";
import "./HeaderStyles.css";

export const HeaderStyles: FunctionComponent<any> = ({header: { colors, size, fonts, borderRadius }, numColors, numFonts}) => {

    const handleColorChange: (color: any, index: number) => void = (color, index) => {

    }


    return (
        <div>
            <div className="header__colors">
                <label className="styles__color-label ant-form-item-label">Colors:</label>
                {Array.apply(null, {length: parseInt(numColors)}).map((color: string, i: number) => {
                    if (i < numColors) {
                        return <ColorPicker color={color ? color : '#fff'} onChange={(color) => handleColorChange(color, i)}/>
                    }

                })}
            </div>
        </div>
    )
}
