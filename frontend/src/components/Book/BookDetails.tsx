import axios, { AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { IBook } from '../../interfaces';
import { bookState } from '../../data';
import { Client } from '../../util/client';
import { retreiveTokens } from '../../util';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { InView, useInView } from 'react-intersection-observer';
import { Box } from '@chakra-ui/react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const BookDetails = () => {
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
        setBook(res.data.data);
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

  return (
    <Document file={blobUrl} onLoadSuccess={onDocumentLoadSuccess}>
      {[...Array(numPages)].map((_, index) => (
        <InView
          key={`page_${index + 1}`}
          onChange={(inView, entry) => {
            if (inView) {
              setCurrentPage(index + 1);
            }
            console.log(entry);
            console.log(`Page ${index + 1} is in view:`, inView);
          }}
        >
          {({ ref }) => (
            <Box ref={ref}>
              <Page key={`page_${index + 1}`} pageNumber={index + 1} width={600} />
            </Box>
          )}
        </InView>
      ))}
    </Document>
  );
};

export default BookDetails;
