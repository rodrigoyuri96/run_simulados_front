import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import SimulatedModel from "@/models/simulated.model";

@Module({ name: "SimulatedModule", namespaced: true })
export class SimulatedModule extends VuexModule {
  _simulations: SimulatedModel[] = [];
  _simulated: SimulatedModel = new SimulatedModel();

  get simulations() {
    return this._simulations;
  }

  get simulated() {
    return this._simulated;
  }

  @Mutation
  setSimulated(newSimulated: SimulatedModel) {
    this._simulated = newSimulated;
  }

  @Mutation
  _addToSimulations(newSimulated: SimulatedModel) {
    this._simulations.push(newSimulated);
  }

  @Mutation
  _setSimulations(simulations: SimulatedModel[]) {
    this._simulations = simulations;
  }
}
