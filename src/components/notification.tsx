import { Flex, Text } from "@chakra-ui/react";
import { IoNotifications } from "react-icons/io5";

const NotificationIcon = () => {
  const notificationCount = 3;

  return (
    <Flex alignItems="center" gap={2}>
      <Flex
        bg="var(--lvl3-darkcolor)"
        border="var(--bordercolor) solid 1px"
        rounded="5px"
        h="35px"
        w="35px"
        alignItems="center"
        justifyContent="center"
        fontSize="md"
        position="relative"
      >
        <IoNotifications />
        {notificationCount > 0 && (
          <Flex
            bg="red.500"
            color="white"
            rounded="full"
            w="20px"
            h="20px"
            fontSize="sm"
            alignItems="center"
            justifyContent="center"
            position="absolute"
            top="-5px"
            right="-5px"
          >
            {notificationCount}
          </Flex>
        )}
      </Flex>
      <Text fontSize="sm">Notifications</Text>
    </Flex>
  );
};

export default NotificationIcon;
