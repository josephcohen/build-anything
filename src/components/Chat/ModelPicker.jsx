import { useState } from 'react'
import styles from './Chat.module.css'

const MODELS = [
  {
    id: 'sonnet-4.6',
    name: 'Sonnet 4.6',
    desc: 'Fast and capable',
    badge: null,
  },
  {
    id: 'opus-4.6',
    name: 'Opus 4.6',
    desc: 'Most powerful reasoning',
    badge: 'Pro',
  },
]

const PLANS = [
  {
    id: 'pro',
    name: 'Pro',
    price: '$20',
    period: '/month',
    features: [
      'Opus 4.6 access',
      'Unlimited projects',
      'Priority generation',
      'Custom domains',
    ],
    highlighted: true,
  },
  {
    id: 'team',
    name: 'Team',
    price: '$40',
    period: '/month per seat',
    features: [
      'Everything in Pro',
      'Shared workspaces',
      'Team collaboration',
      'Admin controls',
      'SSO & audit logs',
    ],
    highlighted: false,
  },
]

function PaywallModal({ onClose }) {
  return (
    <div className={styles.paywallOverlay} onClick={onClose}>
      <div className={styles.paywall} onClick={e => e.stopPropagation()}>
        <button className={styles.paywallClose} onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className={styles.paywallHeader}>
          <div className={styles.paywallIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <h2 className={styles.paywallTitle}>Upgrade to use Opus 4.6</h2>
          <p className={styles.paywallDesc}>
            Unlock the most powerful AI model for higher quality outputs, better reasoning, and more creative results.
          </p>
        </div>

        <div className={styles.planCards}>
          {PLANS.map(plan => (
            <div
              key={plan.id}
              className={`${styles.planCard} ${plan.highlighted ? styles.planCardHighlighted : ''}`}
            >
              {plan.highlighted && <div className={styles.planBadge}>Most popular</div>}
              <h3 className={styles.planName}>{plan.name}</h3>
              <div className={styles.planPrice}>
                <span className={styles.planAmount}>{plan.price}</span>
                <span className={styles.planPeriod}>{plan.period}</span>
              </div>
              <ul className={styles.planFeatures}>
                {plan.features.map((f, i) => (
                  <li key={i} className={styles.planFeature}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={plan.highlighted ? styles.planBtnPrimary : styles.planBtnSecondary}
                onClick={onClose}
              >
                Get {plan.name}
              </button>
            </div>
          ))}
        </div>

        <p className={styles.paywallFooter}>
          Cancel anytime. 7-day free trial included.
        </p>
      </div>
    </div>
  )
}

export default function ModelPicker() {
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState('sonnet-4.6')
  const [showPaywall, setShowPaywall] = useState(false)

  const currentModel = MODELS.find(m => m.id === model)

  const handleSelect = (m) => {
    if (m.badge) {
      setShowPaywall(true)
    } else {
      setModel(m.id)
    }
    setOpen(false)
  }

  return (
    <>
      <div className={styles.modelPicker}>
        <button className={styles.modelBtn} onClick={() => setOpen(!open)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22l-.75-12.07A4.001 4.001 0 0 1 12 2z"/>
            <circle cx="12" cy="6" r="1"/>
          </svg>
          {currentModel.name}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        {open && (
          <>
            <div className={styles.modelBackdrop} onClick={() => setOpen(false)} />
            <div className={styles.modelMenu}>
              {MODELS.map(m => (
                <button
                  key={m.id}
                  className={`${styles.modelMenuItem} ${model === m.id ? styles.modelMenuItemActive : ''}`}
                  onClick={() => handleSelect(m)}
                >
                  <div className={styles.modelMenuInfo}>
                    <div className={styles.modelMenuName}>
                      {m.name}
                      {m.badge && <span className={styles.modelMenuBadge}>{m.badge}</span>}
                    </div>
                    <div className={styles.modelMenuDesc}>{m.desc}</div>
                  </div>
                  {model === m.id && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}
    </>
  )
}
