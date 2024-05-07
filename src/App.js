import './App.css';
import {useState} from "react";

const panels= ["Introductie", "Opleidingen", "WerkErvaringen", "Vaardigheden", "Projecten"];

/*
* Every panel is Original at the start
* When a panel is clicked that panel becomes Fullscreen
* All other panels move to the left or right depending on their position
* When the fullscreen panel is clicked again all panels become original
*/

const Panel = ({name, zIndex, status, onClick, index}) => {
    const panelClass = `${status}`; // Add the status to the class name
    const left = status === 'Fullscreen' ? `${((index + 1)* 20) - 10}%` : 0;
    return (
        <div className={panelClass}
             style={{
                 zIndex: zIndex,
                 left: left,
                 transform: `translateX(-${left})`
             }}
             onClick={onClick}>

            <div className={"panel-content"}>
                <h1>{name}</h1>
            </div>

            <img
                src={"/images/"+name+".png"}
                alt={name}
                className={"panel-background"}
                style={{zIndex: zIndex - 999}}/>
        </div>
    )
}

const PanelRow = () => {
    const [panelStatuses, setPanelStatuses] = useState(
        panels.map(() => 'Original') // Initialize all panels as 'Original'
    );

    const handleClick = (index) => {
        if (panelStatuses[index] === 'Fullscreen') {
            // If the clicked panel is already Fullscreen, set all panels back to Original
            setPanelStatuses(panels.map(() => 'Original'));
        } else {
            // Otherwise, proceed as before
            setPanelStatuses(panelStatuses.map((status, i) => {
                if (i === index) return 'Fullscreen'; // The clicked panel becomes 'Fullscreen'
                if (i < index) return 'MoveLeft'; // Panels to the left move left
                if (i > index) return 'MoveRight'; // Panels to the right move right
                return status;
            }));
        }
    }
    return(
        <section className={"panel-row"}>
            {panels.map((panel, index) => (
                <Panel
                    name={panel}
                    key={index}
                    zIndex={(index) * -1 + panels.length}
                    status={panelStatuses[index]}
                    onClick={() => handleClick(index)}
                    index={index}
                />
            ))}
        </section>
    )
}

function App() {
  return (
      <div className={"wrapper"}>
        <PanelRow />
      </div>
  );
}

export default App;
