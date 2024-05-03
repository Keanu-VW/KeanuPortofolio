import './App.css';
import {useState} from "react";

const HoverText = ({text}) => {
  return (
      <div className={"hover-text"}>
        <h1>{text}</h1>
      </div>
  )
}

const PanelRow = () => {
  const panels = ["Introductie", "Opleidingen", "WerkErvaringen", "Vaardigheden", "Projecten"];
  const [fullscreenPanel, setFullscreenPanel] = useState(null);

  const handlePanelClick = (panelID) => {
    setFullscreenPanel(prevPanel => prevPanel === panelID ? null : panelID);

  }

  return (
      <section className={"panel-row"}>
        {panels.map((panel, index) => (
            <article className={`panel ${panel === fullscreenPanel ? 'fullscreen' : ''}`}
                     key={index}
                     style={{
                       zIndex: panel === fullscreenPanel ? 1000 : panels.length - index
                     }}
                     onClick={() => handlePanelClick(panel)}>
              <HoverText text={panel} />
            </article>
        ))}
      </section>
  );
}



function App() {
  return (
      <div className={"wrapper"}>
        <PanelRow />
      </div>
  );
}

export default App;
