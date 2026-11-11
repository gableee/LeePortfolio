import { Chapter, NextStory, StoryPage } from '../components/Story';
import AutoVideo from '../components/AutoVideo';
import Deep from '../components/Deep';
import Stepper from '../components/Stepper';
import { useLightbox } from '../lib/shared';

const LINKS = [
  { label: 'Projects', href: '/#projects' },
  { label: 'VoteX', href: '/votex' },
  { label: 'Contact', href: '#contact' },
];

const FACTS = [
  ['Event', 'Kahanga-Hackathon, City of Balanga'],
  ['Track', 'Smart Environment'],
  ['My role', 'Front-end developer, team of 3'],
  ['When', 'Oct 2025'],
  ['Result', 'Qualified, of 22 entries'],
];

const DRILL = [
  { video: 'barangay-selection', tag: 'step 1', title: 'Choose a barangay', caption: 'Pick a barangay on the city map to see its streets.' },
  { video: 'street-selection', tag: 'step 2', title: 'Choose a street', caption: 'Streets are coloured by how well lit they are. Select one for its details.' },
  { video: 'street-illumination', tag: 'step 3', title: 'Inspect each light', caption: 'Each light pole shows its reading, so crews know exactly which one to fix.' },
];

// Where a reading travels, from the pole to the screen. The last stop is the part I built.
const PARTS = [
  ['ESP32', 'the microcontroller that runs it'],
  ['Light sensor', 'measures how bright it is'],
  ['GPS module and antenna', 'records where each reading was taken'],
  ['OLED screen', 'shows readings on the unit itself'],
  ['SD card module', 'stores readings on the device'],
  ['3.7V battery and charging module', 'so it runs without a wall plug'],
];

const FLOW = [
  { title: 'Sensor unit', sub: 'ESP32 hardware', text: 'Measures the light level, with GPS for where it was taken.' },
  { title: 'Backend API', sub: 'Built by my teammates', text: 'Collects the readings and serves them to the app.' },
  { title: 'React dashboard', sub: 'Built by me', text: 'Fetches the readings and turns them into maps, charts and device status.', mine: true },
];

function SensorUnit() {
  const open = useLightbox();
  const photo = { img: '/liwanag/sensor-unit.webp', title: 'The LIWANAG sensor unit', meta: 'ESP32 prototype with light sensor, GPS, OLED, SD card and battery', figure: true };
  return (
    <div className="cols sensor">
      <figure>
        <button className="frame zoom" onClick={() => open(photo)} aria-label="View the sensor unit photo full size">
          <img src={photo.img} alt="The LIWANAG sensor unit on a breadboard, with labelled parts: 3.7V battery, charging module, ESP32, light sensor, OLED screen, SD card module, GPS module and antenna, and control buttons." loading="lazy" width="1100" height="890" />
        </button>
        <figcaption className="cap">Our sensor unit, the hardware behind every reading. Click to enlarge.</figcaption>
      </figure>
      <div className="card eng">
        <h4>What's on the board</h4>
        <ul>{PARTS.map(([b, t]) => <li key={b}><b>{b}</b>: {t}</li>)}</ul>
      </div>
    </div>
  );
}

