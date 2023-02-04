import React, {FC} from "react";
import '../styles/piece.scss';
import {useDrag} from "react-dnd";
import bp from '../assets/images/chess_pieces/bp.png';
import bn from '../assets/images/chess_pieces/bn.png';
import bb from '../assets/images/chess_pieces/bb.png';
import br from '../assets/images/chess_pieces/br.png';
import bq from '../assets/images/chess_pieces/bq.png';
import bk from '../assets/images/chess_pieces/bk.png';

import wp from '../assets/images/chess_pieces/wp.png';
import wn from '../assets/images/chess_pieces/wn.png';
import wb from '../assets/images/chess_pieces/wb.png';
import wr from '../assets/images/chess_pieces/wr.png';
import wq from '../assets/images/chess_pieces/wq.png';
import wk from '../assets/images/chess_pieces/wk.png';

const pieces = [[bp, bn, bb, br, bq, bk],
    [wp, wn, wb, wr, wq, wk,]];

export const ChessPiece: FC<{
    player: boolean, piece: number, i: number, j: number,
    handleDragEnd: (e: React.DragEvent) => void,

}> = (props) => {

    return (
        props.piece != -1 ? (
            <div

                id={`${props.i}-${props.j}`}
                className="piece"
                style={{
                    background: `url(${pieces[props.player ? 1 : 0][props.piece]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                draggable={true}
            ></div>) : (<div className="piece"></div>));
}