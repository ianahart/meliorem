import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { IStudySetCardFull } from '../../../../interfaces';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';
import { MdFullscreenExit, MdFullscreen } from 'react-icons/md';
import { IoPlayCircleOutline, IoPauseCircleOutline } from 'react-icons/io5';

import TextToSpeech from '../TextToSpeech';
import Card from './Card';

export interface IFlashCardsProps {
  studySetCards: IStudySetCardFull[];
}

const FlashCards = ({ studySetCards }: IFlashCardsProps) => {
  const intervalID = useRef<any>(null);
  const timeoutID = useRef<any>(null);
  const [actionClicked, setActionClicked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotated, setIsRotated] = useState(false);
  const [utterance, setUtterance] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const fullScreenWidth = isFullScreen ? ['95%', '95%', '100%'] : ['95%', '95%', '550px'];

  const onRotate = () => setIsRotated((prevState) => !prevState);

  const progressWidth = useMemo(() => {
    return 100 / studySetCards.length;
  }, [studySetCards.length]);

  useEffect(() => {
    setProgress(progressWidth);
  }, [progressWidth]);

  const onNextCard = () => {
    setIsRotated(false);
    setActionClicked(true);

    if (currentIndex < studySetCards.length - 1) {
      setProgress((prevState) => prevState + progressWidth);
      setCurrentIndex((prevState) => prevState + 1);
    } else {
      setProgress(progressWidth);
      setCurrentIndex(0);
    }
  };

  const onPrevCard = () => {
    setIsRotated(false);
    setActionClicked(true);

    if (currentIndex === 0) {
      setCurrentIndex(studySetCards.length - 1);
      setProgress(100);
    } else {
      setProgress((prevState) => prevState - progressWidth);
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  useEffect(() => {
    if (isRotated) {
      setUtterance(studySetCards[currentIndex]?.definition);
    } else {
      setUtterance(studySetCards[currentIndex]?.term);
    }
  }, [isRotated, setUtterance]);

  useEffect(() => {
    const definitionSeconds = 3000;
    const termSeconds = 7500;

    if (isPlaying) {
      intervalID.current = setInterval(() => {
        onNextCard();
        timeoutID.current = setTimeout(() => {
          setIsRotated(true);
          if (timeoutID.current !== null) {
            clearTimeout(timeoutID.current);
          }
        }, definitionSeconds);
      }, termSeconds);
    } else {
      clearInterval(intervalID.current);
      if (timeoutID.current !== null) {
        clearTimeout(timeoutID.current);
      }
    }

    return () => {
      clearInterval(intervalID.current);
    };
  }, [isPlaying, currentIndex]);
  return (
    <Box>
      {/*StudySetCard Hero*/}
      <Box as="section" display="flex" justifyContent={['center', 'center', 'unset']}>
        <Box className="cardContainer" maxW={fullScreenWidth} w="100%">
          <Card
            onRotate={onRotate}
            setActionClicked={setActionClicked}
            actionClicked={actionClicked}
            isRotated={isRotated}
            studySetCard={studySetCards[currentIndex]}
            isFullScreen={isFullScreen}
          />
          {isPlaying && (
            <Box borderRadius={8} my="1.5rem" color="#fff" bg="bg.primary" p="0.5rem">
              <Text textAlign="center" fontSize="1.2rem" fontWeight="bold">
                AUTO-play is on
              </Text>
            </Box>
          )}
          <Box mt="1rem" position="relative" height="3px" background="gray" borderRadius={8} width="100%">
            <Box bg="#fff" height="3px" borderRadius={8} width={`${progress}%`} mx="0.25rem"></Box>
          </Box>
          {/*Controls*/}
          <Flex color="#fff" justify="space-between" my="1.5rem" align="center">
            <Box>
              <Tooltip label={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? (
                  <Box
                    fontSize="3rem"
                    cursor="pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlaying(false);
                    }}
                  >
                    <IoPauseCircleOutline />
                  </Box>
                ) : (
                  <Box
                    fontSize="3rem"
                    cursor="pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlaying(true);
                    }}
                  >
                    <IoPlayCircleOutline />
                  </Box>
                )}
              </Tooltip>
            </Box>

            <Flex justify="center" align="center">
              <Box mx="1.5rem" fontSize="3rem" cursor="pointer" onClick={onPrevCard}>
                <FaRegArrowAltCircleLeft />
              </Box>
              <Text mx="1.5rem" fontSize="1.5rem">
                {currentIndex + 1}/{studySetCards.length}
              </Text>
              <Box mx="1.5rem" fontSize="3rem" cursor="pointer" onClick={onNextCard}>
                <FaRegArrowAltCircleRight />
              </Box>
            </Flex>
            {/*Right side*/}
            <Flex align="center">
              <Box>
                <TextToSpeech text={utterance ?? studySetCards[currentIndex]?.term} />
              </Box>
              <Box>
                <Tooltip label={isFullScreen ? 'Exit fullscreen' : 'Fullscreen'}>
                  {isFullScreen ? (
                    <Box fontSize="1.5rem" cursor="pointer" onClick={() => setIsFullScreen(false)}>
                      <MdFullscreenExit />
                    </Box>
                  ) : (
                    <Box fontSize="1.5rem" cursor="pointer" onClick={() => setIsFullScreen(true)}>
                      <MdFullscreen />
                    </Box>
                  )}
                </Tooltip>
              </Box>
            </Flex>
          </Flex>
          {/*End Controls*/}
        </Box>
      </Box>
    </Box>
  );
};

export default FlashCards;
