import { motion } from 'framer-motion'
import './App.css'

export default function About() {
  return (
    <div className="page">

      {/* background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <div className="wrapper">

        {/* title */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="logo">ℹ️</div>
          <h1>About <span>Durian AI</span></h1>
          <p>Understanding the vision behind the project</p>
        </motion.header>

        {/* content card */}
        <motion.div
          className="result-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ padding: '28px 32px' }}
        >

          <h2 style={{ marginBottom: '12px', color: 'var(--green-deep)' }}>
            Our Vision
          </h2>

          <p style={{ lineHeight: 1.7, color: 'var(--text-dark)' }}>
            Assessing Musang King quality traditionally relies on manual inspection and experience.
            Quality grading can be subjective and inconsistent, especially when performed at scale.
          </p>

          <br />

          <p style={{ lineHeight: 1.7, color: 'var(--text-dark)' }}>
            Durian AI explores whether computer vision can assist in automating this process using shell images.
          </p>

          <br />

          <p style={{ lineHeight: 1.7, color: 'var(--text-dark)' }}>
            In the future, we hope to expand this system beyond durians to other fruits,
            enabling scalable AI-based fruit quality assessment for agriculture and food supply chains.
          </p>

          <hr style={{ margin: '24px 0', border: '1px solid var(--cream-dark)' }} />

          <h3 style={{ color: 'var(--green-deep)', marginBottom: '10px' }}>
            Contact
          </h3>

          <p style={{ color: 'var(--text-dark)' }}>
            📧 Jeremy Ng: Jeremyng313@gmail.com
            📧 Alicia Ong: Aliciaong567@gmail.com
          </p>

        </motion.div>

      </div>
    </div>
  )
}