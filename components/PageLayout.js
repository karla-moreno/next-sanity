import { Container } from "react-bootstrap";
import Head from 'next/head';
import BlogNavbar from './Navbar';
import TheFooter from './Footer';


export default function PageLayout({children, className}) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,500;0,700;1,300&display=swap" rel="stylesheet"></link>
      </Head>
      <Container>
        <BlogNavbar />
        <div className={`page-wrapper ${className}`}>
          {children}
        </div>
        <TheFooter />
      </Container>
    </>
  )
}