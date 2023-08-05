import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { Editor, Viewer } from "@toast-ui/react-editor";
import { useState } from "react";

interface Props {
  content: string;
  editorRef: React.MutableRefObject<any>;
}

export const TuiEditor = ({ content = "", editorRef }: Props) => {
  const [editContent, setEditContent] = useState<string>("HelloText");
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["image"],
    ["code"],
    ["scrollSync"],
  ];

  return (
    <>
      {editorRef && (
        <>
          <Editor
            ref={editorRef}
            initialValue={editContent || " "} // 글 수정 시 사용
            initialEditType="markdown" // wysiwyg & markdown
            previewStyle={window.innerWidth > 1000 ? "vertical" : "tab"} // tab, vertical
            hideModeSwitch={true}
            onChange={(e) => setEditContent(e)}
            height="calc(100% - 10rem)"
            theme={""} // '' & 'dark'
            usageStatistics={false}
            toolbarItems={toolbarItems}
            useCommandShortcut={true}
            plugins={[colorSyntax]}
          />
        </>
      )}
    </>
  );
};
