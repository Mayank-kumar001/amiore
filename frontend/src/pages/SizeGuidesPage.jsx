export default function SizeGuidesPage() {
  const sizeGuides = [
    {
      category: "T-Shirts & Shirts",
      measurements: [
        { size: "S", chest: "36-38", waist: "30-32", length: "28" },
        { size: "M", chest: "38-40", waist: "32-34", length: "29" },
        { size: "L", chest: "40-42", waist: "34-36", length: "30" },
        { size: "XL", chest: "42-44", waist: "36-38", length: "31" },
        { size: "XXL", chest: "44-46", waist: "38-40", length: "32" }
      ]
    },
    {
      category: "Pants & Jeans",
      measurements: [
        { size: "30", waist: "30", inseam: "32", rise: "10" },
        { size: "32", waist: "32", inseam: "32", rise: "10" },
        { size: "34", waist: "34", inseam: "32", rise: "10.5" },
        { size: "36", waist: "36", inseam: "34", rise: "10.5" },
        { size: "38", waist: "38", inseam: "34", rise: "11" }
      ]
    },
    {
      category: "Jackets & Coats",
      measurements: [
        { size: "S", chest: "36-38", shoulder: "17.5", sleeve: "24.5", length: "29" },
        { size: "M", chest: "38-40", shoulder: "18", sleeve: "25", length: "30" },
        { size: "L", chest: "40-42", shoulder: "18.5", sleeve: "25.5", length: "31" },
        { size: "XL", chest: "42-44", shoulder: "19", sleeve: "26", length: "32" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">Size Guides</h1>
        <p className="text-center text-gray-600 mb-12">Find your perfect fit with our comprehensive size charts</p>
        
        <div className="space-y-12">
          {sizeGuides.map((guide, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">{guide.category}</h2>
              <div className="overflow-x-auto">
                <table className="table w-full bg-white">
                  <thead>
                    <tr>
                      {Object.keys(guide.measurements[0]).map((key) => (
                        <th key={key} className="capitalize font-semibold text-gray-900">
                          {key === "size" ? "Size" : key.charAt(0).toUpperCase() + key.slice(1) + " (inches)"}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {guide.measurements.map((measurement, idx) => (
                      <tr key={idx}>
                        {Object.values(measurement).map((value, valIdx) => (
                          <td key={valIdx} className="text-center">{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">How to Measure</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="font-semibold mr-2">Chest:</span>
                <span>Measure around the fullest part of your chest, under your arms</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Waist:</span>
                <span>Measure around your natural waistline, where you normally wear your pants</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Inseam:</span>
                <span>Measure from the crotch to the bottom of the leg</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Sleeve:</span>
                <span>Measure from the shoulder to the wrist</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Still unsure about your size? Our customer service team is here to help you find the perfect fit.
            </p>
            <button className="btn btn-outline">Contact Us</button>
          </div>
        </div>
      </div>
    </div>
  );
}
