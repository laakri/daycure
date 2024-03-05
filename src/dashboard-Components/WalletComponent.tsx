import {
  Flex,
  Input,
  Image,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Circles from "./CategoryWalletComponent";
import { CalendarIcon, CheckIcon } from "@chakra-ui/icons";

const Wallet = () => {
  const radius = 100;
  const smallRadius = 50;
  const count = 5;
  const smallCircleImages = [
    "https://cdn3d.iconscout.com/3d/premium/thumb/food-delivery-6352294-5229853.png",
    "https://cdn3d.iconscout.com/3d/premium/thumb/house-6338349-5220257.png",
    "https://cdn3d.iconscout.com/3d/premium/thumb/education-7686878-6159657.png",
    "https://cdn3d.iconscout.com/3d/premium/thumb/travel-by-plane-6209442-5087582.png",
    "https://cdn3d.iconscout.com/3d/premium/thumb/family-4835419-4024804.png?f=webp",
  ];
  const modalContent = [
    <div key={0}>
        <Flex justifyContent={"center"} gap={12} p={5}>
          <Stack spacing={4}>
            <Text fontSize={"xl"} color="#ffb802">
              Food Transaction
            </Text>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <CalendarIcon color="gray.300" />
              </InputLeftElement>
              <Input type="date" placeholder="Date" />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                $
              </InputLeftElement>
              <Input placeholder="Enter amount" />
              <InputRightElement>
                <CheckIcon color="green.500" />
              </InputRightElement>
            </InputGroup>
            <Textarea placeholder="Description" size="sm" />
          </Stack>
          <Stack spacing={6}>
            <Image
              boxSize="300px"
              src="https://cdn2.iconfinder.com/data/icons/ecommerce-422/512/ECommerce_4.png"
              alt="Dan Abramov"
            />
          </Stack>
        </Flex>
    </div>,
    <div key={1}>
      <Flex justifyContent={"center"} gap={12} p={5}>
        <Stack spacing={4}>
          <Text fontSize={"xl"} color="#ffb802">
          Home Transaction
          </Text>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <CalendarIcon color="gray.300" />
            </InputLeftElement>
            <Input type="date" placeholder="Date" />
          </InputGroup>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              $
            </InputLeftElement>
            <Input placeholder="Enter amount" />
            <InputRightElement>
              <CheckIcon color="green.500" />
            </InputRightElement>
          </InputGroup>
          <Textarea placeholder="Description" size="sm" />
        </Stack>
        <Stack spacing={6}>
          <Image
            boxSize="300px"
            src="https://cdn2.iconfinder.com/data/icons/ecommerce-422/512/ECommerce_4.png"
            alt="Dan Abramov"
          />
        </Stack>
      </Flex>
    </div>,
    <div key={2}>
     <Flex justifyContent={"center"} gap={12} p={5}>
        <Stack spacing={4}>
          <Text fontSize={"xl"} color="#ffb802">
          Study Transaction
          </Text>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <CalendarIcon color="gray.300" />
            </InputLeftElement>
            <Input type="date" placeholder="Date" />
          </InputGroup>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              $
            </InputLeftElement>
            <Input placeholder="Enter amount" />
            <InputRightElement>
              <CheckIcon color="green.500" />
            </InputRightElement>
          </InputGroup>
          <Textarea placeholder="Description" size="sm" />
        </Stack>
        <Stack spacing={6}>
          <Image
            boxSize="300px"
            src="https://cdn2.iconfinder.com/data/icons/ecommerce-422/512/ECommerce_4.png"
            alt="Dan Abramov"
          />
        </Stack>
      </Flex>
    </div>,
    <div key={3}>
       <Flex justifyContent={"center"} gap={12} p={5}>
        <Stack spacing={4}>
          <Text fontSize={"xl"} color="#ffb802">
          Travel Transaction
          </Text>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <CalendarIcon color="gray.300" />
            </InputLeftElement>
            <Input type="date" placeholder="Date" />
          </InputGroup>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              $
            </InputLeftElement>
            <Input placeholder="Enter amount" />
            <InputRightElement>
              <CheckIcon color="green.500" />
            </InputRightElement>
          </InputGroup>
          <Textarea placeholder="Description" size="sm" />
        </Stack>
        <Stack spacing={6}>
          <Image
            boxSize="300px"
            src="https://cdn2.iconfinder.com/data/icons/ecommerce-422/512/ECommerce_4.png"
            alt="Dan Abramov"
          />
        </Stack>
      </Flex>
    </div>,
    <div key={4}>
       <Flex justifyContent={"center"} gap={12} p={5}>
        <Stack spacing={4}>
          <Text fontSize={"xl"} color="#ffb802">
          Family Transaction
          </Text>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <CalendarIcon color="gray.300" />
            </InputLeftElement>
            <Input type="date" placeholder="Date" />
          </InputGroup>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              $
            </InputLeftElement>
            <Input placeholder="Enter amount" />
            <InputRightElement>
              <CheckIcon color="green.500" />
            </InputRightElement>
          </InputGroup>
          <Textarea placeholder="Description" size="sm" />
        </Stack>
        <Stack spacing={6}>
          <Image
            boxSize="300px"
            src="https://cdn2.iconfinder.com/data/icons/ecommerce-422/512/ECommerce_4.png"
            alt="Dan Abramov"
          />
        </Stack>
      </Flex>
    </div>,
  ];
  return (
      <Flex flexDirection="column" gap="20px">
        <Circles
          radius={radius}
          smallRadius={smallRadius}
          count={count}
          smallCircleImages={smallCircleImages}
          modalContent={modalContent}
        />
      </Flex>
  );
};

export default Wallet;
