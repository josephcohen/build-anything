import { useState, useCallback, useEffect } from 'react'
import styles from './Preview.module.css'

const PUBLISH_STEPS = [
  { label: 'Preparing build...', duration: 800 },
  { label: 'Optimizing assets...', duration: 1200 },
  { label: 'Deploying to edge network...', duration: 1500 },
  { label: 'Configuring SSL...', duration: 600 },
  { label: 'Going live!', duration: 400 },
]

function PublishModal({ onClose }) {
  const [step, setStep] = useState('domain') // domain | deploying | live
  const [domain, setDomain] = useState('')
  const [suggestion] = useState(() => {
    const words = ['stellar', 'neon', 'pixel', 'hyper', 'cosmo', 'ultra', 'nova', 'flux', 'arc', 'zen']
    const pick = words[Math.floor(Math.random() * words.length)]
    return `${pick}-app-${Math.floor(Math.random() * 900 + 100)}`
  })
  const [deployStep, setDeployStep] = useState(0)
  const [deployProgress, setDeployProgress] = useState(0)

  const activeDomain = domain.trim() || suggestion
  const fullUrl = `${activeDomain}.buildanything.app`

  const handleDeploy = () => {
    setStep('deploying')
    setDeployStep(0)
    setDeployProgress(0)
  }

  useEffect(() => {
    if (step !== 'deploying') return
    if (deployStep >= PUBLISH_STEPS.length) {
      setStep('live')
      return
    }

    const timer = setTimeout(() => {
      setDeployStep(s => s + 1)
      setDeployProgress(((deployStep + 1) / PUBLISH_STEPS.length) * 100)
    }, PUBLISH_STEPS[deployStep].duration)

    return () => clearTimeout(timer)
  }, [step, deployStep])

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {step === 'domain' && (
          <>
            <div className={styles.modalIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <h2 className={styles.modalTitle}>Publish your app</h2>
            <p className={styles.modalDesc}>Choose a domain name for your app. It'll be live in seconds.</p>

            <div className={styles.domainInput}>
              <input
                type="text"
                value={domain}
                onChange={e => setDomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder={suggestion}
                className={styles.domainField}
              />
              <span className={styles.domainSuffix}>.buildanything.app</span>
            </div>

            <div className={styles.domainPreview}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              https://{fullUrl}
            </div>

            <div className={styles.domainFeatures}>
              <div className={styles.domainFeature}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Free SSL included
              </div>
              <div className={styles.domainFeature}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                Global CDN
              </div>
              <div className={styles.domainFeature}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Custom domain later
              </div>
            </div>

            <button className={styles.publishBtn} onClick={handleDeploy}>
              Publish to {fullUrl}
            </button>
          </>
        )}

        {step === 'deploying' && (
          <>
            <div className={styles.deployingSpinner}>
              <div className={styles.spinnerRing} />
            </div>
            <h2 className={styles.modalTitle}>Publishing...</h2>
            <div className={styles.deploySteps}>
              {PUBLISH_STEPS.map((s, i) => (
                <div key={i} className={`${styles.deployStepRow} ${i < deployStep ? styles.deployStepDone : i === deployStep ? styles.deployStepActive : ''}`}>
                  <div className={styles.deployStepDot}>
                    {i < deployStep ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : null}
                  </div>
                  {s.label}
                </div>
              ))}
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${deployProgress}%` }} />
            </div>
          </>
        )}

        {step === 'live' && (
          <>
            <div className={styles.liveCheck}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 className={styles.modalTitle}>You're live!</h2>
            <p className={styles.modalDesc}>Your app is now published and accessible to anyone.</p>

            <div className={styles.liveUrl}>
              <span>https://{fullUrl}</span>
              <button
                className={styles.copyBtn}
                onClick={() => navigator.clipboard?.writeText(`https://${fullUrl}`)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Copy
              </button>
            </div>

            <div className={styles.liveActions}>
              <button className={styles.publishBtn} onClick={onClose}>Done</button>
              <button className={styles.secondaryBtn} onClick={onClose}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                Share
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function PreviewPanel({ html }) {
  const [fullscreen, setFullscreen] = useState(false)
  const [showPublish, setShowPublish] = useState(false)

  const handleRefresh = useCallback(() => {
    const iframe = document.querySelector(`.${styles.iframe}`)
    if (iframe) {
      iframe.srcdoc = html || ''
    }
  }, [html])

  if (!html) {
    return (
      <div className={styles.panel}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <svg className={styles.toolbarIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <span className={styles.toolbarTitle}>Preview</span>
          </div>
        </div>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <div className={styles.emptyTitle}>Live preview</div>
          <div className={styles.emptyHint}>
            Your app will appear here as you describe it in the chat
          </div>
        </div>
      </div>
    )
  }

  const previewContent = (
    <>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <svg className={styles.toolbarIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          <span className={styles.toolbarTitle}>Preview</span>
        </div>
        <div className={styles.toolbarActions}>
          <button
            className={styles.toolbarBtn}
            onClick={handleRefresh}
            title="Refresh preview"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
          </button>
          <button
            className={styles.toolbarBtn}
            onClick={() => setFullscreen(!fullscreen)}
            title={fullscreen ? 'Exit full screen' : 'Full screen'}
          >
            {fullscreen ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
            )}
          </button>
          <button
            className={styles.publishToolbarBtn}
            onClick={() => setShowPublish(true)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
            </svg>
            Publish
          </button>
        </div>
      </div>
      <div className={styles.frame}>
        <iframe
          className={styles.iframe}
          srcDoc={html}
          title="App preview"
          sandbox="allow-scripts"
        />
      </div>
      {showPublish && <PublishModal onClose={() => setShowPublish(false)} />}
    </>
  )

  if (fullscreen) {
    return (
      <>
        <div className={styles.panel} />
        <div className={styles.fullscreen}>
          {previewContent}
        </div>
      </>
    )
  }

  return (
    <div className={styles.panel}>
      {previewContent}
    </div>
  )
}
