import {
  Box,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from '@chakra-ui/react';
import landingSignUpImg from '../../assets/landing-signup.svg';
import landingBooksImg from '../../assets/landing-books.svg';
import landingCommunityImg from '../../assets/undraw-landing-community.svg';
import StepSection from './StepSection';

const steps = [{ title: 'Create Account' }, { title: 'Study' }, { title: 'Evolve' }];

const Steps = () => {
  return (
    <Box p="1rem" minH="800px">
      <Box p="1rem" mb="3rem" mt="5rem" bg="rgba(0, 0, 0, 0.45)" maxW="800px" w={['100%', '100%', '800px']} mx="auto">
        <Box>
          <Stepper colorScheme="purple" size="lg" color="#fff" p="1rem" bg="rgba(0, 0, 0, 0.8)" index={3}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                </StepIndicator>
                <Box flexShrink="0" color="#fff">
                  <StepTitle>{step.title}</StepTitle>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box mb="3rem" mt="10rem">
          <StepSection
            heading="Create Account"
            text="Sign up with Meliorem and create an account. Customize your avatar and your personal experience. Join other students studying the same topics."
            image={landingSignUpImg}
            rowReverse={false}
            alt="A person standing next to a signup form"
          />
          <StepSection
            heading="Hit The Books"
            text="Use our application to create study sets that align with your topic. Features of our study sets include: animated flash cards, flash cards video. Build study set study streaks along the way!"
            image={landingBooksImg}
            rowReverse={true}
            alt="Two people looking at a giant book"
          />
          <StepSection
            heading="Community"
            text="Create study groups and invite other students from your school or around the globe. Be held accountable by other students in your group. Make use of the group chat to stay in touch in real-time and add study sets to the group to study on."
            image={landingCommunityImg}
            alt="People revolving around a chat message"
            rowReverse={false}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Steps;
