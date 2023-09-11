
export const addClientsValidationBody = {
   
        type: "string",
        required: [
            'name',
            'address',
            'phone',
            'email',
            'password'
        ],
        properties: {
            name: {type: 'string'},
            address: {type: 'string'},
            phone: {type: 'string'},
            email: {type: 'string'},
            password: {type: 'string'}
        }
    };

export const addClientsValidationResponse= {
        
                type: 'object',
                properties: {
                    name: {type: 'string'},
            address: {type: 'string'},
            phone: {type: 'integer'},
            email: {type: 'string'},
            password: {type: 'string'},
                }
            };
 