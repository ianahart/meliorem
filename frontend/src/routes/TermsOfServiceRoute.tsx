import { Box } from '@chakra-ui/react';

const TermsOfServiceRoute = () => {
  return (
    <>
      <Box mx="auto" mt="5rem" maxW="100%" w={['100%', '100%', '750px']} borderRadius={8} p="1rem" bg="#fff">
        <h1>Terms of Service</h1>

        <p>Welcome to Meliorem!</p>

        <p>
          These terms of service ("Terms") govern your access to and use of Meliorem and any related services
          (collectively referred to as the "Service"). By accessing or using the Service, you agree to be bound by these
          Terms.
        </p>

        <h2>1. Use of Service</h2>

        <p>
          1.1 Eligibility: You must be at least 18 years old or have the consent of a parent or guardian to use the
          Service.
        </p>

        <p>
          1.2 License: Meliorem is open-source software distributed under the terms of the MIT License. By accessing or
          using the Service, you agree to comply with the terms of the MIT License.
        </p>

        <p>
          1.3 Educational Purposes: Meliorem is primarily intended for educational and learning purposes. You may use
          the Service to explore, study, and experiment with software development concepts.
        </p>

        <h2>2. Code Contributions</h2>

        <p>
          2.1 Contribution License: By contributing code or other materials to Meliorem, you grant a non-exclusive,
          worldwide, royalty-free, perpetual, and irrevocable license to use, reproduce, modify, distribute, and
          sublicense the contributed materials under the terms of the MIT License.
        </p>

        <p>
          2.2 Attribution: You agree to include appropriate attribution to Meliorem and its contributors when using or
          distributing the application or any derived works.
        </p>

        <h2>3. Limitation of Liability</h2>

        <p>
          3.1 No Warranty: The Service is provided "as is," without warranty of any kind, express or implied, including
          but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.
        </p>

        <p>
          3.2 Limitation of Liability: In no event shall the authors or copyright holders be liable for any claim,
          damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in
          connection with the Service or the use or other dealings in the Service.
        </p>

        <h2>4. Indemnity</h2>

        <p>
          You agree to indemnify and hold harmless the authors and copyright holders from any claims, damages,
          liabilities, and expenses (including attorneys' fees) arising out of or related to your use or misuse of the
          Service, your violation of these Terms, or your violation of any law or third-party rights.
        </p>

        <h2>5. Changes to Terms</h2>

        <p>
          We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide
          notice on our website prior to any new terms taking effect.
        </p>

        <h2>6. Contact Us</h2>

        <p>If you have any questions about these Terms, please contact us at ianalexhart@gmail.com.</p>
      </Box>
    </>
  );
};

export default TermsOfServiceRoute;
