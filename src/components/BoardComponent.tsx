import React, {FC, useEffect, useState} from 'react';
import CellComponent from "./CellComponent";
import {Board} from "../models/Board";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function clickOnCell(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell)
      swapPlayer()
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell)
      }
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
      <div>
        <div>
          <h2 className={'currentPlayer'}>Текущий игрок {currentPlayer?.color}</h2>
        </div>
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
      </div>
  );
};

export default BoardComponent;