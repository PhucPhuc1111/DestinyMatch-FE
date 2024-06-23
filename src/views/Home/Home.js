import React from 'react';
import { Link } from 'react-router-dom';
import Thumbnail from '../../assets/images/thumbnail.png';
import Thumbnail2 from '../../assets/images/thumbnail2.jpg';

const Home = () => {
  const styles = {
    header: {
      minHeight: '100vh',
      paddingTop: '30px',
      background: 'linear-gradient(to right, #FFE5B4, #FFC085)'
    },
    container: {
      width: '1170px',
      maxWidth: 'calc(100% - 48px)',
      margin: '0 auto'
    },
    headerTop: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logo: {
      position: 'relative',
      display: 'inline-flex',
      fontSize: '10px'
    },
    logoCircle: {
      position: 'relative',
      width: '3em',
      height: '3em',
      background: 'rgb(252, 112, 156)',
      borderRadius: '50%',
      marginRight: '0.6em'
    },
    logoCircleInner: {
      position: 'absolute',
      top: '1.1em',
      left: '1.1em',
      width: '1.6em',
      height: '1.6em',
      background: '#fff',
      borderRadius: '50%'
    },
    logoText: {
      textAlign: 'right',
      lineHeight: '1.6em'
    },
    logoBrand: {
      display: 'block',
      fontFamily: 'Sora, sans-serif',
      fontSize: '1.8em',
      fontWeight: 400,
      color: '#2e2e2e'
    },
    logoBrandSmall: {
      fontSize: '1.2em',
      fontWeight: 300,
      color: '#2e2e2e'
    },
    navbarList: {
      display: 'flex',
      listStyle: 'none'
    },
    navbarLink: {
      padding: '4px 21px',
      fontSize: '16px',
      fontWeight: 300,
      color: '#2e2e2e'
    },
    navbarLinkActive: {
      color: '#2e2e2e',
      textShadow: '1px 0 0 currentColor'
    },
    headerAction: {
      display: 'flex',
      alignItems: 'center'
    },
    headerActionLogin: {
      marginRight: '7px',
      color: '#2e2e2e'
    },
    headerActionSignup: {
      minHeight: '44px',
      minWidth: '104px',
      display: 'inline-block',
      padding: '0 20px',
      borderRadius: '99px',
      border: '1px solid rgb(252, 112, 156)',
      fontSize: '16px',
      fontWeight: 400,
      textAlign: 'center',
      lineHeight: '44px',
      color: '#fff',
      background: 'rgb(252, 112, 156)',
      cursor: 'pointer'
    },
    hero: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '76px'
    },
    heroContent: {
      flexShrink: 0,
      width: '44%'
    },
    heroMedia: {
      flexGrow: 1
    },
    heroHeading: {
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '1.14',
      letterSpacing: '-0.02em',
      color: '#2e2e2e'
    },
    heroDesc: {
      marginTop: '22px',
      fontWeight: 300,
      fontSize: '18px',
      lineHeight: '1.67',
      color: '#2e2e2e'
    },
    heroRow: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '38px'
    },
    heroPhone: {
      marginLeft: '25px',
      fontSize: '18px',
      lineHeight: '1.67',
      color: '#2e2e2e'
    },
    heroImages: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    heroImg: {
      width: '330px',
      height: '540px',
      borderRadius: '6px',
      objectFit: 'cover'
    },
    heroImgFirst: {
      position: 'relative',
      marginRight: '-6px'
    },
    heroImgLast: {
      width: '210px',
      height: '410px'
    }
  };
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.headerTop}>
          <Link to="/">
            <div style={styles.logo}>
              <span style={styles.logoCircle}>
                <span style={styles.logoCircleInner}></span>
              </span>
              <span style={styles.logoText}>
                <span style={styles.logoBrand}>destiny</span>
                <span style={{ ...styles.logoBrand, ...styles.logoBrandSmall }}>match</span>
              </span>
            </div>
          </Link>
          <nav>
            <ul style={styles.navbarList}>
              <li>
                <Link to="/" style={{ ...styles.navbarLink, ...styles.navbarLinkActive }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" style={styles.navbarLink}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" style={styles.navbarLink}>
                  About
                </Link>
              </li>
            </ul>
          </nav>
          <div style={styles.headerAction}>
            <Link to="/login" style={styles.headerActionLogin}>
              Log In
            </Link>
            <Link to="/register">
              <button style={styles.headerActionSignup}>Sign Up</button>
            </Link>
          </div>
        </div>
        <section style={styles.hero}>
          <section style={styles.heroContent}>
            <h1 style={styles.heroHeading}>Find Your Perfect Match on Campus.</h1>
            <p style={styles.heroDesc}>Discover meaningful connections with fellow students. Your journey to finding love starts here.</p>
            <div style={styles.heroRow}>
              <Link to="/download" style={styles.headerActionSignup}>
                Download App
              </Link>
              <span style={styles.heroPhone}>or contact destiny@gmail.com</span>
            </div>
          </section>
          <div style={styles.heroMedia}>
            <figure style={styles.heroImages}>
              <img src={Thumbnail} alt="" style={{ ...styles.heroImg, ...styles.heroImgFirst }} />
              <img src={Thumbnail2} alt="" style={{ ...styles.heroImg, ...styles.heroImgLast }} />
            </figure>
          </div>
        </section>
      </div>
    </header>
  );
};

export default Home;
