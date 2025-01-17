import { Modal } from './common/Modal';
import { IEvents } from './base/events';

export interface IModalPreview {
    modalContent: Function;
}

export class ModalPreview extends Modal <IModalPreview> {

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
	}

}
