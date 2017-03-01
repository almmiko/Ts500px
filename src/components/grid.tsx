import * as React from 'react';

const inlineStyles = {
  space: {
    marginBottom: '30px',
  },
};

interface IRowProps {
  subset: any[];
  selectItem: any;
}

const Row = ({subset = [], selectItem}: IRowProps) => {
  return (
    <div className="col-md-3 row-space col-sm-4 col-xs-6">
      {subset.map((img) => {
        return (
          <div onClick={() => selectItem(img.id)}
               key={img.id}
               className={img.selected ? 'selected-image' : ''}
               style={inlineStyles.space}>
            <img src={img.url} />
          </div>
        );
      })}
    </div>
  );
};


interface IGrigProps {
  topPhotos: any[];
  selectItem: any;
}

export function Grid({topPhotos = [], selectItem}: IGrigProps) {

  let list = [];
  let images = topPhotos;

  for (let i = 0; i < images.length; i += 1) {
    let subset = images.slice(i, i + 1);
    list.push(<Row selectItem={selectItem} key={i} subset={subset} />);
  }

  return (
    <div className="row">
      {list}
    </div>
  );

}
