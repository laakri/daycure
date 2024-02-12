import { useState } from "react";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import WalletStats from "./WalletStats";
import WalletTransaction from "./Wallet-transaction/WalletTransaction";
import WalletListTransactions from "./Wallet-list-transactions";
import WalletInfos from "./WalletInfos";

const Wallet = () => {
  const [showTransactions, setShowTransactions] = useState(true);
  const [activeButton, setActiveButton] = useState("history");

  const handleTransactionAdded = () => {
    console.log("Transaction added!");
    // onTransactionAdded();
  };

  const showTransactionList = () => {
    setShowTransactions(true);
    setActiveButton("history");
  };

  const showInfos = () => {
    setShowTransactions(false);
    setActiveButton("infos");
  };

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
          gap={3}
        >
          <WalletStats onTransactionAdded={handleTransactionAdded} />
          <Flex justifyContent={"space-between"} px={5}>
            <Text fontSize={"xl"}>Transactions</Text>
            <Flex
              gap={4}
              p={"5px 10px"}
              rounded={4}
              bg={"var(--lvl1-darkcolor)"}
            >
              <Box
                bg={
                  activeButton === "infos"
                    ? "var(--lvl4-darkcolor)"
                    : "var(--lvl1-darkcolor)"
                }
                p={" 0 10px"}
                rounded={4}
                _hover={{
                  cursor: "pointer",
                  bg: "var(--lvl4-darkcolor)",
                }}
                onClick={showInfos}
              >
                Infos
              </Box>
              <Box
                bg={
                  activeButton === "history"
                    ? "var(--lvl4-darkcolor)"
                    : "var(--lvl1-darkcolor)"
                }
                p={" 0 10px"}
                rounded={4}
                _hover={{
                  cursor: "pointer",
                  bg: "var(--lvl4-darkcolor)",
                }}
                onClick={showTransactionList}
              >
                History
              </Box>
            </Flex>
          </Flex>
          <Divider orientation="horizontal" borderColor="var(--bordercolor)" />
          {showTransactions ? <WalletListTransactions /> : <WalletInfos />}
        </Flex>
        <WalletTransaction onTransactionAdded={handleTransactionAdded} />
      </Flex>
    </Box>
  );
};

export default Wallet;
