import { Box, Button, Collapse, Flex, Image, Input, Text, Tooltip } from '@chakra-ui/react';
import { RiDraggable } from 'react-icons/ri';
import { FaTrash } from 'react-icons/fa';
import { IStudySetCard, IStudySetContext } from '../../../interfaces';
import { DraggableProvided } from 'react-beautiful-dnd';
import { useContext, useState } from 'react';
import { StudySetContext } from '../../../context/studyset';
import { FaRegImage } from 'react-icons/fa';

import StudySetCardInput from './StudySetCardInput';
import StudySetCardOptions from './StudySetCardOptions';
import { Client } from '../../../util/client';
import BasicSpinner from '../../Shared/BasicSpinner';
import { nanoid } from 'nanoid';
export interface IStudySetCardProps {
  studySetCard: IStudySetCard;
  provided: DraggableProvided;
  number: number;
}

const StudySetCard = ({ studySetCard, provided, number }: IStudySetCardProps) => {
  const { studySetForm, handleSetStudySetForm } = useContext(StudySetContext) as IStudySetContext;

  const [imagesOpen, setImagesOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const toggleImages = () => {
    setImagesOpen((prevState) => !prevState);
    if (!imagesOpen) {
      setImages([]);
      setSearchTerm('');
    }
  };

  const deleteStudySetCard = () => {
    const cards = [...studySetForm.cards]
      .filter((card) => card.id !== studySetCard.id)
      .map((card, index) => {
        card['order'] = index;
        return card;
      });

    handleSetStudySetForm({ ...studySetForm, cards });
  };

  const updateField = (name: string, value: string) => {
    const cards = [...studySetForm.cards].map((card) => {
      if (card.id === studySetCard.id) {
        card[name] = value;
      }
      return card;
    });

    handleSetStudySetForm({ ...studySetForm, cards });
  };

  const fetchImages = () => {
    if (searchTerm.trim().length === 0) return;

    setIsLoading(true);
    Client.getStudySetImages(searchTerm)
      .then((res) => {
        setImages(res.data.photos);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        throw new Error(err);
      });
  };

  const selectImage = (image: string) => {
    const cards = [...studySetForm.cards].map((card) => {
      if (card.id === studySetCard.id) {
        return { ...card, image };
      } else {
        return card;
      }
    });
    handleSetStudySetForm({ ...studySetForm, cards });
    setImagesOpen(false);
  };

  return (
    <Box
      borderRadius={8}
      my="1.5rem"
      bg={studySetCard.bgColor.length > 0 ? studySetCard.bgColor : 'form.primary'}
      backgroundImage={studySetCard.image.length > 0 ? `url(${studySetCard.image})` : 'unset'}
      backgroundSize={studySetCard.image.length > 0 ? 'cover' : 'unset'}
      backgroundPosition="center"
    >
      <StudySetCardOptions studySetCardId={studySetCard.id.toString()} />
      <Flex p="1rem" pt="0" color="primarylight" justify="space-between" align="center" cursor="pointer">
        <Box>
          <Text fontSize="1.4rem" fontWeight="bold">
            {number + 1}
          </Text>
        </Box>
        <Flex align="center">
          <Tooltip label="Drag">
            <Box fontSize="3rem" mx="0.5rem" {...provided.dragHandleProps}>
              <RiDraggable />
            </Box>
          </Tooltip>
          <Tooltip label="Delete">
            <Box onClick={deleteStudySetCard} fontSize="2rem" mx="0.5rem">
              <FaTrash />
            </Box>
          </Tooltip>
        </Flex>
      </Flex>
      <Box height="2px" backgroundColor="#2e2e2f"></Box>
      <Flex
        flexDir={['column', 'column', 'row']}
        py="1rem"
        my="2rem"
        justify="center"
        align="center"
        width="100%"
        mx="auto"
      >
        <Box width={['90%', '90%', '40%']} mx="1.5rem">
          <StudySetCardInput
            updateField={updateField}
            label="TERM"
            placeHolder="Enter a term"
            color={studySetCard.color ?? '#fff'}
            value={studySetCard.term}
            name="term"
          />
        </Box>
        <Box width={['90%', '90%', '40%']} mx="1.5rem">
          <StudySetCardInput
            updateField={updateField}
            label="DEFINITION"
            placeHolder="Enter a definition"
            color={studySetCard.color ?? '#fff'}
            value={studySetCard.definition}
            name="definition"
          />
        </Box>
        <Box onClick={toggleImages} border="1px #fff dashed" p="1rem">
          <Flex cursor="pointer" flexDir="column" align="center">
            <Box fontSize="2rem">
              <FaRegImage />
            </Box>
            <Box>
              <Text textTransform="uppercase" fontWeight="bold" fontSize="1.2rem">
                Image
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Collapse in={imagesOpen} animateOpacity>
        <Box bg="#242323" minH="225px">
          <Flex width="300px" p="1rem">
            <Input
              name="photo"
              id="photo"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              placeholder="Search for a photo"
              _placeholder={{ fontSize: '1.2rem' }}
              _focus={{ boxShadow: 'none', borderColor: 'form.primary' }}
              type="text"
              border="none"
              borderRadius={0}
              borderBottom="3px solid #fff"
            />
            <Button onClick={fetchImages} colorScheme="purple" fontSize="1.2rem" size="lg" ml="2rem">
              Search
            </Button>
          </Flex>
          {isLoading && (
            <Flex justify="center" my="2rem">
              <BasicSpinner message="Loading images..." color="#fff" />
            </Flex>
          )}

          {images.length > 0 && (
            <Flex flexWrap="wrap">
              {images.map((image) => {
                return (
                  <Image
                    onClick={() => selectImage(image)}
                    my="1rem"
                    mx="1rem"
                    width="60px"
                    height="60px"
                    borderRadius={8}
                    key={nanoid()}
                    src={image}
                    alt="image from pexels"
                  />
                );
              })}
            </Flex>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default StudySetCard;
