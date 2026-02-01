import { Calculator } from './calculator';
import './styles.css';

const calculator = new Calculator(document.getElementById('app')!);
calculator.render();
