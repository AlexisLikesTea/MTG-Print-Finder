interface SortingButtonsProps {
  sortingByDate: (direction: string) => void;
}

function SortingButtons({ sortingByDate }: SortingButtonsProps) {
  return (
    <>
      <button onClick={() => sortingByDate("asc")}>Sort by Oldest</button>
      <button onClick={() => sortingByDate("desc")}>Sort by Newest</button>
    </>
  );
}

export default SortingButtons;
