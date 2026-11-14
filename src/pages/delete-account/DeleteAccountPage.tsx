import React, { useState } from 'react';
import { Check, Trash2, Info, Clock, Mail, SlidersHorizontal } from 'lucide-react';
import { PageLayout } from '../../components/PageLayout';
import { BulletList, ContentCard } from '../../components/legal/LegalBlocks';
import { Button } from '../../components/ui/Button';
import { useI18n } from '../../i18n';
import { GOOGLE_SCRIPT_URL, SUPPORT_EMAIL } from '../../config/contact';

type RequestType = 'full' | 'partial';

const inputClass =
  'w-full px-5 py-3.5 rounded-full border border-gray-200 bg-gray-50 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all text-start';
const labelClass = 'block text-sm font-semibold text-brand-navy mb-2 text-start';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function DeleteAccountPage() {
  const { t, locale } = useI18n();
  const doc = t.legal.deleteAccount;

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    requestType: 'full' as RequestType,
    details: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState('');

  const isPartial = form.requestType === 'partial';
  const mailtoHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Account deletion request - Smart Bonus')}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const fullName = form.fullName.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const details = form.details.trim();

    if (!fullName || !phone || !EMAIL_PATTERN.test(email) || (isPartial && !details)) {
      setValidationError(t.deleteAccount.invalidMsg);
      return;
    }

    setStatus('submitting');
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'delete_request',
          fullName,
          phone,
          email,
          requestType: form.requestType,
          details,
          locale,
          page: 'delete-account',
          submittedAt: new Date().toISOString(),
        }),
      });
      setStatus('success');
    } catch (err) {
      console.error('Account deletion request error:', err);
      setStatus('error');
    }
  };

  const requestOptions: { value: RequestType; label: string }[] = [
    { value: 'full', label: t.deleteAccount.requestTypes.full },
    { value: 'partial', label: t.deleteAccount.requestTypes.partial },
  ];

  return (
    <PageLayout
      title={t.deleteAccount.title}
      subtitle={doc.intro}
      meta={<span className="font-semibold text-white/90">{t.deleteAccount.developer}</span>}
    >
      {/* Steps */}
      <ContentCard title={t.deleteAccount.stepsTitle}>
        <ol className="space-y-4">
          {doc.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="w-9 h-9 shrink-0 rounded-full bg-brand-navy text-brand-yellow font-bold flex items-center justify-center border-2 border-brand-yellow">
                {i + 1}
              </span>
              <span className="pt-1.5">{step}</span>
            </li>
          ))}
        </ol>
      </ContentCard>

      <div className="grid md:grid-cols-2 gap-6">
        <ContentCard title={t.deleteAccount.deletedTitle}>
          <BulletList items={doc.deleted} />
        </ContentCard>
        <ContentCard title={t.deleteAccount.keptTitle}>
          <ul className="space-y-3">
            {doc.kept.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Info className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </ContentCard>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ContentCard title={t.deleteAccount.timingTitle}>
          <p className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" aria-hidden />
            <span>{doc.timing}</span>
          </p>
        </ContentCard>
        <ContentCard title={t.deleteAccount.partialTitle}>
          <p className="flex items-start gap-3">
            <SlidersHorizontal className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" aria-hidden />
            <span>{doc.partial}</span>
          </p>
        </ContentCard>
      </div>

      {/* Request form */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10 text-start">
        {status === 'success' ? (
          <div className="py-10 text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
              <Check className="w-8 h-8 text-green-600" aria-hidden />
            </div>
            <h2 className="text-2xl font-bold text-brand-navy mb-2">{t.deleteAccount.successTitle}</h2>
            <p className="text-brand-gray max-w-md mx-auto">{t.deleteAccount.successBody}</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-brand-navy mb-2 flex items-center gap-3">
                <Trash2 className="w-6 h-6 text-brand-yellow" aria-hidden />
                {t.deleteAccount.formTitle}
              </h2>
              <p className="text-brand-gray">{t.deleteAccount.formSubtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="del-name" className={labelClass}>{t.deleteAccount.fields.fullName}</label>
                  <input
                    id="del-name"
                    required
                    type="text"
                    autoComplete="name"
                    className={inputClass}
                    value={form.fullName}
                    onChange={e => setForm({ ...form, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="del-phone" className={labelClass}>{t.deleteAccount.fields.phone}</label>
                  <input
                    id="del-phone"
                    required
                    type="tel"
                    autoComplete="tel"
                    dir="ltr"
                    className={inputClass}
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="del-email" className={labelClass}>{t.deleteAccount.fields.email}</label>
                <input
                  id="del-email"
                  required
                  type="email"
                  autoComplete="email"
                  dir="ltr"
                  className={inputClass}
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <fieldset>
                <legend className={labelClass}>{t.deleteAccount.requestTypeLabel}</legend>
                <div className="grid md:grid-cols-2 gap-3">
                  {requestOptions.map(opt => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 rounded-2xl border px-5 py-4 cursor-pointer transition-colors ${
                        form.requestType === opt.value
                          ? 'border-brand-yellow bg-amber-50 text-brand-navy'
                          : 'border-gray-200 bg-gray-50 text-brand-gray hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="requestType"
                        value={opt.value}
                        checked={form.requestType === opt.value}
                        onChange={() => setForm({ ...form, requestType: opt.value })}
                        className="accent-amber-600 w-4 h-4"
                      />
                      <span className="font-semibold">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="del-details" className={labelClass}>{t.deleteAccount.fields.details}</label>
                <textarea
                  id="del-details"
                  required={isPartial}
                  rows={4}
                  className={`${inputClass} rounded-2xl resize-y`}
                  value={form.details}
                  onChange={e => setForm({ ...form, details: e.target.value })}
                />
                <p className="text-xs text-brand-gray mt-2">{t.deleteAccount.detailsHint}</p>
              </div>

              {validationError && (
                <p role="alert" className="text-red-600 text-sm">{validationError}</p>
              )}
              {status === 'error' && (
                <p role="alert" className="text-red-600 text-sm">{t.deleteAccount.errorMsg}</p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={status === 'submitting'}
                className={`w-full sm:w-auto px-10 shadow-md ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {status === 'submitting' ? t.deleteAccount.submitting : t.deleteAccount.submit}
              </Button>
            </form>

            <p className="mt-8 text-sm text-brand-gray flex flex-wrap items-center gap-2">
              <Mail className="w-4 h-4 text-brand-yellow" aria-hidden />
              <span>{t.deleteAccount.orEmail}</span>
              <a href={mailtoHref} className="font-semibold text-brand-navy hover:text-brand-yellow break-all" dir="ltr">
                {SUPPORT_EMAIL}
              </a>
            </p>
          </>
        )}
      </section>
    </PageLayout>
  );
}
