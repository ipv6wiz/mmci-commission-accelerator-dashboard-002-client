export interface WorkflowStep {
    uid: string;
    type: string;
    stepNumber: number;
    nextStep: number;
    prevStep: number;
    stepTitle: string;
    roles: string[];
}
