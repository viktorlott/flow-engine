export default {
    "user": {
        "_id": "string",
        "name": "string",
        "givenName": "string",
        "surname": "string",
        "personalnumber": "string",
        "company": "string",
        "email": "string",
        "name_id": "string",
        "session_index": "string",
        "loginMethod": "string",
        "org_id": "string",
        "lastName": "string",
        "primary_role": "string",
        "orgId": [
            "string"
        ],
        "referer": "string",
        "created": {},
        "createdByName": "string",
        "createdById": "number",
        "lastLogin": {},
        "loginCountPortal": "number",
        "loginLog":[],
        "address": "string",
        "cadastral": "string",
        "city": "string",
        "fullname": "string",
        "municipalCountyCode": "string",
        "municipality": "string",
        "navet": {
            "Folkbokforingsposter": {
                "Folkbokforingspost": "object"
            }
        },
        "relations": [],
        "zipcode": "string"
    },
    "form": {
        "_id": "string",
        "help": "string",
        "groupExt": "string",
        "publishedBy": "string",
        "formGroupExt": "string",
        "created": "string",
        "createdByName": "string",
        "publishedVersion": "number",
        "roleExt": [],
        "name": "string",
        "formdataCounter": "number",
        "url": "string",
        "process": "string",
        "metadata": {
            "serialNumber": "string"
        },
        "publishedByName": "string",
        "status": "string",
        "version": "number",
        "authExt": [],
        "createdById": "string",
        "formgroup": [
            "string"
        ],
        "updated": {},
        "publishedDate": {},
        "publishedInfo": "boolean",
        "description": "string",
        "publishedAlways": "boolean",
        "formid": "string",
        "group": "string",
        "orgId": "string"
    },
    "formdata": {
        "_id": "string",
        "formid": "string",
        "version": "number",
        "formname": "string",
        "orgId": [
            "string"
        ],
        "created": {},
        "updated": {},
        "status": "string",
        "userid": "string",
        "username": "string",
        "lastModifiedBy": "string",
        "createdBy": "string",
        "createdByName": "string",
        "createdById": "string",
        "DiaryNumber": "string",
        "arrived": "string",
        "selfpoint_connect": {
            "treserva": {
                "type": "string",
                "message": "string"
            }
        },
        "signatureRequest": [
            {
                "signaturePnr": "string",
                "signatureEmail": "string",
                "signatureRequestDate": "object"
            }
        ],
        "statusname": "string"
    },
    "session": {
        "cookie": {
            "path": "string",
            "httpOnly": "boolean"
        },
        "userid": "string",
        "name": "string",
        "username": "string",
        "role": [
            "string",
            "string",
            "string"
        ],
        "user": {
            "_id": "string",
            "name": "string",
            "email": "string",
            "primary_role": "string",
            "forcePassword": "boolean",
            "group": "string",
            "orgId": [
                "string",
                "string",
                "string"
            ],
            "created": "string",
            "createdByName": "string",
            "createdById": "string",
            "lastLogin": "string",
            "loginCountAdmin": "number",
            "updated": "string",
            "loginCountPortal": "number",
            "role": [
                "string",
                "string",
                "string"
            ],
            "groups": [
                "string"
            ]
        },
        "page_length": "number",
        "authType": "string",
        "home": "string",
        "defaultGroup": "string",
        "primary_role": "string",
        "authorized": "boolean",
        "org": {
            "email": "string",
            "homepage": "string",
            "invoiceaddress": "string",
            "phone": "string",
            "visitingaddress": "string",
            "orgId": "string",
            "name": "string",
            "fqdn": "string",
            "header": "string"
        },
        "orgId": "string",
        "orgName": "string",
        "dbfilter": {
            "orgId": [
                "string"
            ]
        },
        "dbOrgWriteFilter": {
            "orgId": [
                "string"
            ]
        },
        "dbOrgFilter": {
            "orgId": {
                "$in": "object"
            }
        },
        "locale": "string"
    },
    "components": {},
    "integrations": {}
}