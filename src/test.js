const test = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
  <s:Body>
    <CreateCastorCaseFromTemplate xmlns="http://tempuri.org/" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
      <template>
        <ExtensionData />
        <!-- Template id för vilken mall  (1014 för bygglov)-->
        <Templateid>{{globals.components.templateid}}</Templateid>

        
        <!-- Namn på etjänsten [Beskrivning av mallen]  (e.g. CastorBygglov-test)-->
        <TemplateDescription>{{globals.components.templateid}}</TemplateDescription>

        <!-- En flagga om uppgifter styrkts via ex BankID -->
        <PartnerReference>CASE-2013-2233</PartnerReference>

        <!-- En lista med personer -->
        <Persons>

        <!-- 
            Namn                Typ                   Beskrivning
            Number              string                Personnummer
            Name                string                Namn ”Kalle Wahlström”
            NameCo              string                Namn Co
            Adress              string                Adress
            PostalCode          string                Postnummer
            City                string                Ort
            Phone               string                Telefon
            MobilePhone         string                Mobiltelefon
            Email               string                E-postadress
            Realestatename      string                Fastighetsbeteckning
            Realestatenumber    Int                   Fastighetsnummer ”FNR”
            Realestateadress    string                Fastighetsadress
            Realestatecity      string                Fastighetsadressort
            Realestatepostnr    string                Fastighetsadresspostnummer
            Persontype          CastorPersonTypeEnum  Persontyp ”Sökande”



            CastorPersonTypeEnum
            Sökande = 0,
            Fastighetsägare = 1,
            Fakturamottagare = 2,
            Kontrollansvarig = 3,
            Ombud = 4,
            Verksamhetsutövare = 5,
            Kontaktperson = 6,
            Klagande = 7,
            Kvalitetsansvarig = 8,
            Medsökande = 9,
            Skyddadidentitet = 10,
            Byggherre = 11,
            Arkitekt = 12,
            Säljare = 13,
            Konstruktör = 14


            CastorEventTypeEnum
            Dokument = 0, CasePDF = 1
        -->

          <CastorPersonData>
            <Number>195401230000</Number>
            <Name>Bo Andersson</Name>
            <City>Örebro</City>
            <Realestatenumber>0</Realestatenumber>
            <Persontype>Fakturamottagare</Persontype>
          </CastorPersonData>

          <CastorPersonData>
            <Number>195101230000</Number>
            <Name>Han Solo</Name>
            <City>Örebro</City>
            <Realestatenumber>0</Realestatenumber>
            <Persontype>Kontrollansvarig</Persontype>
          </CastorPersonData>

          <CastorPersonData>
            <Number>198022222222</Number>
            <Name>Arkitet Herr Anders</Name>
            <City>Örebro</City>
            <Realestatenumber>0</Realestatenumber>
            <Persontype>Kontaktperson</Persontype>
          </CastorPersonData>

        </Persons>


        <!-- -->
        <Persondata>
          <ExtensionData />
          <Number>198005070000</Number>
          <Name>Kalle Wahlström</Name>
          <NameCo />
          <Adress>Kungsgatan 16</Adress>
          <PostalCode>63220</PostalCode>
          <City>Eskilstuna</City>
          <Phone>016-150430</Phone>
          <MobilePhone />
          <Email>kw@prosona.se</Email>
          <Realestatename>Kajutan 1:3</Realestatename>
          <Realestatenumber>223352345</Realestatenumber>
          <Realestateadress />
          <Realestatecity />
          <Realestatepostnr />
          <Persontype>Sökande</Persontype>
        </Persondata>

        <!-- -->
        <Files>
          <CastorDocumentData>
            <Extension>.pdf</Extension>
            <Filename>fil1.pdf</Filename>
            <EventType>Dokument</EventType>
            <Data>Klippt data !!!!!JVBERi0xLjQKJdP0zOEKMSAwIG9iago8PAovQ3JlYXRpb25EYXRlKEQ6MjAxMzA2MTkxMTIxMDQrMDInMDAnKQovQ3JlYXRvcihQREZzaGFycCAxLjMxLjE3ODktZyBcKHd3dy5wZGZzaGFycC5jb21cKSkKL1Byb2R1Y2VyKFBERnNoYXJwIDEuMzEuMTc4OS1nIFwod3d3LnBkZnNoYXJwLmNvbVwpKQo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZS9DYXRhbG9nCi9QYWdlcyAzIDAgUgo+PgplbmRvYmogCjAwMDAwMzQ1NDYgMDAwMDAgbiAKMDAwMDAzNTE5OSAwMDAwMCBuIAowMDAwMDM1ODUyIDAwMDAwIG4gCjAwMDAwMzY1MDUgMDAwMDAgbiAKMDAwMDAzNzE1OCAwMDAwMCBuIAowMDAwMDM3ODExIDAwMDAwIG4gCnRyYWlsZXIKPDwKL0lEWzwzRkI0RDZFNDk2MTIzNzRBOTc0RUM0NTk3Qzc0MDhBNj48M0ZCNEQ2RTQ5NjEyMzc0QTk3NEVDNDU5N0M3NDA4QTY+XQovSW5mbyAxIDAgUgovUm9vdCAyIDAgUgovU2l6ZSA2Nwo+PgpzdGFydHhyZWYKMzg0NjQKJSVFT0YK</Data>
            <FileMappingID>1014_1</FileMappingID>
          </CastorDocumentData>
          <CastorDocumentData>
            <Extension>.pdf</Extension>
            <Filename>fil2.pdf</Filename>
            <EventType>Dokument</EventType>
            <Data>klippt data !!!JVBERi0xLjQKJdP0zOEKMSAwIG9iago8PAovQ3JlYXRpb25EYXRlKEQ6MjAxMzA2MTkxMTIxMDQrMDInMDAnKQovQ3JlYXRvcihQREZzaGFycCAxLjMxLjE3ODktZyBcKHd3dy5wZGZzaGFycC5jb21cKSkKL1Byb2R1Y2VyKFBERnNsZXIKPDwKL0lEWzwzRkI0RDZFNDk2MTIzNzRBOTc0RUM0NTk3Qzc0MDhBNj48M0ZCNEQ2RTQ5NjEyMzc0QTk3NEVDNDU5N0M3NDA4QTY+XQovSW5mbyAxIDAgUgovUm9vdCAyIDAgUgovU2l6ZSA2Nwo+PgpzdGFydHhyZWYKMzg0NjQKJSVFT0YK</Data>
            <FileMappingID>1014_2</FileMappingID>
          </CastorDocumentData>
          <CastorDocumentData>
            <Extension>.pdf</Extension>
            <Filename>arende.pdf.pdf</Filename>
            <EventType>CasePDF</EventType>
            <Data>klippt data !!!!JVBERi0xLjQKJdP0zOEKMSAwIG9iago8PAovQ3JlYXRpb25EYXRlKEQ6MjAxMzA2MTkxMTIxMDQrMDInMDAnKQovQ3JlYXRvcihQREZzaGFycCAxLjMxLjE3ODktZyBcKHd3dy5wZGZzaGFycC5jb21cKSkKL1Byb2R1Y2VyKFBERnNoYXJwIDEuMzEuMTc4OS1nIFwod3d3LnBkZnNoYXJwLmNvbVwpKQo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZS9DYXRhbG9nCi9QYWdlcyAzIDAgUgo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZS9QYWdlcwovQ291bnQgMQovS2lkc1s0IDAgUl0KPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUvUGFnZQovTWVkaWFCb3hbMCAwIDYzMy4xMjUgNTY4LjYyNKPDwKL0lEWzwzRkI0RDZFNDk2MTIzNzRBOTc0RUM0NTk3Qzc0MDhBNj48M0ZCNEQ2RTQ5NjEyMzc0QTk3NEVDNDU5N0M3NDA4QTY+XQovSW5mbyAxIDAgUgovUm9vdCAyIDAgUgovU2l6ZSA2Nwo+PgpzdGFydHhyZWYKMzg0NjQKJSVFT0YK</Data>
          </CastorDocumentData>
        </Files>

        <!-- Formulär data-->
        <Extendedinfo>
          <CastorCaseExtendedInfo>
            <Key>FastadFärg</Key>
            <Value>Röd</Value>
          </CastorCaseExtendedInfo>
          <CastorCaseExtendedInfo>
            <Key>TypAvByggnad</Key>
            <Value>Garage</Value>
          </CastorCaseExtendedInfo>
          <CastorCaseExtendedInfo>
            <Key>Takbeklädnad</Key>
            <Value>Plåt</Value>
          </CastorCaseExtendedInfo>
        </Extendedinfo>

      </template>



      
      <!-- Partner ID (e.g. 70D7BA7C-8DAC-436B-9F4A-671C47FC4ED4)-->
      <PartnerID>70d7ba7c-8dac-436b-9f4a-671c47fc4ed4</PartnerID>
      <eID>false</eID>
    </CreateCastorCaseFromTemplate>
  </s:Body>
</s:Envelope>`


export default test