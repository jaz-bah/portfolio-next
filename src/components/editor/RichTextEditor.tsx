'use client'

import { SimpleEditor } from "../tiptap-templates/simple/simple-editor";
import { Card } from "../ui/card";

interface Props {
    value: string,
    onChange: (value: string) => void
}

export default function RichTextEditor({value, onChange}: Props) {
    return (
        <Card className="w-full p-5 bg-accent">
            <SimpleEditor value={value} onChange={(value: string)=>onChange(value)} />
        </Card>
    );
}
