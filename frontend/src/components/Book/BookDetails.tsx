import axios, { AxiosResponse } from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { IBook, IUserContext } from '../../interfaces';
import { bookState } from '../../data';
import { Client } from '../../util/client';
import { retreiveTokens } from '../../util';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { InView } from 'react-intersection-observer';
import { Box } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { UserContext } from '../../context/user';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const BookDetails = () => {
  const { user } = useContext(UserContext) as IUserContext;
  const shouldRun = useRef(true);
  const shouldRunProxy = useRef(true);
  const { id } = useParams();
  const [book, setBook] = useState<IBook>(bookState);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const getBook = (id: number) => {
    Client.getBook(id)
      .then((res) => {
        console.log(res);
        if (res.data.data.bookProgress !== null) {
          setCurrentPage(res.data.data.bookProgress.currentPage);
        }
        setBook(res.data.data.book);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const proxyBookPdf = async (bookId: number) => {
    try {
      const response: AxiosResponse<Blob> = await axios.get(`http://localhost:5173/api/v1/books/${bookId}/proxy-pdf`, {
        responseType: 'arraybuffer',
        headers: { Authorization: `Bearer ${retreiveTokens().token}` },
      });

      if (response.status !== 200) {
        throw new Error(`Failed to fetch PDF: ${response.status}`);
      }

      if (response.request.responseType !== 'arraybuffer') {
        throw new Error('Unexpected response type');
      }

      const blob = new Blob([response.data], { type: 'application/pdf' });

      const url = URL.createObjectURL(blob);

      setBlobUrl(url);
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  useEffect(() => {
    if (shouldRunProxy.current && book.id !== 0) {
      shouldRunProxy.current = false;
      proxyBookPdf(book.id);
    }

    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl, book.id]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log(numPages);
    setNumPages(numPages);
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      getBook(Number.parseInt(id as string));
    }
  }, [shouldRun.current]);

  const handleSetCurrentPage = (newCurrentPage: number) => {
    if (newCurrentPage > currentPage) {
      console.log('-------------------');
      console.log('Saving book progress........');
      console.log('-------------------');
      saveBookProgress(newCurrentPage);
    }
    setCurrentPage(newCurrentPage);
  };

  const saveBookProgress = (newCurrentPage: number) => {
    const notes = '';
    Client.saveBookProgress(user.id, book.id, numPages as number, newCurrentPage, notes)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const delayedSetCurrentPage = debounce((newCurentPage: number) => {
    handleSetCurrentPage(newCurentPage);
  }, 1000);

  return (
    <Box height="600px" overflowY="auto" width={['100%', '100%', '700px']} mx="auto">
      <Document file={blobUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {[...Array(numPages)].map((_, index) => (
          <InView
            key={`page_${index + 1}`}
            onChange={(inView) => {
              if (inView) {
                delayedSetCurrentPage(index + 1);
              }
            }}
          >
            {({ ref }) => (
              <Box ref={ref}>
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  inputRef={(pageRef) => {
                    if (pageRef && currentPage === index + 1) {
                      pageRef.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                  }}
                  width={600}
                />
              </Box>
            )}
          </InView>
        ))}
      </Document>
    </Box>
  );
};

export default BookDetails;
