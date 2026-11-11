// Brand logo drawn as a CSS mask, so it follows the text colour in both themes.
// On hover (see .lg in styles.css) it lights up in the brand's own colour.
// Brands whose colour is black or near-black are left out: they light up in ink instead.
const BRAND = {
  react: '#61DAFB', typescript: '#3178C6', css3: '#1572B6', tailwindcss: '#06B6D4', git: '#F05032',
  python: '#3776AB', nodedotjs: '#5FA04E', postgresql: '#4169E1', fastapi: '#009688', openai: '#10A37F',
  scikitlearn: '#F7931E', mlflow: '#0194E2', docker: '#2496ED', jupyter: '#F37626',
  claude: '#D97757', deepseek: '#4D6BFE',
};

export default function Logo({ name }) {
  if (!name) return <i className="lg none" aria-hidden="true" />;
  const style = { '--i': `url(/icons/${name}.svg)` };
  if (BRAND[name]) style['--brand'] = BRAND[name];
  return <i className="lg" style={style} aria-hidden="true" />;
}
