import React from 'react'
import PropTypes from 'prop-types'

const TopNavMenuLeft = ({children, open}) => {
  return (
    <div className={`${open && 'in'} collapse navbar-collapse pull-left`}>
      <ul className='navbar-nav nav'>
        {children}
      </ul>
    </div>
  )
}

TopNavMenuLeft.propTypes = {
  children: PropTypes.node.isRequired
}

export default TopNavMenuLeft
