import { ViewModel } from "../../utils/viewModel";
import { MonsterDao } from "../../domain/configurators/monsterDao";


export class IncinaratorVM extends ViewModel {
    constructor() {
        super();
        this.dropped = false;
    }

    onDragOver(event) {
        event.preventDefault();
    }




    onElementDropped(par) {
        const id = par.dataTransfer.getData("monsterConfigurator");
        const origin = JSON.parse(id);
        MonsterDao.getInstance().removeMonster(origin);
        this.dropped = true;
    }


}
