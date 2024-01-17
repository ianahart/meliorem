import { Flex, Box, Tooltip, Heading } from '@chakra-ui/react';
import { RxColorWheel } from 'react-icons/rx';
import { AiOutlineFontColors } from 'react-icons/ai';
import ClickAwayMenu from '../Shared/ClickAwayMenu';
import { useContext, useRef, useState } from 'react';
import { StudySetContext } from '../../context/studyset';
import { IStudySetContext } from '../../interfaces';
import { colors } from '../../data';

interface IStudySetCardOptionsProps {
  studySetCardId: string;
}

const StudySetCardOptions = ({ studySetCardId }: IStudySetCardOptionsProps) => {
  const { studySetForm, handleSetStudySetForm } = useContext(
    StudySetContext
  ) as IStudySetContext;

  const [fontMenuOpen, setFontMenuOpen] = useState(false);
  const [backgroundMenuOpen, setBackgroundMenuOpen] = useState(false);

  const handleFontMenuOpen = (open: boolean) => setFontMenuOpen(open);
  const handleBackgroundMenuOpen = (open: boolean) => setBackgroundMenuOpen(open);

  const fontTriggerRef = useRef<HTMLDivElement>(null);
  const backgroundTriggerRef = useRef<HTMLDivElement>(null);
  const fontRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const changeColor = (keyName: string, color: string) => {
    const cards = studySetForm.cards.map((card) => {
      if (card.id === studySetCardId) {
        card[keyName] = color;
        if (keyName === 'bgColor') {
            card['image'] = '';
        }
      }
      return card;
    });
    handleSetStudySetForm({ ...studySetForm, cards });
  };

  return (
    <Flex>
      <Flex
        margin="0 auto"
        height="35px"
        justify="space-evenly"
        bg="rgba(0, 0,0,0.5)"
        width="120px"
        p="1rem 1rem 0.25rem 1rem"
        mt="1rem"
        borderRadius={25}
      >
        <Tooltip label="Font color">
          <Box
            onClick={() => handleFontMenuOpen(true)}
            position="relative"
            cursor="pointer"
            ref={fontTriggerRef}
            fontSize="2rem"
          >
            {fontMenuOpen && (
              <ClickAwayMenu
                handleMenuOpen={handleFontMenuOpen}
                triggerRef={fontTriggerRef}
                menuRef={fontRef}
                top={['30px', '30px', '-180px']}
                left={['-60px', 'unset', 'unset']}
                right={['-30px', '-30px', '-180px']}
                bottom={['unset', 'unset', 'unset']}
                backgroundColor="bg.primary"
                width="220px"
                height="180px"
              >
                <Box p="1rem">
                  <Heading fontSize="1.4rem" as="h4">
                    Font Color
                  </Heading>
                  <Flex flexWrap="wrap">
                    {colors.map(({ id, name }) => {
                      return (
                        <Box
                          onClick={() => changeColor('color', name)}
                          _hover={{ opacity: '0.6' }}
                          transition="opacity 0.25s ease-in"
                          m="0.5rem"
                          borderRadius={2}
                          height="18px"
                          width="18px"
                          cursor="pointer"
                          background={name}
                          key={id}
                        ></Box>
                      );
                    })}
                  </Flex>
                </Box>
              </ClickAwayMenu>
            )}

            <AiOutlineFontColors />
          </Box>
        </Tooltip>
        <Tooltip label="Card color">
          <Box
            ref={backgroundTriggerRef}
            onClick={() => handleBackgroundMenuOpen(true)}
            cursor="pointer"
            fontSize="2rem"
            pos="relative"
          >
            {backgroundMenuOpen && (
              <ClickAwayMenu
                handleMenuOpen={handleBackgroundMenuOpen}
                triggerRef={backgroundTriggerRef}
                menuRef={backgroundRef}
                top={['30px', '30px', '-180px']}
                left={['unset', 'unset', 'unset']}
                right={['-30px', '-30px', '-180px']}
                bottom={['unset', 'unset', 'unset']}
                backgroundColor="bg.primary"
                width="220px"
                height="180px"
              >
                <Box p="1rem">
                  <Heading fontSize="1.4rem" as="h4">
                    Card Color
                  </Heading>
                  <Flex flexWrap="wrap">
                    {colors.map(({ id, name }) => {
                      return (
                        <Box
                          onClick={() => changeColor('bgColor', name)}
                          _hover={{ opacity: '0.6' }}
                          transition="opacity 0.25s ease-in"
                          m="0.5rem"
                          borderRadius={2}
                          height="18px"
                          width="18px"
                          cursor="pointer"
                          background={name}
                          key={id}
                        ></Box>
                      );
                    })}
                  </Flex>
                </Box>
              </ClickAwayMenu>
            )}

            <RxColorWheel />
          </Box>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default StudySetCardOptions;
