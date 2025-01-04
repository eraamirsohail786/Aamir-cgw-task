import { LightningElement, track } from 'lwc';

export default class FetchUrlParams extends LightningElement {
    @track data = [];
    @track columns = [
        { label: 'Parameter Name', fieldName: 'paramName', type: 'text' },
        { label: 'Value', fieldName: 'value', type: 'text' },
    ];

    connectedCallback() {
        // Get the current URL
        const urlParams = new URLSearchParams(window.location.search);

        // Parse parameters
        const parsedParams = [];
        urlParams.forEach((value, key) => {
            parsedParams.push({ id: key, paramName: key, value: value || 'N/A' });
        });

        // Set the data for the datatable
        this.data = parsedParams;
    }
}
