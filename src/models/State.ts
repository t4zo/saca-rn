import Accordion from './Accordion';
import Camera from './Camera';
import Modal from './Modal';
import Card from './Card';

export default class State {
  update = false;

  accordion = new Accordion();
  camera = new Camera();
  modal = new Modal();
  card = new Card();

  setUpdate() {
    this.update = !this.update;
    return this;
  }

  resetAccordion() {
    this.accordion = new Accordion();
    return this;
  }
}
