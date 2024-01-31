import {
  Box,
  StatLabel,
  StatHelpText,
  Flex,
  Stat,
  StatNumber,
} from "@chakra-ui/react";

const WalletStats = () => {
  return (
    <Box>
      <Flex mt={10} gap={3}>
        <Box
          border={"1px"}
          borderColor={"gray.700"}
          w={"calc(100% / 4)"}
          rounded={10}
          p={"10px 20px"}
        >
          <Stat>
            <StatLabel fontSize={"xl"}> Total</StatLabel>
            <StatNumber>£0.00</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
        </Box>
        <Box
          border={"1px"}
          borderColor={"gray.700"}
          w={"calc(100% / 4)"}
          rounded={10}
          p={"10px 20px"}
        >
          <Stat>
            <StatLabel color={"green.400"} fontSize={"xl"}>
              Income
            </StatLabel>
            <StatNumber>0.00 Dt</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
        </Box>
        <Box
          border={"1px"}
          borderColor={"gray.700"}
          w={"calc(100% / 4)"}
          rounded={10}
          p={"10px 20px"}
        >
          <Stat>
            <StatLabel color={"red.400"} fontSize={"xl"}>
              Expenses
            </StatLabel>{" "}
            <StatNumber>0.00 Dt </StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
        </Box>
        <Box
          border={"1px"}
          borderColor={"gray.700"}
          w={"calc(100% / 4)"}
          rounded={10}
          p={"10px 20px"}
        >
          <Stat>
            <StatLabel color={"blue.400"} fontSize={"xl"}>
              Savings
            </StatLabel>
            <StatNumber>0.00 Dt</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
        </Box>
      </Flex>
    </Box>
  );
};

export default WalletStats;
