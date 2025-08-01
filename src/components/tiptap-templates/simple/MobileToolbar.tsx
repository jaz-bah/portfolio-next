// components/tiptap-toolbar/MobileToolbar.tsx
"use client"

import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon"
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon"
import { LinkIcon } from "@/components/tiptap-icons/link-icon"
import { Button } from "@/components/tiptap-ui-primitive/button"
import { ToolbarGroup, ToolbarSeparator } from "@/components/tiptap-ui-primitive/toolbar"
import {
    ColorHighlightPopoverContent,
} from "@/components/tiptap-ui/color-highlight-popover"
import {
    LinkContent,
} from "@/components/tiptap-ui/link-popover"
import * as React from "react"

interface MobileToolbarProps {
    type: "highlighter" | "link"
    onBack: () => void
}

export const MobileToolbar: React.FC<MobileToolbarProps> = ({
    type,
    onBack,
}) => (
    <>
        <ToolbarGroup>
            <Button data-style="ghost" onClick={onBack}>
                <ArrowLeftIcon className="tiptap-button-icon" />
                {type === "highlighter" ? (
                    <HighlighterIcon className="tiptap-button-icon" />
                ) : (
                    <LinkIcon className="tiptap-button-icon" />
                )}
            </Button>
        </ToolbarGroup>

        <ToolbarSeparator />

        {type === "highlighter" ? (
            <ColorHighlightPopoverContent />
        ) : (
            <LinkContent />
        )}
    </>
)
