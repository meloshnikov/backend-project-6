import Status from "../models/Status.cjs";

class StatusService {
  constructor() {
    this.statusModel = Status;
  }

  getStatuses = async () => this.statusModel.query();

  getStatusById = async (id) => this.statusModel.query().findById(id);

  createStatus = async (statusData) => {
    const validStatus = await this.statusModel.fromJson(statusData);
    return this.statusModel.query().insert(validStatus);
  };

  updateStatus = async (statusData) => {
    const status = await this.getStatusById(statusData.id);
    await this.statusModel.fromJson(statusData);
    status.$set(statusData);
    await status.$query().patch();
  };

  deleteById = async (statusId) => {
    const status = await this.getStatusById(statusId);
    await status.$query().delete();
  };
}

export default StatusService;
