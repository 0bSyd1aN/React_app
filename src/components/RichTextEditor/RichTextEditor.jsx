import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Box, Text } from '@chakra-ui/react';


function RichTextEditor() {
  const [content, setContent] = useState('');

  useEffect(() => {
    const savedContent = localStorage.getItem('richTextContent');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    localStorage.setItem('richTextContent', newContent);
  };

  return (
    <Box
      p={4}
      borderWidth="3px"
      borderRadius="md"
      borderColor={'black'}
      height="300"
      bg=""
      mt={-5}
      mb={50}
    >
      <Text fontSize="lg" fontWeight="bold" align="center">
        Rich Text Editor
      </Text>
      <Editor
        apiKey="i5dhw4obpbtknq0vhatd02sc22xktqxi3q4x17gyaqzij589"
        value={content}
        init={{
          height: 230,
          width: '100%',
          menubar: false,
          content_style: "body { background-color: ''; font-family: Arial, sans-serif; }",
          plugins: 'advlist autolink lists link charmap preview anchor',
          toolbar:
            'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link',
        }}
        onEditorChange={handleEditorChange}
      />
    </Box>
  );
}

export default RichTextEditor;

