import React from 'react';

export default Header

function Header(props) {
  const name = props.name;

  return (
    <div className='Header'>
      <h1>Attendance for {name}</h1>
    </div>
  )
}
