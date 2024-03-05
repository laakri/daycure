import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import WalletStats from "./Wallet-stats/WalletStats";
import WalletTransaction from "./Wallet-transaction/WalletTransaction";
import WalletListTransactions from "./Wallet-history/Wallet-list-transactions";
import WalletInfos from "./Wallet-stats/WalletInfos";
import { CalendarIcon } from "@chakra-ui/icons";

const Wallet = () => {
  const [showTransactions, setShowTransactions] = useState(false);
  const [activeButton, setActiveButton] = useState("infos");

  const showTransactionList = () => {
    setShowTransactions(true);
    setActiveButton("history");
  };

  const showInfos = () => {
    setShowTransactions(false);
    setActiveButton("infos");
  };

  return (
    <Box m={" auto"} p={"10px"}>
      <Flex
        gap={{ base: "10px", xl: "none" }}
        mt={50}
        justifyContent={"space-between"}
        alignItems={{ base: "center", xl: "start" }}
        direction={{ base: "column", xl: "row" }}
      >
        <Flex
          flexDirection={"column"}
          w={{ base: "80%", xl: "calc(100% - 540px)" }}
          gap={6}
        >
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex gap={4}>
              <Text fontSize="2xl" fontWeight="bold">
                Wallet Stats
              </Text>
              <Text
                fontSize="md"
                fontWeight="bold"
                border={`var(--bordercolor) solid 1px`}
                p={"5px 8px "}
                rounded={8}
                gap={3}
                display={"flex"}
                alignItems={"center"}
              >
                <CalendarIcon color={"gray.500"} />
                2024
              </Text>
            </Flex>

            <Flex
              gap={4}
              p={"5px 10px"}
              rounded={5}
              bg={"var(--lvl1-darkcolor)"}
              border={"var(--bordercolor) solid 1px"}
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

          {showTransactions ? (
            <WalletListTransactions />
          ) : (
            <Flex flexDirection={"column"} gap={3}>
              <WalletStats />
              <WalletInfos />
            </Flex>
          )}
        </Flex>
        <WalletTransaction />
      </Flex>
    </Box>
  );
};

export default Wallet;
