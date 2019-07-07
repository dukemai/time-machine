import React from 'react';
import App, { Container } from 'next/app';
import withGA from "next-ga";
import Router from "next/router";

class TimeApp extends App {

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default withGA('UA-138142244-1', Router)(TimeApp);