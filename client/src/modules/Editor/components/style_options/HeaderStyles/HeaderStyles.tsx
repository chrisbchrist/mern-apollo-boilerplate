import React, {FunctionComponent, useState} from 'react';
import {ColorPicker } from "../ColorPicker";

export const HeaderStyles: FunctionComponent<any> = ({header: { colors, size, fonts, borderRadius }}) => {


    return (
        <div>
            <div>
                <label className="styles__color-label ant-form-item-label">Colors:</label>
                {colors.map((color: string, i: number) => <ColorPicker color={(color: any) => }/>)}
            </div>
        </div>
    )
}
