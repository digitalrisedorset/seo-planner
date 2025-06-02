import React, {useEffect, useRef} from "react";
import {capitalise} from "@/lib/string";
import {Property} from "csstype";
import BoxSizing = Property.BoxSizing;
import Resize = Property.Resize;

interface TextAreaProps {
    name: string
    value: string | number
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextArea: React.FC<TextAreaProps> = ({name, value, onChange}: TextAreaProps) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        const focusInput = () => {
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto"; // Reset height
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
            }
        };
        focusInput()
    }, [value]);

    const style: {
        minHeight: string,
        maxHeight: string,
        resize: Resize | undefined,
        padding: string,
        boxSizing: BoxSizing | undefined,
        overflow: string
    } = {
        minHeight: "38px",
        maxHeight: "200px", // Adjust as needed
        resize: "none",
        padding: "9px",
        boxSizing: "border-box",
        overflow: "hidden", // Prevent scrollbar flickering
    };

    return <textarea
            name={name}
            rows={1}
            ref={textareaRef}
            placeholder={capitalise(name)}
            value={value}
            onChange={onChange}
            style={style}
        />
}