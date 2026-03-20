'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HOME_CONTACT } from '@/content/home';
import { CTAButton } from '@/components/common';

export function SharedContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = 'This field is required';
    if (!formData.lastName.trim())
      newErrors.lastName = 'This field is required';
    if (!formData.email.trim()) {
      newErrors.email = 'This field is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'This field is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitted(true);
  };

  const inputClasses =
    'bg-surface border border-border rounded-sm h-[56px] px-3 typo-body-sm w-full focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-placeholder';

  const renderField = (
    fieldName: 'firstName' | 'lastName' | 'email' | 'message'
  ) => {
    const field = HOME_CONTACT.fields[fieldName];
    const isTextarea = fieldName === 'message';
    const errorMsg = errors[fieldName];

    return (
      <div key={fieldName}>
        <label htmlFor={fieldName} className="typo-nav text-foreground">
          {field.label}
        </label>
        {isTextarea ? (
          <textarea
            id={fieldName}
            name={fieldName}
            placeholder={field.placeholder}
            value={formData[fieldName]}
            onChange={handleChange}
            className={`${inputClasses} h-[160px] resize-none py-3`}
            {...(errorMsg
              ? {
                  'aria-describedby': `${fieldName}-error`,
                  'aria-invalid': true as const,
                }
              : {})}
          />
        ) : (
          <input
            id={fieldName}
            name={fieldName}
            type={fieldName === 'email' ? 'email' : 'text'}
            placeholder={field.placeholder}
            value={formData[fieldName]}
            onChange={handleChange}
            className={inputClasses}
            {...(errorMsg
              ? {
                  'aria-describedby': `${fieldName}-error`,
                  'aria-invalid': true as const,
                }
              : {})}
          />
        )}
        {errorMsg && (
          <p
            id={`${fieldName}-error`}
            className="text-destructive mt-1 text-sm"
          >
            {errorMsg}
          </p>
        )}
      </div>
    );
  };

  return (
    <section>
      <div className="mx-auto max-w-[var(--content-max)] px-4 py-[var(--section-padding)] md:py-[var(--section-padding-lg)]">
        <div className="bg-surface rounded-lg p-6 md:p-[var(--section-padding)]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Left column */}
            <div>
              <p className="typo-overline text-muted-label">
                {HOME_CONTACT.overline}
              </p>
              <h2 className="typo-h2 text-foreground mt-2">
                {HOME_CONTACT.title}
              </h2>
              <p className="typo-body-lg text-foreground mt-4">
                {HOME_CONTACT.subtitle}
              </p>
              <Image
                src="/images/decorative-shape.svg"
                alt=""
                width={150}
                height={74}
                className="mt-8"
              />
            </div>

            {/* Right column */}
            <div>
              {isSubmitted ? (
                <div className="flex h-full items-center justify-center">
                  <p className="typo-h3 text-foreground text-center">
                    {HOME_CONTACT.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {renderField('firstName')}
                    {renderField('lastName')}
                  </div>
                  <div className="mt-4">{renderField('email')}</div>
                  <div className="mt-4">{renderField('message')}</div>
                  <CTAButton
                    variant="submit"
                    size="lg"
                    type="submit"
                    className="mt-4 w-full"
                  >
                    {HOME_CONTACT.submitLabel}
                  </CTAButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
