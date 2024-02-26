import {WorkflowStep} from "./workflow-step.interface";

export interface RegStep {
    step: WorkflowStep;
    status: 'current' | 'completed' | 'pending'| 'approved';
}
