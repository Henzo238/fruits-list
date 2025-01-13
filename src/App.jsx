import { Checkbox } from "./assets/components/forms/Checkbox";
import { Input } from "./assets/components/forms/Input";
import { ProductCategoryRow } from "./assets/components/forms/products/ProductCategoryRow";
import { ProductRow } from "./assets/components/forms/products/ProductRow";
import { useState } from "react";

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

function App() {
  const [showStockOnly, setShowStockOnly] = useState(false);
  const [search, setSearch] = useState("");

  const visibleProducts = PRODUCTS.filter((product) => {
    if (showStockOnly && !product.stocked) {
      return false;
    }
    if (search && !product.name.includes(search)) {
      return false;
    }

    return true;
  });

  return (
    <div className="container my-3">
      <SearchBar
        search={search}
        onSearchChange={setSearch}
        showStockOnly={showStockOnly}
        onStockOnlyChange={setShowStockOnly}
      />
      <ProductTable products={visibleProducts} />
    </div>
  );
}

function SearchBar({
  showStockOnly,
  onStockOnlyChange,
  search,
  onSearchChange,
}) {
  return (
    <div>
      <div className="mb-3">
        <Input
          value={search}
          onChange={onSearchChange}
          placeholder="Rechercher"
        />
        <Checkbox
          id="stocked"
          checked={showStockOnly}
          onChange={onStockOnlyChange}
          label="N'afficher que les produits en stock"
        />
      </div>
    </div>
  );
}

function ProductTable({ products }) {
  const rows = [];

  let lastCategory = null;

  for (const product of products) {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow key={product.category} name={product.category} />
      );
    }
    lastCategory = product.category;
    rows.push(<ProductRow key={product.name} product={product} />);
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prix</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default App;
