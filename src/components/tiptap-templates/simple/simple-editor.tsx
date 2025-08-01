"use client"

import { EditorContent, EditorContext, useEditor } from "@tiptap/react"
import * as React from "react"
import { MainToolbar } from "./MainToolbar"
import { MobileToolbar } from "./MobileToolbar"

// --- Tiptap Core Extensions ---
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { TaskItem } from "@tiptap/extension-task-item"
import { TaskList } from "@tiptap/extension-task-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Underline } from "@tiptap/extension-underline"
import { StarterKit } from "@tiptap/starter-kit"

// --- Custom Extensions ---
import { Link } from "@/components/tiptap-extension/link-extension"

// --- UI Primitives ---
import {
  Toolbar
} from "@/components/tiptap-ui-primitive/toolbar"

// --- Tiptap Node ---
import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"

// --- Hooks ---
import { useCursorVisibility } from "@/hooks/use-cursor-visibility"
import { useIsMobile } from "@/hooks/use-mobile"
import { useWindowSize } from "@/hooks/use-window-size"

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss"


interface Props {
  value: string,
  onChange: (value: string) => void
}


export function SimpleEditor({value, onChange}: Props) {
  const isMobile = useIsMobile()
  const windowSize = useWindowSize()
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main")
  const toolbarRef = React.useRef<HTMLDivElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Typography,
      Superscript,
      Subscript,
      Link.configure({ openOnClick: false }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  })

  const bodyRect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  })

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main")
    }
  }, [isMobile, mobileView])

  return (
    <EditorContext.Provider value={{ editor }}>
      <Toolbar
        ref={toolbarRef}
        style={
          isMobile
            ? {
              bottom: `calc(100% - ${windowSize.height - bodyRect.y}px)`,
            }
            : {}
        }
      >
        {mobileView === "main" ? (
          <MainToolbar
            onHighlighterClick={() => setMobileView("highlighter")}
            onLinkClick={() => setMobileView("link")}
            isMobile={isMobile}
          />
        ) : (
          <MobileToolbar
            type={mobileView}
            onBack={() => setMobileView("main")}
          />
        )}

      </Toolbar>

      <div className="content-wrapper">
        <EditorContent
          editor={editor}
        />
      </div>
    </EditorContext.Provider>
  )
}
