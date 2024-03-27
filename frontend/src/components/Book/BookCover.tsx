import { Image } from '@chakra-ui/react';
import { IBook } from '../../interfaces';
import bookImg from '../../assets/book.png';
import { Link as RouterLink } from 'react-router-dom';

interface IBookCoverProps {
  book: IBook;
}

const BookCover = ({ book }: IBookCoverProps) => {
  const { imageUrl } = book;
  return (
    <RouterLink to={`/admin/dashboard/books/${book.id}`}>
      <Image src={imageUrl !== null && imageUrl.length ? imageUrl : bookImg} alt="a book cover" />
    </RouterLink>
  );
};

export default BookCover;
