import React from 'react'
import { Editor } from '@tiptap/core'

interface Props {
    editor: Editor
}

export default function RTEToolBar({editor}: Props) {
    return (
        <div className="control-group">
            <div className="button-group">
                <button
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
                >
                    Left
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
                >
                    Center
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                >
                    Right
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
                >
                    Justify
                </button>
                <button onClick={() => editor.chain().focus().unsetTextAlign().run()}>
                    Unset text align
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleTextAlign('right').run()}
                    className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                >
                    Toggle Right
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive({ level: 1 }) ? 'is-active' : ''}
                >
                    Toggle H1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive({ level: 2 }) ? 'is-active' : ''}
                >
                    Toggle H2
                </button>
            </div>
        </div>
    )
}
