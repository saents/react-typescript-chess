import React, {FC, useEffect, useState} from 'react';
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
    if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell)
      setSelectedCell(null);
    } else {
      setSelectedCell(cell)
    }
  }

  useEffect( () => {
    highlightAvailableCells()
  }, [selectedCell])

  function highlightAvailableCells() {
    board.highlightAvailableCells(selectedCell)
    updateBoard()
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
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