import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
// Opportunity fields
import ACCOUNT_ID from '@salesforce/schema/Opportunity.AccountId';
import CLOSE_DATE from '@salesforce/schema/Opportunity.CloseDate';
import ID_FIELD from '@salesforce/schema/Opportunity.Id';

import getApexData from '@salesforce/apex/OpportunityProductDetails.getProductDetails';
const FIELDS = [ACCOUNT_ID, CLOSE_DATE, ID_FIELD];

export default class ActionButton extends NavigationMixin(LightningElement) {

    @api recordId; // The recordId is automatically passed on record pages

    opportunityDetails;
    @track oppData;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredRecord({ error, data }) {
        if (data) {
            this.opportunityDetails = {
                id: data.fields.Id.value,
                accountId: data.fields.AccountId.value,
                closeDate: data.fields.CloseDate.value,
            };
        } else if (error) {
            console.error('Error fetching opportunity details:', error);
        }
    }

    @wire(getApexData, ({opportunityId: '$recordId'}))
    wiredResponse({error, data}){
        if(data) {
            this.oppData = data;
            console.log('Opportuniyt OUTPUT : ',data);
        } else {
            console.log('Error Data ', error);
            
        }

    }

    handleRedirect(event) {
        const { id, accountId, closeDate } = this.opportunityDetails;

        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Invoice_Page', // Replace with your page's API name
            },
            state: {
                c__origin_record: id,
                c__account: accountId,
                c__invoice_date: closeDate,
                c__invoice_due_date: closeDate,
                c__child_relationship_name: 'opportunitylineitems',
                c__line_item_description: event.target.dataset.description,
                c__line_item_quantity: event.target.dataset.quantity,
                c__line_item_unit_price: event.target.dataset.unitprice
            }
        });
    }
}