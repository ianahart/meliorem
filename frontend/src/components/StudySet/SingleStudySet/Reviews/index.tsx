import {
  Box,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Divider,
  Text,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { useContext, useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FeedbackChoices } from '../../../../enums';
import { UserContext } from '../../../../context/user';
import { IUserContext } from '../../../../interfaces';
import { Client } from '../../../../util/client';

export interface IReviewsProps {
  studySetTitle: string;
  studySetId: number;
}

const Reviews = ({ studySetTitle, studySetId }: IReviewsProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(UserContext) as IUserContext;
  const [rating, setRating] = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackChoices | null>(null);
  const [error, setError] = useState('');
  const NUM_OF_STARS = 5;

  const handleAddReview = () => {
    const data = { feedback: selectedFeedback, userId: user.id, studySetId, rating };
    setError('');

    Client.createReview(data)
      .then(() => {
        onClose();
      })
      .catch((err) => {
        setError(err.response.data.message);
        throw new Error(err);
      });
  };

  const handleOnMouseEnter = (index: number) => {
    setRating(index);
  };

  return (
    <>
      <Flex color="#fff" align="center">
        <Box mr="1rem">
          <Heading as="h3" fontSize="1.7rem">
            {studySetTitle}
          </Heading>
        </Box>
        <Flex align="center" fontSize="1.2rem" fontWeight="bold">
          <Box mx="0.25rem" color="gray" fontSize="1.4rem">
            <AiFillStar />
          </Box>
          <Box mx="0.25rem">2.7</Box>
          <Box onClick={onOpen} _hover={{ opacity: 0.7 }} cursor="pointer" mx="0.25rem">
            (503 reviews)
          </Box>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minH="300px" bg="bg.primary" w="100%" maxW={['95%', '95%', '500px']}>
          <ModalHeader color="#fff">How would you rate this set?</ModalHeader>
          <ModalCloseButton color="#fff" />
          <ModalBody>
            {error.length > 0 && (
              <Flex my="1rem" justify="center">
                <Text fontWeight="bold" color="red.500">
                  {error}
                </Text>
              </Flex>
            )}
            <Box>
              <Flex align="center">
                {[...Array(NUM_OF_STARS)].map((_, index) => {
                  index += 1;
                  return (
                    <Box
                      onMouseEnter={() => handleOnMouseEnter(index)}
                      key={nanoid()}
                      cursor="pointer"
                      mx="0.5rem"
                      fontSize="1.7rem"
                    >
                      {rating >= index ? <AiFillStar color="gold" /> : <AiOutlineStar color="#fff" />}
                    </Box>
                  );
                })}
              </Flex>
              <Divider borderColor="gray.600" orientation="horizontal" my="2rem" />
              <Box>
                <Heading fontSize="1.3rem" color="#fff" as="h3">
                  Tell us what you liked about it
                </Heading>
                <Box my="1rem">
                  <Flex align="center">
                    {Object.values(FeedbackChoices).map((choice) => {
                      return (
                        <Button
                          onClick={() => setSelectedFeedback(choice)}
                          _hover={{ opacity: 0.7, color: '#fff', bgColor: 'primary.dark' }}
                          mx="0.5rem"
                          backgroundColor={selectedFeedback === choice ? 'primary.dark' : 'gray.100'}
                          color={selectedFeedback === choice ? '#fff' : '#333'}
                          key={nanoid()}
                        >
                          {choice}
                        </Button>
                      );
                    })}
                  </Flex>
                </Box>
                <Divider borderColor="gray.600" orientation="horizontal" my="2rem" />
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={handleAddReview}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Reviews;
