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
  const [nameError, setNameError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (e) => {
    const { name, value } = e.target;

 
    if (name === "phone") {
      const formattedPhone = value.replace(/\D/g, "").slice(0, 10); 
      setUserDataState((prevData) => ({
        ...prevData,
        [name]: formattedPhone,
      }));
    } else {
      setUserDataState((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

  
    if (name === "name" && /[^a-zA-Z ]/.test(value)) {
      setNameError("Only letters are allowed in the name.");
    } else {
      setNameError("");
    }
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

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(userData.email)) {
      toast({
        title: "Invalid Email.",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (userData.phone.length !== 10) {
      toast({
        title: "Invalid Phone Number.",
        description: "Phone number should be 10 digits.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newUserData = { ...userData, id: userData.id || uuidv4() }; 
    setUserData(newUserData); 
    setUserDataState({ id: "", name: "", email: "", address: "", phone: "" }); 
    setIsFormSubmitted(true); 

    toast({
      title: "User data saved.",
      description: "Your data has been successfully saved.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box flex="1" p={4} borderWidth="3px" borderRadius="md" height={-100} borderColor={'black'}>
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
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                required
                pattern="[A-Za-z ]+" 
              />
              {nameError && (
                <Text color="red" fontSize="sm" mt={1}>
                  {nameError}
                </Text>
              )}
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
            <Text as="label" htmlFor="address" ml={350} fontWeight="bold" fontSize={20}>
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
            <Text as="label" htmlFor="phone" fontWeight="bold" ml={350} fontSize={20}>
              Phone
            </Text>
            <Input
              type="text" 
              id="phone"
              name="phone"
              value={`${userData.phone}`}
              onChange={handleChange}
              maxLength="10" 
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
