import { TaskProvider } from "./context/TaskContext";
import Home from "./pages/Home";
import './style.css';

const App: React.FC = () => (
    <TaskProvider>
        <Home />
    </TaskProvider>
);

export default App;
