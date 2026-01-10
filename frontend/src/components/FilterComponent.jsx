import { Loader2, Minus, Plus, X } from "lucide-react";
import React, { useEffect } from "react";
import { motion } from "motion/react";
import { cartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";

function FilterComponent({ modalOpen, setModalOpen, products, filter, setFilter }) {
  const navigate = useNavigate();

  const {
    fetchCartItems,
    cartItems,
    isLoading,
    decrementQuantity,
    incrementQuantity,
    isUpadatingQuantity,
    isUpdatingId,
  } = cartStore();

  const subTotalAmount = cartItems.reduce(
    (acc, elem) => acc + elem.product.price * elem.quantity,
    0
  );

  const filterOptions = {
    type: [],
    colour: [],
    size: [],
  };

  products.forEach((product) => {
    if (!filterOptions.type.includes(product.type)) {
      filterOptions.type.push(product.type);
    }

    if (!filterOptions.colour.includes(product.colour)) {
      filterOptions.colour.push(product.colour);
    }

    product.inventory.forEach((stock) => {
      if (!filterOptions.size.includes(stock.size)) {
        filterOptions.size.push(stock.size);
      }
    });
  });

  const updateFilter = (e, tag, elem) => {
    console.log("hello world")
    // if(filter[tag].includes(elem)){
      
    //   e.target.checked = true
    // }
    if (e.target.checked) {
      setFilter((prev) => {
        console.log(prev)
        console.log(prev.tag)
        console.log(prev[tag])
        return ({ ...prev, [tag]: [...prev[tag], elem] })
      })
    } else {
      setFilter((prev) => ({ ...prev, [tag]: prev[tag].filter((tag) => tag !== elem) }))
    }

  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="fixed inset-0 z-20 flex h-full w-full items-center justify-center bg-black/50">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
          filter: "blur(4px)",
          width: 0,
          height: "100vh",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          width: window.innerWidth < 768 ? "100%" : "50%",
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
          filter: "blur(4px)",
          width: 0,
          height: "100vh",
        }}
        className="absolute right-0 flex h-full min-h-screen w-full flex-col gap-6 bg-white px-4 py-6"
      >
        {/* Filters */}
        <div className="flex flex-col gap-6">
          <div className="w-full flex justify-end" onClick={() => setModalOpen(false)} ><X className="hover:rotate-90 transition-transform duration-300 cursor-pointer" /></div>
          {/* Product Type */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Product Type</h3>
            <div className="flex flex-wrap gap-3">
              {filterOptions.type.map((elem) => (
                <label key={elem} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filter.type.includes(elem)}
                    onChange={(e) => updateFilter(e, "type", elem)}
                    className="checkbox"
                  />
                  <span>{elem}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Product Colour */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Product Colour</h3>
            <div className="flex flex-wrap gap-3">
              {filterOptions.colour.map((elem) => (
                <label key={elem} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filter.colour.includes(elem)}
                    onChange={(e) => updateFilter(e, "colour", elem)} 
                    className="checkbox"
                  />
                  <span>{elem}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Size</h3>
            <div className="flex flex-wrap gap-3">
              {filterOptions.size.map((elem) => (
                <label key={elem} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filter.size.includes(elem)}
                    onChange={(e) => updateFilter(e, "size", elem)}
                    className="checkbox"
                  />
                  <span>{elem}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default FilterComponent;
