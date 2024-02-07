type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
  setPage: (param: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange, setPage }: Props) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Max Price</h4>
      <select
        className="p-2 border rounded-md w-full"
        value={selectedPrice}
        onChange={(event) => {
          onChange(event.target.value ? Number(event.target.value) : undefined);
          setPage(1);
        }}
      >
        <option value="">Select Max Price</option>
        {[20, 50, 100, 500, 1000].map((price) => (
          <option value={price}>{price}</option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
