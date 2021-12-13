import React from 'react';

export default Header

function Header(props) {
  const name = props.name;
  const title = name ? 'Attendance for ' + name : 'Loading...'

  return (
    <div className='Header'>
      <h1>{title}</h1>
    </div>
  )
}
