import { Box, Flex } from "@chakra-ui/react";
import WalletStats from "./WalletStats";
import WalletTransaction from "./Wallet-transaction/WalletTransaction";

const Wallet = () => {
  return (
    <Box maxW={"1400px"} m={"40px auto"}>
      <Flex
        mt={50}
        justifyContent={"space-between"}
        alignItems={"start"}
        display={"flex"}
      >
        <WalletStats />
        <WalletTransaction />
      </Flex>
    </Box>
  );
};

export default Wallet;
