import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Box,
  Flex,
  RadioGroup,
  Stack,
  Radio,
  Text,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Client } from '../../../../util/client';
import { IStudySetCard } from '../../../../interfaces';

export interface IStudySetExportOptionProps {
  isOpen: boolean;
  onClose: () => void;
  studySetId: number;
}

const StudySetExportOption = ({ isOpen, onClose, studySetId }: IStudySetExportOptionProps) => {
  const [separator, setSeparator] = useState('tab');
  const [betweenRows, setBetweenRows] = useState('newLine');
  const [studySetCards, setStudySetCards] = useState<IStudySetCard[]>([]);
  const [textAreaValue, setTextAreaValue] = useState('');

  const parseStudySetCards = () => {
    let value = '';

    studySetCards.forEach(({ term, definition }) => {
      switch (true) {
        case separator === 'tab' && betweenRows === 'newLine':
          value += `${term}  ${definition}\n`;
          break;
        case separator === 'comma' && betweenRows === 'newLine':
          value += `${term}, ${definition}\n`;
          break;
        case separator === 'tab' && betweenRows === 'semicolon':
          value += `${term}   ${definition};`;
          break;
        case separator === 'comma' && betweenRows === 'semicolon':
          value += `${term}, ${definition}; `;
          break;
      }
    });
    setTextAreaValue(value);
  };

  useEffect(() => {
    parseStudySetCards();
  }, [separator, betweenRows, studySetCards.length]);

  const getStudySetCards = () => {
    Client.getStudySetCards(studySetId.toString())
      .then((res) => {
        const { data } = res.data;
        console.log(data);
        parseStudySetCards();

        setStudySetCards(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    if (isOpen) {
      getStudySetCards();
    }
  }, [isOpen]);

  const handleSetSeparator = (nextValue: string) => {
    setSeparator(nextValue);
  };

  const handleSetBetweenRows = (nextValue: string) => {
    setBetweenRows(nextValue);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="bg.primary" maxW={['95%', '95%', '450px']} w="100%" minH="250px">
        <ModalCloseButton color="#fff" fontSize="1.5rem" />
        <ModalBody color="#fff">
          <Box>
            <Heading fontSize="2rem" as="h3">
              Export
            </Heading>
          </Box>
          <Flex justify="space-around">
            <Box my="3rem">
              <Heading mb="0.25rem" fontSize="1rem" as="h3">
                Between term and definition
              </Heading>
              <RadioGroup defaultValue="tab" onChange={handleSetSeparator} value={separator}>
                <Stack direction="column">
                  <Radio colorScheme="purple" value="tab">
                    Tab
                  </Radio>
                  <Radio colorScheme="purple" value="comma">
                    Comma
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <Box my="3rem">
              <Heading mb="0.25rem" fontSize="1rem" as="h3">
                Between rows
              </Heading>
              <RadioGroup defaultValue="newLine" onChange={handleSetBetweenRows} value={betweenRows}>
                <Stack direction="column">
                  <Radio colorScheme="purple" value="newLine">
                    New line
                  </Radio>
                  <Radio colorScheme="purple" value="semicolon">
                    Semicolon
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </Flex>
          <Flex width="100%">
            <Box width="100%">
              <Text fontWeight="bold">Set content</Text>
              <Textarea
                className="overflow-scroll"
                overflowY="auto"
                readOnly
                value={textAreaValue}
                minH="120px"
                border="none"
              ></Textarea>
            </Box>
            <Flex>
              <Button onClick={() => navigator.clipboard.writeText(textAreaValue)} colorScheme="purple">
                Copy text
              </Button>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StudySetExportOption;
