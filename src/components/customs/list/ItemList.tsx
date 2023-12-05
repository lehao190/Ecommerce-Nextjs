type Props<Item> = {
  // Array of items(objects)
  items: Item[];
  //Render the list items
  renderItem: (item: Item) => React.ReactNode;
};

const ItemList = <T,>({ items, renderItem }: Props<T>) => {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

export default ItemList;
