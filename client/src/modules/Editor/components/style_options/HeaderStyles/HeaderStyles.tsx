import React, {FunctionComponent, useState} from 'react';
import {ColorPicker } from "../ColorPicker";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER_STYLES } from "../../../../../queries";

export const HeaderStyles: FunctionComponent<any> = ({header: { colors, size, fonts, borderRadius }}) => {

    const handleColorChange: (color: any, index: number) => void = (color, index) => {

    }


    return (
        <div>
            <div className="header__colors">
                <label className="styles__color-label ant-form-item-label">Colors:</label>
                {colors.map((color: string, i: number) => <ColorPicker color={color} onChange={(color) => handleColorChange(color, i)}/>)}
            </div>
        </div>
    )
}
