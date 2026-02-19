import { Section } from '../ui';
import Button from '../ui/Button';
import { personalInfo } from '../../data/portfolio';
import { MailIcon, LocationIcon, ArrowRightIcon } from '../icons';

export default function Contact() {
  return (
    <Section
      id="contact"
      label="06. Contact"
      title="Get In Touch"
      subtitle="I'm currently open to new opportunities. Whether you have a question or just want to say hello, my inbox is always open."
    >
      <div className="mx-auto max-w-lg text-center">
        <div className="mb-8 space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate">
            <MailIcon className="h-4 w-4 text-accent dark:text-accent-light" />
            <a
              href={`mailto:${personalInfo.email}`}
              className="transition-colors hover:text-accent dark:hover:text-accent-light"
            >
              {personalInfo.email}
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate">
            <LocationIcon className="h-4 w-4 text-accent dark:text-accent-light" />
            <span>{personalInfo.location}</span>
          </div>
        </div>

        <Button
          href={`mailto:${personalInfo.email}`}
          size="lg"
        >
          Say Hello
          <ArrowRightIcon />
        </Button>
      </div>
    </Section>
  );
}
