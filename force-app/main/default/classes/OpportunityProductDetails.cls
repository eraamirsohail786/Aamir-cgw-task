public with sharing class OpportunityProductDetails {
    @AuraEnabled(cacheable=true)
    public static List<Map<String, Object>> getProductDetails(Id opportunityId) {
        if (opportunityId == null) {
            throw new AuraHandledException('Opportunity ID is required.');
        }

        // Query OpportunityLineItem for product details
        List<OpportunityLineItem> lineItems = [
            SELECT Id, OpportunityId, Product2Id, Product2.Name, Quantity, UnitPrice, TotalPrice, Description
            FROM OpportunityLineItem
            WHERE OpportunityId = :opportunityId
        ];

        // Transform results into a list of maps for flexibility
        List<Map<String, Object>> productDetails = new List<Map<String, Object>>();
        for (OpportunityLineItem item : lineItems) {
            Map<String, Object> productMap = new Map<String, Object>();
			productMap.put('Id', item.id);
            productMap.put('ProductName', item.Product2.Name);
            productMap.put('Quantity', item.Quantity);
            productMap.put('UnitPrice', item.UnitPrice);
            productMap.put('TotalPrice', item.TotalPrice);
            productMap.put('Description', item.Description);
            productDetails.add(productMap);
        }

        return productDetails;
    }
}
