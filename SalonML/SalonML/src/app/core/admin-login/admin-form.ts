export interface AdminForm {
    subTitle: string;
    title: string;

    firstFormControlName: "email" | "password";
    firstPlaceholder: string;
    firstErrorMessage: string;

    secondFormControlName: "password" | "";
    secondPlaceholder: string;
    secondErrorMessage: string;

    mainErrorMessage: string;
    primaryButtonText: string;

    failedRequest: boolean; // set this to false
}
