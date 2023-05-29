import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

const CustomLink = React.forwardRef<any, Omit<LinkProps, 'to'>>(
  (props, ref) => <Link ref={ref} to="/" {...props} role={undefined} />,
);

export default CustomLink;
