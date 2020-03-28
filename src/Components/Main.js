import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <div>
      <Link to='host'>Become the host</Link> -{' '}
      <Link to='remote'>Join Room</Link>
    </div>
  );
}

export default Main;
