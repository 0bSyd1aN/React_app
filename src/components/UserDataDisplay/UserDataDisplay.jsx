import React from "react";
import { Text, Box } from "@chakra-ui/react";
import { useUserDataContext } from "../../context/UserDataContext.jsx";

function UserDataDisplay() {
  const { userData } = useUserDataContext();

  return (
    <Box p={4} borderWidth="3px" borderRadius="md" mt={-20} borderColor={'black'}>
      <Text fontSize="lg" fontWeight="bold">User Data (JSON Format)</Text>
      {userData ? (
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          {JSON.stringify(userData, null, 2)}
        </pre>
      ) : (
        <Text>No user data found.</Text>
      )}
    </Box>
  );
}

export default UserDataDisplay;