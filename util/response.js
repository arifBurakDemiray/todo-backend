import { NIL } from "uuid"

export function Response() {

    let response = {
        status: 200,
        message: undefined,
        data: undefined
    }

    return {
        status: function(status){
            response.status = status
            return this
        },
        message: function(message){
            response.message = message
            return this
        },
        data: function(data){
            response.data = data
            return this
        },
        build: function(){
            return response
        },

    }

}