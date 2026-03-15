import { useEffect, useState } from "react";

export default function List() {

  const [data, setData] = useState([]);

  const containerHeight = 400;
  const rowHeight = 50;
  const visibleCount = Math.ceil(containerHeight / rowHeight) + 3; // buffer

  const [indices, setIndices] = useState([0, visibleCount]);

  useEffect(() => {

    fetch("https://backend.jotish.in/backend_dev/gettabledata.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "test",
        password: "123456"
      })
    })
      .then(res => res.json())
      .then(res => {
        setData(res.data || []);
      });

  }, []);

  const handleScroll = (e) => {

    const scrollTop = e.target.scrollTop;

    const startIndex = Math.floor(scrollTop / rowHeight);
    const endIndex = startIndex + visibleCount;

    setIndices([startIndex, endIndex]);
  };

  const visibleRows = data.slice(indices[0], indices[1]);

  return (

    <div className="p-10">

      <h1 className="text-2xl mb-6">Employee List</h1>

      <div
        className="border"
        style={{
          height: containerHeight,
          overflowY: "auto",
          position: "relative"
        }}
        onScroll={handleScroll}
      >

        <div
          style={{
            height: data.length * rowHeight,
            position: "relative"
          }}
        >

          {visibleRows.map((item, index) => {

            const actualIndex = indices[0] + index;

            return (
              <div
                key={item.id || actualIndex}
                className="flex border-b bg-white"
                style={{
                  position: "absolute",
                  top: actualIndex * rowHeight,
                  height: rowHeight,
                  width: "100%"
                }}
              >

                <div className="w-1/4 p-2">{item.id}</div>
                <div className="w-1/4 p-2">{item.name}</div>
                <div className="w-1/4 p-2">{item.city}</div>
                <div className="w-1/4 p-2">{item.salary}</div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}
