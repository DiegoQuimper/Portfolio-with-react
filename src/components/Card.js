import { Heading, HStack, Image, Text, VStack, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {

  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (

    <HStack spacing={8}>
      <Box backgroundColor='white' borderRadius='10px' paddingBottom={4} >
        <Image src={imageSrc} alt='Project Image' borderRadius='10px' />
        <VStack align="start" spacing={4} padding={4}>
          <Heading size='md' color='black'>{title}</Heading>
          <Text fontSize='lg' color='gray.600'>{description}</Text>
        </VStack>
        <Text as="span" color='gray.900' padding={4} fontWeight='600' fontSize='lg'>
          See More <FontAwesomeIcon icon={faArrowRight} />
        </Text>
      </Box>
    </HStack>

  )
};

export default Card;
