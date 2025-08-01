// components/tiptap-toolbar/MainToolbar.tsx
"use client"

import { Spacer } from "@/components/tiptap-ui-primitive/spacer"
import {
    ToolbarGroup,
    ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar"
import * as React from "react"

import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button"
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu"
import {
    LinkButton,
    LinkPopover,
} from "@/components/tiptap-ui/link-popover"
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu"
import { MarkButton } from "@/components/tiptap-ui/mark-button"
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button"
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button"

interface MainToolbarProps {
    onHighlighterClick: () => void
    onLinkClick: () => void
    isMobile: boolean
}

export const MainToolbar: React.FC<MainToolbarProps> = ({
    onLinkClick,
    isMobile,
}) => (
    <>
        <Spacer />

        <ToolbarGroup>
            <UndoRedoButton action="undo" />
            <UndoRedoButton action="redo" />
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
            <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
            <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
            <CodeBlockButton />
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
            <MarkButton type="bold" />
            <MarkButton type="italic" />
            <MarkButton type="strike" />
            <MarkButton type="code" />
            <MarkButton type="underline" />
            {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarSeparator />

        <ToolbarGroup>
            <TextAlignButton align="left" />
            <TextAlignButton align="center" />
            <TextAlignButton align="right" />
        </ToolbarGroup>

        <ToolbarSeparator />

        <Spacer />
    </>
)
