'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Code,
  Quote,
  Minus,
  Undo,
  Redo,
  Eraser,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Heading from '@tiptap/extension-heading';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import History from '@tiptap/extension-history';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Disable default heading to use custom Heading extension
        codeBlock: false, // Disable default codeBlock to use custom CodeBlock extension
        blockquote: false, // Disable default blockquote to use custom Blockquote extension
        horizontalRule: false, // Disable default horizontalRule to use custom HorizontalRule extension
        history: false, // Disable default history to use custom History extension
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      CodeBlock,
      Blockquote,
      HorizontalRule,
      History,
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert max-w-none min-h-[120px] p-3 rounded-md focus:outline-none', // ⬅ removed "border ..." classes
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor content when value prop changes (e.g., on form reset or initial load)
  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value, false); // false to prevent triggering onUpdate
    }
  }, [value, editor]);

  return (
    <div className={cn('rounded-md border border-gray-200', className)}>
      <ToggleGroup
        type='multiple'
        className='flex w-full flex-wrap justify-start gap-1 border-b border-gray-200 p-2'
      >
        <ToggleGroupItem
          value='bold'
          aria-label='Toggle bold'
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
          className='h-8 w-8 p-0'
        >
          <Bold className='h-4 w-4' />
        </ToggleGroupItem>
        <ToggleGroupItem
          value='italic'
          aria-label='Toggle italic'
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
          className='h-8 w-8 p-0'
        >
          <Italic className='h-4 w-4' />
        </ToggleGroupItem>
        <ToggleGroupItem
          value='h1'
          aria-label='Toggle heading 1'
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          disabled={
            !editor?.can().chain().focus().toggleHeading({ level: 1 }).run()
          }
          className='h-8 w-8 p-0'
        >
          <Heading1 className='h-4 w-4' />
        </ToggleGroupItem>
        <ToggleGroupItem
          value='h2'
          aria-label='Toggle heading 2'
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={
            !editor?.can().chain().focus().toggleHeading({ level: 2 }).run()
          }
          className='h-8 w-8 p-0'
        >
          <Heading2 className='h-4 w-4' />
        </ToggleGroupItem>
        <ToggleGroupItem
          value='h3'
          aria-label='Toggle heading 3'
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={
            !editor?.can().chain().focus().toggleHeading({ level: 3 }).run()
          }
          className='h-8 w-8 p-0'
        >
          <Heading3 className='h-4 w-4' />
        </ToggleGroupItem>
        <ToggleGroupItem
          value='bulletList'
          aria-label='Toggle bullet list'
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          disabled={!editor?.can().chain().focus().toggleBulletList().run()}
          className='h-8 w-8 p-0'
        >
          <List className='h-4 w-4' />
        </ToggleGroupItem>
        <ToggleGroupItem
          value='orderedList'
          aria-label='Toggle ordered list'
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          disabled={!editor?.can().chain().focus().toggleOrderedList().run()}
          className='h-8 w-8 p-0'
        >
          <ListOrdered className='h-4 w-4' />
        </ToggleGroupItem>
        <ToggleGroupItem
          value='codeBlock'
          aria-label='Toggle code block'
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          disabled={!editor?.can().chain().focus().toggleCodeBlock().run()}
          className='h-8 w-8 p-0'
        >
          <Code className='h-4 w-4' />
        </ToggleGroupItem>
        <ToggleGroupItem
          value='blockquote'
          aria-label='Toggle blockquote'
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          disabled={!editor?.can().chain().focus().toggleBlockquote().run()}
          className='h-8 w-8 p-0'
        >
          <Quote className='h-4 w-4' />
        </ToggleGroupItem>
        <ToggleGroupItem
          value='horizontalRule'
          aria-label='Insert horizontal rule'
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          disabled={!editor?.can().chain().focus().setHorizontalRule().run()}
          className='h-8 w-8 p-0'
        >
          <Minus className='h-4 w-4' />
        </ToggleGroupItem>
        <ToggleGroupItem
          value='undo'
          aria-label='Undo'
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().chain().focus().undo().run()}
          className='h-8 w-8 p-0'
        >
          <Undo className='h-4 w-4' />
        </ToggleGroupItem>
        <ToggleGroupItem
          value='redo'
          aria-label='Redo'
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().chain().focus().redo().run()}
          className='h-8 w-8 p-0'
        >
          <Redo className='h-4 w-4' />
        </ToggleGroupItem>
        <ToggleGroupItem
          value='clear'
          aria-label='Clear formatting'
          onClick={() =>
            editor?.chain().focus().clearNodes().unsetAllMarks().run()
          }
          disabled={
            !editor?.can().chain().focus().clearNodes().unsetAllMarks().run()
          }
          className='h-8 w-8 p-0'
        >
          <Eraser className='h-4 w-4' />
        </ToggleGroupItem>
      </ToggleGroup>
      <EditorContent editor={editor} />
      {!editor?.isEmpty && !editor?.isFocused && !value && placeholder && (
        <div className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400'>
          {placeholder}
        </div>
      )}
    </div>
  );
}
