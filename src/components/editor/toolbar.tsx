'use client';

import { useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  LexicalEditor,
  COMMAND_PRIORITY_CRITICAL,
} from 'lexical';
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import {
  HeadingNode,
  QuoteNode,
  $isHeadingNode,
  $isQuoteNode,
  $createHeadingNode,
  $createQuoteNode,
} from '@lexical/rich-text'; // Ensure $createHeadingNode and $createQuoteNode are imported
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  UndoIcon,
  RedoIcon,
  ChevronDownIcon,
  PaletteIcon,
  PaintBucketIcon,
  TextIcon,
} from 'lucide-react';
import { $createParagraphNode } from 'lexical';
import { $setBlocksType } from '@lexical/selection';

const blockTypeToBlockName = {
  paragraph: 'Normal',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  quote: 'Quote',
  ul: 'Unordered List',
  ol: 'Ordered List',
};

const FONT_SIZES = [
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '28px',
  '32px',
];
const COLORS = [
  '#000000',
  '#FF0000',
  '#0000FF',
  '#008000',
  '#FFA500',
  '#800080',
  '#FFFFFF',
];

function getSelectedNode(selection: any) {
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  const [startNode, endNode] = isBackward
    ? [focusNode, anchorNode]
    : [anchorNode, focusNode];
  return startNode.getCommonAncestor(endNode);
}

function setStyle(editor: LexicalEditor, styleKey: string, styleValue: string) {
  editor.update(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      selection.getNodes().forEach((node) => {
        if ($isTextNode(node)) {
          const currentStyle = node.getStyle();
          // Remove existing styleKey if present, then add the new one
          const newStyle = `${styleKey}: ${styleValue}; ${currentStyle.replace(new RegExp(`${styleKey}: [^;]+;?`), '').trim()}`;
          node.setStyle(newStyle);
        }
      });
    }
  });
}

export function EditorToolbar() {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [blockType, setBlockType] = useState('paragraph');
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(
    null,
  );
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [fontSize, setFontSize] = useState('16px');
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      // Corrected: Use getTopLevelElement() to find the block element
      const element = anchorNode.getTopLevelElement() || anchorNode;
      const elementKey = element ? element.getKey() : null;
      const elementDOM = activeEditor.getElementByKey(elementKey!);

      if (elementDOM) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
        }
      }

      // Update text format states
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsCode(selection.hasFormat('code'));

      // Update font size and color
      const node = getSelectedNode(selection);
      if ($isTextNode(node)) {
        const style = node.getStyle();
        const currentFontSize =
          style.match(/font-size: ([^;]+);/)?.[1] || '16px';
        const currentTextColor =
          style.match(/color: ([^;]+);/)?.[1] || '#000000';
        const currentBgColor =
          style.match(/background-color: ([^;]+);/)?.[1] || '#FFFFFF';
        setFontSize(currentFontSize);
        setTextColor(currentTextColor);
        setBgColor(currentBgColor);
      } else {
        // Reset to default if no text node is selected or style is not found
        setFontSize('16px');
        setTextColor('#000000');
        setBgColor('#FFFFFF');
      }
    }
  }, [activeEditor]);

  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      activeEditor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          setActiveEditor(newEditor);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      activeEditor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      activeEditor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [activeEditor, updateToolbar]);

  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatHeading = (level: 'h1' | 'h2' | 'h3') => {
    if (blockType !== level) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(level));
        }
      });
    }
  };

  const formatList = (listType: 'ul' | 'ol') => {
    if (blockType === listType) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else if (listType === 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else if (listType === 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const onBlockTypeSelect = (value: string) => {
    switch (value) {
      case 'paragraph':
        formatParagraph();
        break;
      case 'h1':
      case 'h2':
      case 'h3':
        formatHeading(value as 'h1' | 'h2' | 'h3'); // Cast to correct type
        break;
      case 'ul':
      case 'ol':
        formatList(value as 'ul' | 'ol'); // Cast to correct type
        break;
      case 'quote':
        formatQuote();
        break;
      default:
        setBlockType('paragraph');
        break;
    }
  };

  return (
    <div className='bg-muted/20 flex flex-wrap items-center gap-1 rounded-t-md border-b p-2'>
      <Button
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        disabled={!canUndo}
        variant='ghost'
        size='icon'
        aria-label='Undo'
      >
        <UndoIcon className='h-4 w-4' />
      </Button>
      <Button
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        disabled={!canRedo}
        variant='ghost'
        size='icon'
        aria-label='Redo'
      >
        <RedoIcon className='h-4 w-4' />
      </Button>

      <div className='bg-border mx-1 h-6 w-px' />

      <Select value={blockType} onValueChange={onBlockTypeSelect}>
        <SelectTrigger className='h-8 w-[160px]'>
          <SelectValue placeholder='Format' />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(blockTypeToBlockName).map(([type, name]) => (
            <SelectItem key={type} value={type}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className='bg-border mx-1 h-6 w-px' />

      <Toggle
        size='sm'
        pressed={isBold}
        onPressedChange={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
        }
        aria-label='Format Bold'
      >
        <BoldIcon className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={isItalic}
        onPressedChange={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
        }
        aria-label='Format Italic'
      >
        <ItalicIcon className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={isUnderline}
        onPressedChange={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
        }
        aria-label='Format Underline'
      >
        <UnderlineIcon className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={isStrikethrough}
        onPressedChange={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
        }
        aria-label='Format Strikethrough'
      >
        <StrikethroughIcon className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={isCode}
        onPressedChange={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')
        }
        aria-label='Format Code'
      >
        <CodeIcon className='h-4 w-4' />
      </Toggle>

      <div className='bg-border mx-1 h-6 w-px' />

      <Select
        value={fontSize}
        onValueChange={(value) => setStyle(editor, 'font-size', value)}
      >
        <SelectTrigger className='h-8 w-[80px]'>
          <SelectValue placeholder='Size' />
        </SelectTrigger>
        <SelectContent>
          {FONT_SIZES.map((size) => (
            <SelectItem key={size} value={size}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' aria-label='Text Color'>
            <PaletteIcon className='h-4 w-4' style={{ color: textColor }} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='flex w-auto flex-wrap gap-1 p-1'>
          {COLORS.map((color) => (
            <DropdownMenuItem
              key={color}
              className='p-0'
              onSelect={() => setStyle(editor, 'color', color)}
            >
              <div
                className='h-6 w-6 cursor-pointer rounded-full border'
                style={{ backgroundColor: color }}
                title={color}
              />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' aria-label='Background Color'>
            <PaintBucketIcon className='h-4 w-4' style={{ color: 'black' }} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='flex w-auto flex-wrap gap-1 p-1'>
          {COLORS.map((color) => (
            <DropdownMenuItem
              key={color}
              className='p-0'
              onSelect={() => setStyle(editor, 'background-color', color)}
            >
              <div
                className='h-6 w-6 cursor-pointer rounded-full border'
                style={{ backgroundColor: color }}
                title={color}
              />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className='bg-border mx-1 h-6 w-px' />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' aria-label='Align Text'>
            <AlignLeftIcon className='h-4 w-4' />
            <ChevronDownIcon className='ml-1 h-3 w-3' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
            }
          >
            <AlignLeftIcon className='mr-2 h-4 w-4' />
            Left Align
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
            }
          >
            <AlignCenterIcon className='mr-2 h-4 w-4' />
            Center Align
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
            }
          >
            <AlignRightIcon className='mr-2 h-4 w-4' />
            Right Align
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
            }
          >
            <AlignJustifyIcon className='mr-2 h-4 w-4' />
            Justify
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
