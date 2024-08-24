import Label from "../models/Label.cjs";

class LabelService {
  constructor() {
    this.labelModel = Label;
  }

  getLabels = async () => this.labelModel.query();

  getLabelById = async (id) => this.labelModel.query().findById(id);

  createLabel = async (labelData) => {
    const validLabel = await this.labelModel.fromJson(labelData);
    return this.labelModel.query().insert(validLabel);
  };

  updateLabel = async (labelData) => {
    const label = await this.getLabelById(labelData.id);
    await this.labelModel.fromJson(labelData);
    label.$set(labelData);
    await label.$query().patch();
  };

  deleteById = async (labelId) => {
    const label = await this.getLabelById(labelId);
    await label.$query().delete();
  };

  getlabelWithTasks = async (labelId) => this.labelModel.query().findById(labelId).withGraphFetched("tasks");

  getLabelsbyIds = async (labelIds) => this.labelModel.query().whereIn("id", labelIds);
}

export default LabelService;
