import React, {FC} from 'react';
import {Figure} from "../models/figures/Figure";

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {
  return (
    <div className={'lost'}>
      <h2>{title}</h2>
      {
        figures.map(figure =>
          <div className={'titleAndLogo'} key={figure.id}>
            <p className={'boardTitle'}>{figure.name}</p>{figure.logo && <img width={20} height={20} src={figure.logo}/>}
          </div>
        )
      }
    </div>
  );
};

export default LostFigures;