import React from 'react';
import './Tile.css';

function Tile(props) {
    return (
        <div className='tile' onClick={props.onTileClick}>
            {props.value}
        </div>
    );
}

export default Tile;