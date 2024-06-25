import React from 'react';
import { ReactComponent as EyeIcon } from '../../assets/icons/eye.svg';
import { ReactComponent as EyeSlashIcon } from '../../assets/icons/eye-slash.svg';

const SvgIcons = ({ name }) => {
  switch (name) {
    case 'eye':
      return <EyeIcon />;
    case 'eye-slash':
      return <EyeSlashIcon />;

    // Add more cases for each icon
    default:
      return null;
  }
};

export default SvgIcons;