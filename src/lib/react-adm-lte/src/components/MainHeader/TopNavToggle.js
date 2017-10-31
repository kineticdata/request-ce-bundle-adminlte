import React from 'react'
import PropTypes from 'prop-types'

import Link from './../../utils/Link'

const TopNavToggle = ({onToggle, srOnly}) => {
  return (
    <Link className='navbar-toggle' onClick={onToggle}>
      <i className='fa fa-bars' />
      <span className='sr-only'>{srOnly}</span>
    </Link>
  )
}

TopNavToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
  srOnly: PropTypes.string
}

export default TopNavToggle
