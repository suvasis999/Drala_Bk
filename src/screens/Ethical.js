// import { ArrowForward, ArrowBack } from '@material-ui/icons'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import Footer from '../components/footer';
import NavbarComp from '../components/navbar';
import '../css/RiseofMedical.css';
import { Document,Page,pdfjs } from 'react-pdf'
import ethicalCodeOfConduct from '../assets/pdfs/Ethical Code of Conduct.pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Constitution() {
  return (
    <div id="Top">
      <NavbarComp />
      <div className='container flex items-center justify-center' style={{ padding: 15 }}>
      <Document size='B0' file={ethicalCodeOfConduct} onLoadError={(error)=>{console.log(error)}}>
          <Page size='B0' pageNumber={17} />
      </Document>

      </div>
      <Footer />
    </div>
  );
}
