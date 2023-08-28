import BarGraph from './Bargraph';
import LinePlot from './Lineplot'
import ScatterPlot from './Scatterplot';
import HeatMap from './Heatmap';
import PieChart from './Piechart';
import SpiderChart from './Spiderchart';
import RadarChart from './Radarchart';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BarGraph />
        <LinePlot />
        <ScatterPlot />
        <HeatMap />
        <PieChart />
        <SpiderChart />
        <RadarChart />
      </header>
    </div>
  );
}

export default App;
