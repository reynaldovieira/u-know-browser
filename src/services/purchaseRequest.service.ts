import axios from "axios";

export const PurchaseRequest = async (products: any[]) => {
  const lines = ComposeLines(products);

  const xmlData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:Ariba:Buyer:vsap">
<soapenv:Header>
<urn:Headers>
<!--You may enter the following 2 items in any order-->
<!--Optional:-->
<urn:variant>vrealm_vrealm_3357</urn:variant>
<!--Optional:-->
<urn:partition>prealm_prealm_3357</urn:partition>
</urn:Headers>
</soapenv:Header>
<soapenv:Body>
<urn:RequisitionImportPullRequest partition="prealm_prealm_3357" variant="vrealm_vrealm_3357">
<!--Optional:-->
<urn:Requisition_RequisitionImportPull_Item>
<urn:item>
<urn:CompanyCode>
<urn:UniqueName>7000</urn:UniqueName>
</urn:CompanyCode>
<urn:DefaultLineItem>
<urn:DeliverTo>STR_CC16_MM</urn:DeliverTo>
<urn:NeedBy>2020-06-08T14:08:24+00:00</urn:NeedBy>
</urn:DefaultLineItem>               
<urn:ImportedHeaderCommentStaging/>
<urn:LineItems>${lines}</urn:LineItems>
<urn:Name></urn:Name>
<urn:Operation>New</urn:Operation>
<urn:OriginatingSystem>UAssistant</urn:OriginatingSystem>
<urn:OriginatingSystemReferenceID></urn:OriginatingSystemReferenceID>
<urn:Preparer>
<urn:PasswordAdapter>PasswordAdapter1</urn:PasswordAdapter>
<urn:UniqueName>josue.moura</urn:UniqueName>
</urn:Preparer>
<urn:Requester>
<urn:PasswordAdapter>PasswordAdapter1</urn:PasswordAdapter>
<urn:UniqueName>Aline_Damasceno</urn:UniqueName>
</urn:Requester>
<urn:UniqueName/>              
</urn:item>
</urn:Requisition_RequisitionImportPull_Item>
</urn:RequisitionImportPullRequest>
</soapenv:Body>
</soapenv:Envelope>`;

  const url =
    "https://ariba-integrator-dev.livelyfield-a051ae43.centralus.azurecontainerapps.io/api/RequisitionImportPull";

  return axios.post(url, xmlData, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};

const ComposeLines = (products: any[]) => {
  let lines = "";
  products.forEach((product) => {
    lines += `<urn:item>
                     <urn:CommodityCode>
                        <urn:UniqueName>L001</urn:UniqueName>
                     </urn:CommodityCode>
                     <urn:Description>
                        <urn:Description>${product?.product}</urn:Description>
                        <urn:Price>
                           <urn:Amount>0.0</urn:Amount>
                           <urn:Currency>
                              <urn:UniqueName>BRL</urn:UniqueName>
                           </urn:Currency>
                        </urn:Price>
                        <urn:PriceBasisQuantity>1</urn:PriceBasisQuantity>
                        <urn:UnitOfMeasure>
                           <urn:UniqueName>PI</urn:UniqueName>
                        </urn:UnitOfMeasure>
                     </urn:Description>
                     <urn:ERPLineItemNumber>00010</urn:ERPLineItemNumber>
                     <urn:ImportedAccountCategoryStaging>
                        <urn:UniqueName>U</urn:UniqueName>
                     </urn:ImportedAccountCategoryStaging>
                     <urn:ImportedDeliverToStaging>STR_CC16_MM</urn:ImportedDeliverToStaging>
                     <urn:ImportedLineCommentStaging/>
                     <urn:ImportedNeedByStaging>2020-06-08T14:08:24+00:00</urn:ImportedNeedByStaging>
                     <urn:NumberInCollection>1</urn:NumberInCollection>
                     <urn:OriginatingSystemLineNumber>00010</urn:OriginatingSystemLineNumber>
                     <urn:ParentLineNumber>0</urn:ParentLineNumber>
                     <urn:PurchaseGroup>
                        <urn:UniqueName>002</urn:UniqueName>
                     </urn:PurchaseGroup>
                     <urn:PurchaseOrg>
                        <urn:UniqueName/>
                     </urn:PurchaseOrg>
                     <urn:Quantity>${product?.quantity}</urn:Quantity>
                     <urn:SAPPlant>
                        <urn:UniqueName>2410</urn:UniqueName>
                     </urn:SAPPlant>
                     <urn:ShipTo>
                        <urn:UniqueName>2410</urn:UniqueName>
                     </urn:ShipTo>
                  </urn:item>`;
  });

  return lines;
};
