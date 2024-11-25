import {TYPES} from "@/architecture/ioc/types"
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {makeObservable, action, observable, computed} from "mobx";
import dayjs from "dayjs";

@injectable()
class AdminShtoAutomjetPresenter {

    @inject(TYPES.MainAppRepository) MainAppRepository;

    vm = {
        newTransportObject: {
            model: null,
            tag: null,
            expiry_date: null,
            assignee: null,
            document: null,
        }
    }

    constructor() {
        makeObservable(this, {
            vm: observable,
            changeValues: action.bound,
            addTransport: action.bound,
            handleDatesChange: action.bound,
            handleDocumentUpload: action.bound,
            convertFileToBase64: action.bound,
            removeDocumentUpload: action.bound,
            documentUploaded: computed
        });
    }

    changeValues(e, target) {
        this.vm.newTransportObject[target] = e.target.value;
    }

    handleDatesChange(newValue) {
        this.vm.newTransportObject.expiry_date = dayjs(newValue).format('DD-MM-YYYY')
    }

    async handleDocumentUpload(event) {
        const file = event.target.files?.[0];
        if (file) {
            const base64String = await this.convertFileToBase64(file);
            this.vm.newTransportObject.document = base64String;
        } else {
            console.error("No file selected");
        }
    }

    convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const base64String = reader.result.split(",")[1];
                resolve(base64String);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    }

    removeDocumentUpload = () => {
        this.vm.newTransportObject.document = null
    }

    addTransport = async () => {
        await this.MainAppRepository.addTransport(this.vm.newTransportObject);
    }

    get documentUploaded() {
        return this.vm.newTransportObject.document;
    }

}

export default AdminShtoAutomjetPresenter;