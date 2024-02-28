import { Box, Flex, Text, Button, Heading, Divider, Tooltip } from '@chakra-ui/react';
import DebouncedForm from './DebouncedForm';
import { Client } from '../../../util/client';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../context/user';
import { IUserContext, IGroupStudySet, ISearchStudySet } from '../../../interfaces';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheck, AiOutlinePlus, AiOutlineMinusCircle } from 'react-icons/ai';

export interface IGroupStudyStudySetsProps {
  groupId: number;
  adminId: number;
}

const GroupStudySets = ({ groupId, adminId }: IGroupStudyStudySetsProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const navigate = useNavigate();
  const shouldRun = useRef(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchStudySets, setSearchStudySets] = useState<ISearchStudySet[]>([]);
  const [groupStudySets, setGroupStudySets] = useState<IGroupStudySet[]>([]);
  const [search, setSearch] = useState('');
  const [searchPagination, setSearchPagination] = useState({
    page: 0,
    pageSize: 3,
    totalPages: 0,
    direction: 'next',
    totalElements: 0,
  });
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 3,
    totalPages: 0,
    direction: 'next',
    totalElements: 0,
  });

  const getGroupStudySets = (paginate: boolean) => {
    const pageNum = paginate ? pagination.page : -1;
    Client.getGroupStudySets(groupId, pageNum, pagination.pageSize, pagination.direction)
      .then((res) => {
        const { direction, items, page, pageSize, totalElements, totalPages } = res.data.data;
        setPagination((prevState) => ({
          ...prevState,
          page,
          pageSize,
          direction,
          totalPages,
          totalElements,
        }));
        setGroupStudySets((prevState) => [...prevState, ...items]);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getGroupStudySets(false);
    }
  }, [shouldRun.current]);

  const getData = (pageNum: number, paginate: boolean, query: string) => {
    setSearch(query);
    Client.searchStudySets(query, groupId, pageNum, searchPagination.pageSize, searchPagination.direction)
      .then((res) => {
        const { direction, items, page, pageSize, totalElements, totalPages } = res.data.data;
        setSearchPagination((prevState) => ({
          ...prevState,
          page,
          pageSize,
          direction,
          totalPages,
          totalElements,
        }));

        setIsDropdownOpen(items.length > 0);
        if (paginate) {
          setSearchStudySets((prevState) => [...prevState, ...items]);
        } else {
          setSearchStudySets(items);
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const clearCollection = () => setSearchStudySets([]);

  const addGroupStudySet = (studySetId: number, isAddedToGroup: boolean, groupId: number) => {
    setError('');

    if (isAddedToGroup) {
      return;
    }
    Client.addGroupStudySet(studySetId, groupId)
      .then(() => {
        setGroupStudySets([]);
        setPagination({ page: 0, pageSize: 3, totalPages: 0, direction: 'next', totalElements: 0 });
        setIsDropdownOpen(false);
        getGroupStudySets(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const goToStudySet = (studySetId: number, title: string) => {
    navigate(`/studysets/${studySetId}`, { state: { title } });
  };

  const removeGroupStudySet = (e: React.MouseEvent<HTMLDivElement>, groupStudySetId: number) => {
    e.stopPropagation();
    Client.removeGroupStudySet(groupStudySetId)
      .then(() => {
        setGroupStudySets([]);
        setPagination({ page: 0, pageSize: 3, totalPages: 0, direction: 'next', totalElements: 0 });
        setIsDropdownOpen(false);
        getGroupStudySets(false);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  return (
    <Box p="0.5rem" my="1rem">
      <DebouncedForm
        isDropdownOpen={isDropdownOpen}
        handleSetIsDropdownOpen={setIsDropdownOpen}
        getData={getData}
        handleSetPagination={setSearchPagination}
        pagination={searchPagination}
        placeholder="Add study set to group..."
        heading="Add group study sets"
        clearCollection={clearCollection}
        handleSetError={setError}
        error={error}
      >
        {searchStudySets.map((searchStudySet) => {
          return (
            <Flex
              _hover={{ bg: 'gray.700' }}
              my="0.75rem"
              p="0.5rem"
              key={searchStudySet.id}
              justify="space-between"
              align="center"
            >
              <Box color="#fff">
                {searchStudySet.title.split('').map((char, index) => {
                  return (
                    <Box
                      key={index}
                      color={search.toLowerCase().includes(char.toLowerCase()) ? 'primary.dark' : '#fff'}
                      as="span"
                    >
                      {char}
                    </Box>
                  );
                })}

                <Text>{searchStudySet.course}</Text>
              </Box>
              <Box>
                <Button
                  onClick={() => addGroupStudySet(searchStudySet.id, searchStudySet.isAddedToGroup, groupId)}
                  colorScheme="purple"
                  variant="outline"
                >
                  {searchStudySet.isAddedToGroup ? (
                    <Flex align="center">
                      <Box mr="0.25rem">
                        <AiOutlineCheck />
                      </Box>
                      <Text>Added</Text>
                    </Flex>
                  ) : (
                    <Flex align="center">
                      <Box mr="0.25rem">
                        <AiOutlinePlus />
                      </Box>
                      <Text>Add</Text>
                    </Flex>
                  )}
                </Button>
              </Box>
            </Flex>
          );
        })}
      </DebouncedForm>
      <Flex
        onClick={() => setIsDrawerOpen((prevState) => !prevState)}
        cursor="pointer"
        transition="0.2s ease-in-out"
        p="0.5rem"
        _hover={{ bg: 'gray.700' }}
        my="1rem"
        justify="space-between"
        align="center"
      >
        <Heading color="#fff" fontSize="1.4rem" as="h4">
          Group study sets
        </Heading>
        <Box color="#fff" fontSize="1.4rem">
          {isDrawerOpen ? <FaChevronUp /> : <FaChevronDown />}
        </Box>
      </Flex>
      {isDrawerOpen && (
        <Box
          borderRadius={2}
          p="0.25rem"
          className="slide-down overflow-scroll"
          bg="bg.dark"
          overflowY="auto"
          height="120px"
        >
          {groupStudySets.map((groupStudySet) => {
            return (
              <Box
                cursor="pointer"
                onClick={() => goToStudySet(groupStudySet.studySetId, groupStudySet.studySetTitle)}
                key={groupStudySet.id}
              >
                <Flex my="0.75rem" align="center" justify="space-between">
                  <Box ml="0.5rem">
                    <Text color="#fff">{groupStudySet.title}</Text>
                    <Text color="gray.400">{groupStudySet.course}</Text>
                  </Box>
                  {user.id === adminId && (
                    <Tooltip label="Remove">
                      <Box color="#fff" fontSize="2rem" onClick={(e) => removeGroupStudySet(e, groupStudySet.id)}>
                        <AiOutlineMinusCircle />
                      </Box>
                    </Tooltip>
                  )}
                </Flex>
                <Divider borderColor="gray.700" />
              </Box>
            );
          })}
          {pagination.page < pagination.totalPages - 1 && (
            <Flex my="0.5rem">
              <Button onClick={() => getGroupStudySets(true)} colorScheme="purple">
                More
              </Button>
            </Flex>
          )}
        </Box>
      )}
    </Box>
  );
};

export default GroupStudySets;