export default function Liwanag() {
  const of = 5;
  return (
    <StoryPage
      title="LIWANAG"
      lede="A dashboard that shows Balanga City which streets are too dark, down to a single light pole."
      heroVideo="street-illumination"
      facts={FACTS}
      readTime="About 3 minutes · 5 short chapters"
      links={LINKS}
      footer={{ title: 'Want to talk about LIWANAG?', text: "I'm happy to walk through how we built it." }}
    >
      <Chapter id="challenge" n={1} of={of} title="The challenge">
        <div className="cols">
          <div className="text">
            <p className="lede">Dark streets feel unsafe, but a city can't fix what it can't see.</p>
            <blockquote className="brief">
              <span className="label">The challenge we chose · Smart Environment track</span>
              <p>"How might we improve public lighting in the City of Balanga to enhance safety and efficiency?"</p>
            </blockquote>
          </div>
          <div className="text">
            <p>LIWANAG stands for Lighting Intelligence with Automated Navigation for Analytics and Governance, and "liwanag" means light in Filipino.</p>
            <p>Our answer: put real light sensors on the streets, and give city officials one screen that shows exactly where the dark spots are.</p>
          </div>
        </div>
      </Chapter>

      <Chapter id="my-part" n={2} of={of} title="My part: from idea to interface">
        <div className="cols">
          <div className="text">
            <p className="lede">We were a team of three. I helped shape the idea, then built everything an official actually sees and clicks.</p>
            <p>During brainstorming I worked out how the product should work for the people using it: start from the whole city, narrow down to one street, then to one light pole. That flow became the design of the interface.</p>
          </div>
          <div className="card eng">
            <h4>What I built in React</h4>
            <ul>
              <li><b>The city map</b>, from barangay down to a single light pole</li>
              <li><b>The analytics dashboard</b>: coverage over time, status breakdown and the streets to fix first</li>
              <li><b>Live device status</b> for every sensor, from real readings</li>
              <li><b>The admin panel</b> that ties it together</li>
            </ul>
          </div>
        </div>
      </Chapter>

      <Chapter id="zoom" n={3} of={of} title="From city to street">
        <div className="cols">
          <div className="text">
            <p className="lede">An official starts with the whole city and narrows down to one street in three clicks.</p>
            <p>Streets and poles are coloured by light level, so the dark spots stand out before anyone reads a number.</p>
          </div>
          <Stepper label="Drill-down" steps={DRILL} />
        </div>
      </Chapter>

      <Chapter id="numbers" n={4} of={of} title="Real sensors, live readings">
        <p className="lede" style={{ marginTop: 18, maxWidth: '62ch' }}>The readings come from real ESP32 light sensors. I connected the dashboard to our backend API, so what officials see is what the street is measuring.</p>
        <SensorUnit />
        <ol className="flow wide" aria-label="How a light reading reaches the dashboard">
          {FLOW.map(f => (
            <li key={f.title} className={f.mine ? 'mine' : undefined}>
              <span className="label">{f.sub}</span>
              <b>{f.title}</b>
              <span>{f.text}</span>
            </li>
          ))}
        </ol>
        <p className="lede" style={{ marginTop: 40, maxWidth: '62ch' }}>Light on the ground is measured in lux. In the demo data, streets averaged 5.43 lux, about a quarter of the 20 lux standard the dashboard checks against.</p>
        <div className="lux wide" role="img" aria-label="Lux scale from 0 to 30. Average street reading 5.43 lux; standard 20 lux.">
          <div className="lux-track">
            <div className="lux-mark" style={{ left: '18.1%' }}><b>5.43 lux</b> average</div>
            <div className="lux-mark" style={{ left: '66.7%' }}><b>20 lux</b> standard</div>
          </div>
          <div className="lux-ticks"><span>0</span><span>10</span><span>20</span><span>30 lux</span></div>
        </div>
        <div className="cols">
          <div className="text">
            <div className="stats stack">
              <div><b>36.1%</b><span>of streets meet the standard</span></div>
              <div><b>65.77 km</b><span>of road surveyed</span></div>
            </div>
            <Deep topic="data"><ul>
              <li><b>Source:</b> a battery-powered ESP32 sensor unit with a light sensor and GPS, so each reading has a location.</li>
              <li><b>Path:</b> sensors report to our backend; the React dashboard fetches the readings from its API.</li>
              <li><b>Device status</b> for each sensor is shown next to the analytics, so a broken sensor isn't mistaken for a dark street.</li>
            </ul></Deep>
          </div>
          <figure>
            <div className="frame"><AutoVideo name="dashboard-and-analytics" label="LIWANAG analytics dashboard" /></div>
            <figcaption className="cap">The dashboard I built: coverage over time, a status breakdown, and the streets that need attention first.</figcaption>
          </figure>
        </div>
      </Chapter>

      <Chapter id="luxor" n={5} of={of} title="Ask Luxor">
        <div className="cols">
          <p className="lede">Not everyone wants to read charts. Luxor is an assistant that answers questions like "How is street lighting in Tortugas?" in plain language.</p>
          <figure><div className="frame"><AutoVideo name="luxor" label="Asking Luxor about street lighting" /></div></figure>
        </div>
        <NextStory to="/votex" title="VoteX" text="Elections where an AI model reads every comment and every vote can be checked." frame="VX_Hero" />
      </Chapter>
    </StoryPage>
  );
}
