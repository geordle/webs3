import { ViewModelLocator } from "./viewModelLocator";

export class FieldViewModel {
    constructor() {
        this.fieldtype = "water";
        this.region = "Jungle";
    }

    changeTo({target:{value}}) {
        ViewModelLocator.getInstance().clearField();

        this.region = value;
    }
}
