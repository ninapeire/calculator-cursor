import { CalculatorLogic } from './CalculatorLogic';
import { CalculatorView } from './CalculatorView';
import './styles.css';

const container = document.getElementById('app')!;
const logic = new CalculatorLogic();
const view = new CalculatorView(container, logic);
view.render();
