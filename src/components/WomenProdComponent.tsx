import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { getSephoraProdData } from "../apis/SephoraApi";
import { Box, Text, Flex, Image, Link } from "@chakra-ui/react";
import { DragHandleIcon, ArrowForwardIcon,ArrowBackIcon } from "@chakra-ui/icons";

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
    <Box
      border="1px solid var(--bordercolor)"
      borderRadius="10px"
      p="10px"
      width="max-content"
      background="var(--lvl1-darkcolor)"
      position="relative"
      minW="350px"
    >
      <Box position={"absolute"} right="10px">
        <button>
          <DragHandleIcon />
        </button>
      </Box>
      <Text fontSize="md" fontWeight="bold">
        Store Information Sephora
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
                      <Text 
                      color={"gray"}>
                        
                        {`${store.address.address1}, ${store.address.city}, ${store.address.state}, ${store.address.country}, ${store.address.postalCode}`}
                      </Text>
                      <Text>
                        <strong>Store Type:</strong> {store.storeType}
                      </Text>
                    </Box>
                    <Box>
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
      <button className="carousel-button" onClick={prevSlide}>
      <ArrowBackIcon/>

          </button>
          <button className="carousel-button" onClick={nextSlide}>
      <ArrowForwardIcon/>
         
          </button> 
    </Box>
  );
};

export default WomenProd;
