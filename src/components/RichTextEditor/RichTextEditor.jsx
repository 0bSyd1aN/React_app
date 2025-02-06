import React, { useState, useEffect, useCallback } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list'; 
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item'; 
import { Box, Text, Button } from '@chakra-ui/react';
import {
  FaBold, FaItalic, FaListUl, FaListOl,
  FaUndo, FaRedo, FaParagraph, FaUnderline,
} from 'react-icons/fa';
import './RichTextEditor.css';

const RichTextEditor = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const savedContent = localStorage.getItem('richTextContent');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const editor = useEditor({
    content,
    extensions: [StarterKit, Underline, BulletList, OrderedList, ListItem],
    onUpdate: ({ editor }) => {
      const data = editor.getHTML();
      setContent(data);
      localStorage.setItem('richTextContent', data);
    },
  });

  const handleMarkToggle = useCallback((mark) => {
    editor.chain().focus().toggleMark(mark).run();
  }, [editor]);

  const handleListToggle = useCallback((listType) => {
    if (listType === 'bulletList') {
      editor.chain().focus().toggleBulletList().run();
    } else {
      editor.chain().focus().toggleOrderedList().run();
    }
  }, [editor]);

  const isMarkActive = (mark) => editor?.isActive(mark);
  const isListActive = (listType) => editor?.isActive(listType, { itemType: 'listItem' });

  if (!editor) {
    return null;
  }

  return (
    <Box
      p={4}
      borderWidth="3px"
      borderRadius="md"
      borderColor={'black'}
      height="300px"
      mt={-5}
      mb={-20}
      display="flex"
      flexDirection="column"
    >
      <Text fontSize="lg" fontWeight="bold" align="center">
        Rich Text Editor
      </Text>
      <div style={{
        display: 'flex',
        gap: '10px',
        padding: '5px',
        borderBottom: '1px solid #ccc',
        backgroundColor: '#f0f0f0'
      }}>
        <Button onClick={() => handleMarkToggle('bold')} isActive={isMarkActive('bold')}><FaBold /></Button>
        <Button onClick={() => handleMarkToggle('italic')} isActive={isMarkActive('italic')}><FaItalic /></Button>
        <Button onClick={() => handleMarkToggle('underline')} isActive={isMarkActive('underline')}><FaUnderline /></Button>
        <Button onClick={() => handleListToggle('bulletList')} isActive={isListActive('bulletList')}><FaListUl /></Button>
        <Button onClick={() => handleListToggle('orderedList')} isActive={isListActive('orderedList')}><FaListOl /></Button>
        <Button onClick={() => editor.chain().focus().undo().run()}><FaUndo /></Button>
        <Button onClick={() => editor.chain().focus().redo().run()}><FaRedo /></Button>
      </div>
      <EditorContent
        editor={editor}
        style={{
          flexGrow: 1,
          padding: '10px',
          border: '1px solid #ccc',
          overflowY: 'auto',
          cursor: 'text'
        }}
      />
    </Box>
  );
};

export default RichTextEditor;
