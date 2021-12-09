import React from 'react';

export default Header

function Header(props) {
  return (
    <div className='Header'>
      <h1>Attendance for {props.name}</h1>
    </div>
  )
}
