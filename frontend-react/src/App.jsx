import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, RefreshCw } from 'lucide-react'
import { Routes, Route, Link } from 'react-router-dom'
import About from './About'
import './App.css'

const API_URL = 'http://localhost:8000/predict'

const QUALITY_CONFIG = {
  Good:    { emoji: '✅', color: '#1B6B38', bg: '#E6F5EC', bar: '#2D9E5A' },
  Average: { emoji: '⚠️', color: '#875C00', bg: '#FFF8E1', bar: '#E0A020' },
  Bad:     { emoji: '❌', color: '#A12020', bg: '#FDECEA', bar: '#D94040' },
}

/* ───────── NAVBAR ───────── */
const Navbar = () => (
  <nav className="navbar">
    <div className="nav-brand">🍈 Durian AI</div>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
    </div>
  </nav>
)

/* ───────── HOME PAGE (your full app) ───────── */
function Home() {
  const [file, setFile]         = useState(null)
  const [preview, setPreview]   = useState(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [result, setResult]     = useState(null)
  const [error, setError]       = useState(null)

  const handleFile = useCallback((f) => {
    if (!f || !f.type.startsWith('image/')) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setResult(null)
    setError(null)
  }, [])

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  const analyse = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setResult(null)

    const form = new FormData()
    form.append('file', file)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: form
      })

      if (!res.ok) {
        const e = await res.json().catch(() => ({}))
        throw new Error(e.error || `Server error ${res.status}`)
      }

      setResult(await res.json())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    setError(null)
  }

  return (
    <div className="wrapper">

      {/* header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="logo"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        >
          🍈
        </motion.div>

        <h1>Durian <span>AI</span></h1>
        <p>Upload a Musang King shell photo to instantly assess its quality using computer vision.</p>
      </motion.header>

      {/* upload zone */}
      <motion.div
        className={`drop-zone ${dragging ? 'dragging' : ''} ${preview ? 'has-image' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onClick={() => !preview && document.getElementById('file-input').click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <input
          id="file-input"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => handleFile(e.target.files[0])}
        />

        <AnimatePresence mode="wait">
          {!preview ? (
            <motion.div
              key="empty"
              className="drop-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="upload-icon-wrap">
                <Upload size={28} color="var(--text-muted)" />
              </div>
              <p className="drop-label">Drop your image here</p>
              <p className="drop-hint">or click to browse — JPG, PNG, WEBP</p>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              className="preview-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <img src={preview} alt="Selected durian" className="preview-img" />

              <button
                className="change-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  document.getElementById('file-input').click()
                }}
              >
                <RefreshCw size={13} style={{ marginRight: 6 }} />
                Change image
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* analyse button */}
      <AnimatePresence>
        {preview && (
          <motion.button
            className="analyse-btn"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={analyse}
            disabled={loading}
          >
            {loading
              ? <><span className="spinner" /> Analysing…</>
              : 'Analyse quality'
            }
          </motion.button>
        )}
      </AnimatePresence>

      {/* error */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="error-box"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            ⚠️ {error} — make sure the backend is running at localhost:8000
          </motion.div>
        )}
      </AnimatePresence>

      {/* result */}
      <AnimatePresence>
        {result && (
          <motion.div
            className="result-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="result-header"
              style={{ background: QUALITY_CONFIG[result.prediction].bg }}
            >
              <span className="result-emoji">
                {QUALITY_CONFIG[result.prediction].emoji}
              </span>

              <div>
                <div
                  className="result-label"
                  style={{ color: QUALITY_CONFIG[result.prediction].color }}
                >
                  {result.prediction}
                </div>
                <div className="result-conf">
                  {result.confidence}% confidence
                </div>
              </div>
            </div>

            <div className="result-bars">
              {['Good', 'Average', 'Bad'].map((name) => (
                <div key={name} className="bar-row">
                  <span className="bar-name">{name}</span>

                  <div className="bar-track">
                    <motion.div
                      className="bar-fill"
                      style={{ background: QUALITY_CONFIG[name].bar }}
                      initial={{ width: 0 }}
                      animate={{ width: `${result.probabilities[name]}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>

                  <span className="bar-pct">
                    {result.probabilities[name].toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>

            <div className="result-footer">
              <button className="try-btn" onClick={reset}>
                Try another image
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer>
        Built for <strong>UCWS Singapore Hackathon 2026</strong> · Powered by ResNet18 + PyTorch
      </footer>
    </div>
  )
}

/* ───────── APP ROUTER ───────── */
export default function App() {
  return (
    <div className="page">

      {/* NAVBAR */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

    </div>
  )
}