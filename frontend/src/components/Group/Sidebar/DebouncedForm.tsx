import { Box, Flex, Button, FormControl, Heading, Input, useOutsideClick, Text } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { useCallback, useRef, useState } from 'react';
import { IPagination } from '../../../interfaces';

interface IDebouncedFormProps {
  pagination: IPagination;
  handleSetPagination: (pagination: IPagination) => void;
  clearCollection: () => void;
  heading: string;
  getData: (pageNum: number, paginate: boolean, query: string) => void;
  placeholder: string;
  children: React.ReactNode;
  handleSetIsDropdownOpen: (isDropdownOpen: boolean) => void;
  isDropdownOpen: boolean;
  error: string;
  handleSetError: (error: string) => void;
}

const DebouncedForm = ({
  pagination,
  handleSetPagination,
  clearCollection,
  heading,
  placeholder,
  getData,
  children,
  handleSetIsDropdownOpen,
  isDropdownOpen,
  error = '',
  handleSetError,
}: IDebouncedFormProps) => {
  const [search, setSearch] = useState('');

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: ref,
    handler: () => {
      handleSetIsDropdownOpen(false);
      clearCollection();
      handleSetError('');
      setSearch('');
      handleSetPagination({ page: 0, pageSize: 3, totalPages: 0, direction: 'next', totalElements: 0 });
    },
  });

  const preformDebounce = debounce((query) => {
    applySearch(query, false);
  }, 250);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (searchValue.length === 0) {
      clearCollection();
      handleSetIsDropdownOpen(false);
      handleSetPagination({ page: 0, pageSize: 3, totalPages: 0, direction: 'next', totalElements: 0 });
    }
    debouncedSearch(searchValue);
    setSearch(searchValue);
  };

  const debouncedSearch = useCallback((query: string) => preformDebounce(query), []);

  const applySearch = (query: string, paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    if (query.trim().length === 0) return;
    getData(pageNum, paginate, query);
  };

  return (
    <Box>
      <Heading color="#fff" fontSize="1.4rem" as="h4">
        {heading}
      </Heading>
      {error.length > 0 && (
        <Flex my="1rem">
          <Text color="#fff">{error}</Text>
        </Flex>
      )}
      <Box my="1rem">
        <form>
          <FormControl>
            <Input
              autoComplete="off"
              value={search}
              onChange={handleOnChange}
              color="#fff"
              placeholder={placeholder}
              borderColor="gray.700"
              height="35px"
            />
          </FormControl>
        </form>
        {isDropdownOpen && (
          <Box
            ref={ref}
            p="0.25rem"
            className="overflow-scroll"
            overflowY="auto"
            boxShadow="md"
            bg="bg.dark"
            mt="0.25rem"
            height="140px"
            borderRadius={2}
            w="100%"
          >
            {children}
            {pagination.page < pagination.totalPages - 1 && (
              <Flex justify="center" my="1rem">
                <Button onClick={() => applySearch(search, true)} colorScheme="gray">
                  More
                </Button>
              </Flex>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DebouncedForm;
