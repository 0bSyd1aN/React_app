import React, { useState } from "react";
import {
  Input,
  Button,
  VStack,
  Text,
  Box,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useUserDataContext } from "../../context/UserDataContext";

function UserForm() {
  const { setUserData } = useUserDataContext();
  const toast = useToast();

  // State to hold user data
  const [userData, setUserDataState] = useState({
    id: "",
    name: "",
    email: "",
    address: "",
    phone: "",
  });


  const [missingFields, setMissingFields] = useState([]);
  const [setIsFormSubmitted] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDataState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const missing = [];
    Object.keys(userData).forEach((key) => {
      if (key !== "id" && !userData[key]) {
        missing.push(key);
      }
    });


    if (missing.length > 0) {
      setMissingFields(missing);
      onOpen();
      return;
    }


    const newUserData = { ...userData, id: userData.id || uuidv4() }; // Generate ID if not present
    setUserData(newUserData); // Update the context with the new data
    setUserDataState({ id: "", name: "", email: "", address: "", phone: "" }); // Reset form fields
    setIsFormSubmitted(true); // Mark form as submitted


    toast({
      title: "User data saved.",
      description: "Your data has been successfully saved.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box flex="1" p={4} borderWidth="3px" borderRadius="md" height={-100} mt={-20} borderColor={'black'}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          {userData.id && (
            <Box w="full">
              <Text as="label">User ID:</Text>
              <Input type="text" value={userData.id} isReadOnly />
            </Box>
          )}

          <HStack w="full">
            <Box w="50%" borderColor={'black'}>
              <Text as="label" htmlFor="name" ml={175} fontWeight="bold" fontSize={20}>
                Name
              </Text>
              <Input
                type="String"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                required
              />
            </Box>
            <Box w="50%" borderColor={'black'}>
              <Text as="label" htmlFor="email" ml={175} fontWeight="bold" fontSize={20}>
                Email
              </Text>
              <Input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </Box>
          </HStack>
          <Box w="100%" borderColor={'black'}>
            <Text as="label" htmlFor="address" ml = {350} fontWeight="bold" fontSize={20}>
              Address
            </Text>
            <Input
              type="text"
              id="address"
              name="address"
              value={userData.address}
              onChange={handleChange}
            />
          </Box>

          <Box w="100%" borderColor={'black'}>
            <Text as="label" htmlFor="phone" fontWeight="bold" ml = {350} fontSize={20}>
              Phone
            </Text>
            <Input
              type="number"
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
            />
          </Box>

            <Button type="submit" colorScheme="blue" w="full" borderColor={'black'} fontWeight="bold" fontSize={20}>
              Save
            </Button>
        </VStack>
      </form>


      {missingFields.length > 0 && (
        <Text color="red" mt={4}>
          Please fill in the following fields: {missingFields.join(", ")}.
        </Text>
      )}


      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Missing Fields</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              You have missing information in the following fields:{" "}
              {missingFields.join(", ")}. Do you want to save anyway?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Save Anyway
            </Button>
            <Button variant="ghost" onClick={onClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default UserForm;
