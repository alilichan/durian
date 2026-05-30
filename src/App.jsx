import { useState } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const analyzeImage = () => {
    setResult({
      variety: "Musang King",
      ripeness: "85%",
      sweetness: "8.4/10",
      bitterness: "6.7/10",
      creaminess: "9.1/10",
      freshness: "89%",
      taste: "Rich and creamy with balanced sweetness."
    });
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🍈 Durian AI</h1>
      <p>Know your durian before you buy.</p>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImage(URL.createObjectURL(e.target.files[0]))
        }
      />

      {image && (
        <>
          <br />
          <br />

          <img
            src={image}
            alt="preview"
            style={{
              width: "300px",
              borderRadius: "12px"
            }}
          />

          <br />
          <br />

          <button onClick={analyzeImage}>
            Analyze Durian
          </button>
        </>
      )}

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>Results</h2>
          <p>Variety: {result.variety}</p>
          <p>Ripeness: {result.ripeness}</p>
          <p>Sweetness: {result.sweetness}</p>
          <p>Bitterness: {result.bitterness}</p>
          <p>Creaminess: {result.creaminess}</p>
          <p>Freshness: {result.freshness}</p>
          <p>{result.taste}</p>
        </div>
      )}
    </div>
  );
}

export default App;