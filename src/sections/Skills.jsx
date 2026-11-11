import { levels, tools } from '../data/skills';
import Logo from '../components/Logo';
import Todo from '../components/Todo';

export default function Skills() {
  return (
    <section id="skills" className="sec">
      <div className="sec-head">
        <h2>Skills</h2>
        <p className="intro">Grouped by how much I've actually used them, with the project where each one was used. <Todo>Placement is a draft.</Todo></p>
      </div>
      <div className="levels">
        {levels.map(lv => (
          <div className="level" key={lv.name}>
            <div className="lv-head">
              <span className="dots" aria-hidden="true">{[1, 2, 3].map(d => <i key={d} className={d <= lv.dots ? 'on' : undefined} />)}</span>
              <h4>{lv.name}</h4>
              <p>{lv.sub}</p>
            </div>
            <ul>
              {lv.items.map(s => (
                <li key={s.name}><Logo name={s.icon} /><div><b>{s.name}</b><small>{s.where}</small></div></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="tools">
        <span className="label">I also build with</span>
        {tools.map(t => <span key={t.name}>{t.icon && <Logo name={t.icon} />}{t.name}</span>)}
      </p>
    </section>
  );
}
