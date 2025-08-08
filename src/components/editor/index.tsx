'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { EditorState, $getRoot } from 'lexical';
import { cn } from '@/lib/utils';

// Import necessary Lexical nodes for basic rich text features
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { EditorToolbar } from './toolbar';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';

interface TextEditorProps {
  initialEditorState?: string;
  onChange?: (data: {
    editorState: EditorState;
    json: string;
    html: string;
    plainText: string;
  }) => void;
  placeholder?: string;
  className?: string;
}

// Configuration for the Lexical editor
const editorConfig = {
  namespace: 'MyTextEditor',
  theme: {
    paragraph: 'mb-1',
    heading: {
      h1: 'text-2xl font-bold mb-2',
      h2: 'text-xl font-semibold mb-2',
      h3: 'text-lg font-medium mb-2',
    },
    list: {
      ul: 'list-disc pl-5 mb-1',
      ol: 'list-decimal pl-5 mb-1',
      listitem: 'ml-5',
    },
    quote: 'border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-1',
    text: {
      bold: 'font-bold',
      italic: 'italic',
      underline: 'underline',
      strikethrough: 'line-through',
      code: 'font-mono bg-gray-100 px-1 py-0.5 rounded text-sm',
    },
  },
  nodes: [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    AutoLinkNode,
    LinkNode,
  ],
  onError: (error: Error) => {
    console.error(error);
  },
};

// New internal component to handle content updates and use Lexical context
function ContentUpdater({ onChange }: Pick<TextEditorProps, 'onChange'>) {
  const [editor] = useLexicalComposerContext();

  const handleEditorChange = (editorState: EditorState) => {
    if (onChange) {
      editorState.read(() => {
        const jsonString = JSON.stringify(editorState.toJSON());
        const plainText = $getRoot().getTextContent();
        const htmlString = $generateHtmlFromNodes(editor, null);

        onChange({
          editorState,
          json: jsonString,
          html: htmlString,
          plainText: plainText,
        });
      });
    }
  };

  return <OnChangePlugin onChange={handleEditorChange} />;
}

export function TextEditor({
  initialEditorState,
  onChange,
  placeholder = 'Enter your text...',
  className,
}: TextEditorProps) {
  return (
    <div
      className={cn(
        'bg-background relative overflow-hidden rounded-md border',
        className,
      )}
    >
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          editorState: initialEditorState,
        }}
      >
        <EditorToolbar />
        <div className='relative'>
          <RichTextPlugin
            contentEditable={
              <ContentEditable className='min-h-[150px] resize-y p-4 text-sm leading-relaxed outline-none' />
            }
            placeholder={
              <div className='text-muted-foreground pointer-events-none absolute top-4 left-4'>
                {placeholder}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        {/* Render the new ContentUpdater component here */}
        {onChange && <ContentUpdater onChange={onChange} />}
      </LexicalComposer>
    </div>
  );
}
