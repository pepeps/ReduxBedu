import React from 'react';

const NotFound = props => {
  console.log(props);
  return (
    <div>
      <div>ERROR</div>
      <div>{props.message}</div>
    </div>
  );
};

export default NotFound;
