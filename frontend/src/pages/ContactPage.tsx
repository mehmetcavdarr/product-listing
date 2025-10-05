import React, { useMemo, useState } from 'react'
import '../styles.css'

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

const IG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
  </svg>
)

const IN = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.1c.6-1.1 2.1-2.2 4.3-2.2 4.6 0 5.4 3 5.4 6.8V24h-5V15.9c0-1.9 0-4.4-2.7-4.4s-3.1 2.1-3.1 4.3V24h-5V8z"/>
  </svg>
)

function Modal({
  open, type, title, message, onClose
}: {open: boolean; type: 'success' | 'error'; title: string; message: string; onClose: () => void}) {
  if (!open) return null
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-card">
        <div className={`badge ${type}`}>{type === 'success' ? '✓' : '!'}</div>
        <h3 id="modal-title" className="modal-title">{title}</h3>
        <p className="modal-text">{message}</p>
        <button className="btn primary" onClick={onClose}>OK</button>
      </div>
    </div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name:'', email:'', subject:'', message:'' })
  const [modal, setModal] = useState<{open:boolean; type:'success'|'error'; title:string; message:string}>({
    open:false, type:'success', title:'', message:''
  })

  const disabled = useMemo(() => {
    return !form.name || !form.email || !form.subject || !form.message
  }, [form])

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({...prev, [name]: value}))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    // basit doğrulama
    const missing = Object.entries(form).filter(([,v]) => !String(v).trim()).map(([k]) => k)
    const emailOk = /^\S+@\S+\.\S+$/.test(form.email)

    if (missing.length > 0 || !emailOk) {
      setModal({
        open:true,
        type:'error',
        title:'Form Incomplete',
        message: !emailOk
          ? 'Please enter a valid e-mail address and fill all fields.'
          : 'Please fill all fields before sending.'
      })
      return
    }

    // burada gerçek backend POST çağrısı yapabilirsin
    // await fetch('/api/contact', { method:'POST', body: JSON.stringify(form) })

    setModal({
      open:true,
      type:'success',
      title:'Message Sent',
      message:'Thanks for reaching out. We will get back to you shortly.'
    })
    setForm({ name:'', email:'', subject:'', message:'' })
  }

  return (
    <main className="contact-page">
      <section className="wrapper contact-hero">
        <h1 className="huge">Let’s Connect</h1>
        <p className="intro-text narrow">
          Have a project in mind or need expert marketing solutions? We’re here to help!
          Reach out to us, and let’s start crafting strategies that drive real results.
        </p>

        <div className="contact-social">
          <a className="social-circle" href="https://www.instagram.com/renartglobal" target="_blank" rel="noreferrer" aria-label="Instagram"><IG/></a>
          <a className="social-circle" href="https://www.linkedin.com/company/renartglobal/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><IN/></a>
        </div>

        <form className="contact-card" onSubmit={submit} noValidate>
          <div className="field">
            <input name="name" value={form.name} onChange={onChange} placeholder="Name" />
          </div>
          <div className="field">
            <input name="email" value={form.email} onChange={onChange} placeholder="Email Address" />
          </div>
          <div className="field">
            <input name="subject" value={form.subject} onChange={onChange} placeholder="Subject" />
          </div>
          <div className="field">
            <textarea name="message" value={form.message} onChange={onChange} placeholder="Message" rows={6}/>
          </div>

          <button className="btn block brown" type="submit" disabled={false /* still show modal on empty */}>
            Send Message
          </button>
        </form>
      </section>

      <Modal
        open={modal.open}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={() => setModal(m => ({...m, open:false}))}
      />
    </main>
  )
}
