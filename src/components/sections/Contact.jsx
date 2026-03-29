import { Section } from '../ui';
import Button from '../ui/Button';
import { personalInfo } from '../../data/portfolio';
import { MailIcon, LocationIcon, ArrowRightIcon } from '../icons';

export default function Contact() {
  return (
    <Section
      id="contact"
      label="08. Contact"
      title="Get In Touch"
      subtitle="I'm currently open to new opportunities. Whether you have a question or just want to say hello, my inbox is always open."
    >
      <div className="mx-auto max-w-lg text-center">
        {/* Contact info - mobile-first sizing */}
        <div className="mb-6 space-y-2.5 sm:mb-8 sm:space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate sm:text-sm">
            <MailIcon className="h-3.5 w-3.5 text-accent dark:text-accent-light sm:h-4 sm:w-4" />
            <a
              href={`mailto:${personalInfo.email}`}
              className="break-all transition-colors hover:text-accent dark:hover:text-accent-light"
            >
              {personalInfo.email}
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate sm:text-sm">
            <LocationIcon className="h-3.5 w-3.5 text-accent dark:text-accent-light sm:h-4 sm:w-4" />
            <span>{personalInfo.location}</span>
          </div>
        </div>

        {/* CTA Button - full width on mobile */}
        <Button
          href={`mailto:${personalInfo.email}`}
          size="lg"
          className="w-full sm:w-auto"
        >
          Say Hello
          <ArrowRightIcon />
        </Button>
      </div>
    </Section>
  );
}
