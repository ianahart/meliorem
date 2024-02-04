import { Box, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoVolumeHigh } from 'react-icons/io5';

interface ITextToSpeechProps {
  text: string;
}

const TextToSpeech = ({ text }: ITextToSpeechProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState<any>(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    u.addEventListener('end', handleCancel);

    setUtterance(u);

    return () => {
      synth.cancel();
      u.removeEventListener('end', handleCancel);
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    setIsPlaying(true);

    synth.speak(utterance);
  };

  const handleCancel = () => {
    const synth = window.speechSynthesis;

    setIsPlaying(false);

    synth.cancel();
  };

  return (
    <Tooltip label="Text-to-speech">
      <Box
        onClick={isPlaying ? handleCancel : handlePlay}
        color={isPlaying ? 'gold' : '#fff'}
        fontSize="1.7rem"
        cursor="pointer"
        mx="1rem"
      >
        <IoVolumeHigh />
      </Box>
    </Tooltip>
  );
};

export default TextToSpeech;
