import React, {FC, useState} from 'react';
import CellComponent from "./CellComponent";
import {Board} from "../models/Board";
import {Cell} from "../models/Cell";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function clickOnCell(cell: Cell) {
    if(cell.figure) {
      setSelectedCell(cell)
    }
  }

  return (
    <div className='board'>
      {
        board.cells.map((row, index) => {
            return <React.Fragment key={index}>
              {row.map(cell => {
                return <CellComponent
                  click={clickOnCell}
                  cell={cell}
                  selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                  key={cell.id}
                />
              })}
            </React.Fragment>
          }
        )
      }
    </div>
  );
};

export default BoardComponent;