import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { getSephoraProdData } from "../apis/SephoraApi";
import { Box, Text, Flex, Image, Button, Link } from "@chakra-ui/react";
import {
  DragHandleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";

const WomenProd: React.FC = () => {
  const [storeData, setStoreData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSephoraProdData();
        setStoreData(response.data.stores);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % storeData.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 3 + storeData.length) % storeData.length
    );
  };

  return (
    <Box>
      
      <Box
        border={"1px solid "}
        borderColor={"RGBA(255, 255, 255, 0.06)"}
        borderRadius="20px"
        p="10px"
        width="max-content"
        background="linear-gradient(to bottom, rgba(127, 57, 218, 0.111), transparent)"

        position="relative"
        minW="320px"
      >
        <Text fontSize="xl" fontWeight="bold" mb={4}>
       Sephora Store
      </Text>
        <Text
          fontSize="lg"
          fontWeight="bold"
          overflow="hidden"
          textOverflow="ellipsis"
          color={'gray.500'}
        >
          Discover the widely acclaimed skincare product
        </Text>

        <Flex
          direction="column"
          bg="var(--lvl3-darkcolor)"
          p="0px 10px 0px 10px"
          mt="10px"
          rounded="10px"
        >
          <Box
            borderRadius="10px"
            p="10px"
            width="max-content"
            position="relative"
            maxW="350px"
            h={'139px'}
          >
            <div className="carousel-wrapper">
              {storeData.length > 0 && (
                <Flex
                  className="carousel-inner"
                  transform={`translateX(-${currentIndex * (100 / 3)}%)`}
                >
                  {storeData.map((store, index) => (
                    <Flex
                      key={store.storeId}
                      className="carousel-slide"
                      w={`${100 / 3}%`}
                      justify="space-between"
                    >
                      <Box>
                        <Text fontSize="lg" fontWeight="bold">
                          {store.displayName}
                        </Text>
                        <Text color={"gray"}>
                          {`${store.address.address1}, ${store.address.city}, ${store.address.state}, ${store.address.country}, ${store.address.postalCode}`}
                        </Text>
                        <Text>
                          <strong>Store Type:</strong> {store.storeType}
                        </Text>
                        <Box>
                          <Link href={store.reservationUrl} isExternal>
                            <Text color={"rgb(94,216,250)"}>
                              Reservation <ExternalLinkIcon />
                            </Text>
                          </Link>
                        </Box>
                      </Box>
                      <Box maxW={"200px"}>
                        <Image
                          src={store.storeHeroImages.imagePath}
                          alt="Store"
                          className="carousel-image"
                        />
                      </Box>
                    </Flex>
                  ))}
                </Flex>
              )}
            </div>
          </Box>
        </Flex>

        <Flex my={4} gap={2} justifyContent={"center"}>
          <Button
            fontSize="25px"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            variant="link"
          >
            <ChevronLeftIcon />
          </Button>
          <Button fontSize="25px" onClick={nextSlide} variant="link">
            <ChevronRightIcon />
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default WomenProd;
