import { Box, Flex, Stack } from "@chakra-ui/react";
import WalletStats from "./WalletStats";
import WalletTransaction from "./Wallet-transaction/WalletTransaction";
import WalletListTransactions from "./Wallet-list-transactions";

const Wallet = () => {
  return (
    <Box maxW={"1400px"} m={"40px auto"}>
      <Flex
        gap={{ base: "20px", xl: "none" }}
        mt={50}
        justifyContent={"space-between"}
        alignItems={{ base: "center", xl: "start" }}
        direction={{ base: "column", xl: "row" }}
      >
        <Flex
          flexDirection={"column"}
          w={{ base: "80%", xl: "calc(100% - 540px)" }}
          gap={5}
        >
          <WalletStats />
          <WalletListTransactions />
        </Flex>
        <WalletTransaction />
      </Flex>
    </Box>
  );
};

export default Wallet;
