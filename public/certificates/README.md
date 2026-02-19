# Certificate Images

Put your certificate images in this folder.

## Suggested multi-certificate filenames (already referenced in `src/data/portfolio.js`)

### University at Buffalo (example 4 certificates)

- `buffalo-blockchain-01-basics.jpg`
- `buffalo-blockchain-02-smart-contracts.jpg`
- `buffalo-blockchain-03-security.jpg`
- `buffalo-blockchain-04-applications.jpg`

### Coursera Machine Learning Specialization (example)

- `coursera-ml-01-supervised.jpg`
- `coursera-ml-02-advanced.jpg`
- `coursera-ml-03-unsupervised.jpg`

### Coursera Deep Learning Specialization (example)

- `coursera-dl-01-neural-networks.jpg`
- `coursera-dl-02-improving-dnns.jpg`
- `coursera-dl-03-structuring-ml-projects.jpg`
- `coursera-dl-04-cnns.jpg`

### Additional credentials (example)

- `ic3-digital-literacy.jpg`
- `it-specialist-software-development.jpg`
- `it-specialist-cybersecurity.jpg`
- `freecodecamp-responsive-web-design.jpg`
- `freecodecamp-javascript-algorithms.jpg`

## Supported formats

Use `.jpg`, `.jpeg`, `.png`, or `.webp`.

If you use a different filename, update the corresponding `image` values in `certificationsData[*].certificates[*]`.

Example:

- `/certificates/my-new-certificate.png`

## Data structure reminder

Each specialization can include multiple certificate entries:

- `certificationsData[*].name` = specialization/track name
- `certificationsData[*].certificates[]` = individual certificate files + links

Tip: keep images under ~500KB each for faster loading.
