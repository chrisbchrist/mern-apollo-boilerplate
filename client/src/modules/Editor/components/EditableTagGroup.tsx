import React, { useState, useEffect, useRef, FunctionComponent } from 'react';
import { Tag, Input, Tooltip, Icon, Form } from 'antd';

export const EditableTagGroup: FunctionComponent<any> = ({ form, push, remove}) => {
    const [inputVisible, setInputVisible] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');


    useEffect(() => console.log(form, push, remove), []);

    const showInput = () => {
        setInputVisible(true);
    };

    useEffect(() => {
        inputVisible && inputRef.current.focus();
    }, [inputVisible]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        push(inputValue);
        setInputVisible(false);
        setInputValue('');

    };

    const inputRef = useRef(null);


        return (

            <div>
                {form.values.tags.map((tag: any, index: number) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag key={tag + index} closable={true} onClose={() => remove(index)}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
                {inputVisible && (
                    <Input
                        ref={inputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag onClick={showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                        <Icon type="plus" /> New Tag
                    </Tag>
                )}
            </div>
        );

};