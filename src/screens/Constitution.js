// import { ArrowBack, ArrowForward } from '@material-ui/icons'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React, { useState } from 'react';
import { Carousel, Container, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ConstitutionImg from '../assets/Constitution.png';
import Footer from '../components/footer';
import NavbarComp from '../components/navbar';
import { Document,Page,pdfjs } from 'react-pdf'
import spiritOfThruthConstitution from '../assets/pdfs/Spirit of Truth Constitution.pdf';
import '../css/RiseofMedical.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Constitution() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="Top">

      <NavbarComp />
      <div className='container flex items-center justify-center' style={{ padding: 15 }}>
        <Document size='B0' file={spiritOfThruthConstitution} onLoadError={(error)=>{console.log(error)}}>
            <Page size='B0' pageNumber={16} />
        </Document>
      </div>
      <Footer />
    </div>
  );
}
