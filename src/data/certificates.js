// Certificates. img → /public/certs/<img>.jpg, pdf → /public/certs/pdf/<pdf>.pdf
const VERIFY = 'https://coursera.org/verify/';

export const tracks = [
  {
    name: 'Machine Learning Specialization', by: 'Stanford · DeepLearning.AI',
    stops: [
      { title: 'Supervised Machine Learning', date: 'Mar 31, 2026', img: 'supervised-machine-learning', pdf: 'supervised-machine-learning', verify: VERIFY + '18KTULZNNPZO' },
      { title: 'Advanced Learning Algorithms', date: 'May 9, 2026', img: 'advanced-learning-algorithms', pdf: 'advanced-learning-algorithms', verify: VERIFY + '7W6G2BY39AZR' },
      { title: 'Unsupervised Learning, Recommenders, RL', date: 'Jun 13, 2026', img: 'machine-learning-specialization-certificate', pdf: 'machine-learning-specialization', verify: VERIFY + 'specialization/1G551ON1Q0I6', done: 'Specialization complete', lightboxTitle: 'Machine Learning Specialization' },
    ],
  },
  {
    name: 'Deep Learning Specialization', by: 'DeepLearning.AI · 2 of 5',
    stops: [
      { title: 'Neural Networks and Deep Learning', date: 'Jul 15, 2026', img: 'neural-networks-and-deep-learning', pdf: 'neural-networks-and-deep-learning', verify: VERIFY + 'FEDXGJTPV7D3' },
      { title: 'Improving Deep Neural Networks', date: 'Aug 17, 2026', img: 'improving-deep-neural-networks', pdf: 'improving-deep-neural-networks', verify: VERIFY + '41BY4UN442G5' },
      { title: 'Structuring ML Projects', date: 'Next', upNext: true },
    ],
  },
];

export const others = [
  { title: 'Blockchain Specialization', meta: 'University at Buffalo · Mar 2026', img: 'blockchain', pdf: 'blockchain-specialization', verify: VERIFY + 'specialization/5SZ36F1UQUD0' },
  { title: 'Google Prompting Essentials', meta: 'Google · Mar 2026', img: 'google-prompting-essentials', pdf: 'google-prompting-essentials', verify: VERIFY + 'specialization/QTQ6VMI3KSCC' },
  { title: 'IT Specialist: Software Development', meta: 'Certiport · Nov 2025', img: 'softwaredev-cerrt', pdf: 'it-specialist-software-development' },
  { title: 'IT Specialist: Cybersecurity', meta: 'Certiport · May 2026', img: 'cybersec-cert', pdf: 'it-specialist-cybersecurity' },
  { title: 'IT Specialist: HTML and CSS', meta: 'Certiport · Nov 2025', img: 'html-css-cert', pdf: 'it-specialist-html-css' },
  { title: 'IC3 Digital Literacy, Level 2', meta: 'Certiport · Apr 2025', img: 'ic3gs6lvl2-cert', pdf: 'ic3-level-2' },
];

export const hackathonCert = {
  title: 'SiKAPTala 2026 National CS & IT Competition',
  meta: 'De La Salle University–Dasmariñas · May 2026',
  img: 'siklab-hackathon',
  pdf: 'siklab-hackathon',
};

// shape a certificate for the lightbox
export const certItem = c => ({
  img: `/certs/${c.img}.jpg`,
  title: c.lightboxTitle || c.title,
  meta: c.date || c.meta,
  pdf: `/certs/pdf/${c.pdf}.pdf`,
  verify: c.verify,
});
