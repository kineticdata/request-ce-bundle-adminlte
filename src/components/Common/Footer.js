import React from 'react'
import { MainFooter } from '../../lib/react-adm-lte/src'

export const Footer = () =>
  <MainFooter>
    <ul className="list-inline pull-left">
      <li><a className="footer-link" target="kinops" href="https://kinops.io">Home</a></li>
      <li><a className="footer-link" target="kinops" href="https://kinops.io/kinops/privacy">Privacy</a></li>
      <li><a className="footer-link" target="kinops" href="https://kinops.io/kinops/terms">Terms</a></li>
    </ul>
    <span className="pull-right">
      <strong>©2017 Kinetic Data</strong>. All Rights Reserved.
    </span>
  </MainFooter>;
