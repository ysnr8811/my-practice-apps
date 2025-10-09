import React from "react";

type ItemButtonProps = {
  item: number;
  onClick: (item: number) => void;
};

export default function ItemButton({ item, onClick }: ItemButtonProps) {
  return (
    <button style={{ width: "100%" }} onClick={() => onClick(item)}>
      {item}
    </button>
  );
}
