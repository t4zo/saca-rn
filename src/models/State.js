import Accordion from './Accordion';
import Camera from './Camera';
import Modal from './Modal';
import Picture from './Picture';

export default class State {
  update = false;

  accordion = new Accordion();
  camera = new Camera();
  modal = new Modal();
  picture = new Picture();

  setUpdate() {
    this.modal.update = !this.modal.update;
    return this;
  }

  resetAccordion() {
    this.accordion = new Accordion();
    return this;
  }
}
