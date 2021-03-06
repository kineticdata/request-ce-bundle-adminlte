import React from 'react';
import PropTypes from 'prop-types';

const UserHeader = ({imageUrl, title, description}) => {
  return (
    <li className='user-header'>
      <img src={imageUrl} className='img-circle' alt='' />
      <p>
        {title}
        <small>{description}</small>
      </p>
    </li>
  )
}

UserHeader.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default UserHeader
